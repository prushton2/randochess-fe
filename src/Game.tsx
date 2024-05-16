import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Fetch, Move } from './axios.ts'
import './Game.css'
import { useSearchParams } from 'react-router-dom'




function RenderGame() {
	const [squareHTML, setSquareHTML] = useState<JSX.Element[]>();
	const [start_pos, setStart_pos] = useState<int>(-1);
	const [end_pos, setEnd_pos] = useState<int>(-1);
	
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

		if(start_pos == number) { classname = "square red" }
		if(end_pos == number)   { classname = "square red" }

		return <div className={classname} key={"Board Element "+number} onClick={(e) => {manageClick(number)}}>
			<label className={color}>{pieces[piece]}<br/>{number}</label>
		</div>
	}
	
	async function init() {
		if(start_pos != -1 && end_pos != -1) {
			if ((await Move(query.get("code"), start_pos, end_pos))["status"] == "Success") {
				setStart_pos(-1);
				setEnd_pos(-1);
				return;
			} else {
			}
		}

		let array: int[] = (await Fetch(query.get("code")))["board"];

		let squares: JSX.Element[] = []

		for(let i: int = 0; i < 64; i++) {
			if(i%8 == 0) {
				squares.push(<br key={"break "+i}/>);
			}
			squares.push(RenderSquare(array[i], i));
		}

		setSquareHTML(squares);

	}

	useEffect(() => {
		init();
	}, [start_pos, end_pos]);

	return <>
		{squareHTML}
	</>
}

function Game() {
  return (
    <b>
    	<button className="red">Leave</button>
	<RenderGame />
	<label className="guestCode">Join Code:<br />{localStorage.getItem("guest_code")}</label>
    </b>
  )
}

export default Game

