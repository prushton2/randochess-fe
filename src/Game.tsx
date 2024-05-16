import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Fetch, Move, Leave } from './axios.ts'
import './Game.css'
import { useSearchParams } from 'react-router-dom'




function RenderGame() {
	const [squareHTML, setSquareHTML] = useState<JSX.Element[]>();
	const [start_pos, setStart_pos] = useState<int>(-1);
	const [end_pos, setEnd_pos] = useState<int>(-1);
	const [run_update, setRun_update] = useState<int>(1); 
	const [winner, setWinner] = useState<string>("");
	let [query] = useSearchParams();

	function manageClick(number: int) {
		if(start_pos == -1) {
			setStart_pos(number);
		} else if (end_pos == -1) {
			setEnd_pos(number);
		} else {
			setStart_pos(-1);
			setEnd_pos(-1);
		}
	}


	function RenderSquare(piece: int, number: int) {
		let pieces: string[] = [" ", "", "", "", "", "", ""];
		let color: string = "whitetext";

		if(piece >= 128) {
			piece -= 128;
			color = "blacktext";
		}

		if (piece >= 32) {
			piece -= 32;
		}

		let column = number + parseInt(number/8);
		let classname: string = column%2==0 ? "square light" : "square dark";

		if(start_pos == number) { console.log("1 red"); classname = "square red" }
		if(end_pos == number)   { console.log("2 red"); classname = "square red" }


		return <div className={classname} key={"Board Element "+number} onClick={(e) => {manageClick(number)}}>
			<label className={color}>{pieces[piece]}</label>
		</div>
	}
	
	async function init() {
		if(winner != "") {
			return;
		}
		if(start_pos != -1 && end_pos != -1) {
			if ((await Move(query.get("code"), start_pos, end_pos))["status"] == "Success") {
				setStart_pos(-1);
				setEnd_pos(-1);
				return;
			}	
		}
		
		let fetch = (await Fetch(query.get("code")))
		let array: int[] = fetch["board"];
		setWinner(fetch["winner"]);

		let squares: JSX.Element[] = []
		
		
		for(let i: int = 0; i < 64; i++) {
			if(i%8 == 0 && i != 0) {
				squares.push(<br key={"break "+i}/>);
			}
			squares.push(RenderSquare(array[i], i));
		}
		
		if(fetch["black_side"] == query.get("code")) {
			squares.reverse();
		}
		setSquareHTML(squares);

	}

	useEffect(() => {
		init();
	}, [start_pos, end_pos, run_update]);
	
	setInterval(() => setRun_update(run_update+1), 1000);
	
	useEffect(() => {
		if(winner == "") {
			return;
		}
		if(winner == undefined) {
			alert("Game does not exist");
			return;
		}
		alert(winner+" has won");
	}, [winner]);

	return <>
		{squareHTML}
	</>
}


function Game() {
	let [query] = useSearchParams();

	async function leaveGame() {
		await Leave(query.get("code"));
		window.location.href = "/";
	}
  return (
    <b>
	<RenderGame />
	<div className="alignBottom">
		<button className="bottomElement red" onClick={(e) => {leaveGame()}}>Leave</button>
		<label className="bottomElement">Join Code: {localStorage.getItem("guest_code")}</label>
	</div>
    </b>
  )
}

export default Game

