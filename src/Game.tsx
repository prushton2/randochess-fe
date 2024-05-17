import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Fetch, Move, Leave } from './axios.ts'
import './Game.css'
import { useSearchParams } from 'react-router-dom'


function Game() {
	const [chessBoard, setChessBoard] = useState<JSX.Element[]>([]);
	const [boardData, setBoardData] = useState<int[]>([]);
	const [turn, setTurn] = useState<string>("white");
	const [rule, setRule] = useState<string>("white");
	const [blackSide, setBlackSide] = useState<string>("");
	const [start_pos, setStart_pos] = useState<int>(-1);
	const [end_pos, setEnd_pos] = useState<int>(-1);
	const [winner, setWinner] = useState<string>("");

	let [query] = useSearchParams();
	let pieces: string[] = [" ", "", "", "", "", "", ""];
	
	function manageClick(number: int) {
		if(turn == "white" && blackSide == query.get("code") || 
		   turn == "black" && blackSide != query.get("code")) {
		   	return;
		}
		if(start_pos == -1) {
			setStart_pos(number);
		} else if (end_pos == -1) {
			setEnd_pos(number);
		} else {
			setStart_pos(-1);
			setEnd_pos(-1);
		}
	}

	function RenderSquare(i: int) {
		let color: string = "whitetext";
		let piece: int = boardData[i];
		if(piece > 128) {
			piece -= 128;
			color = "blacktext";
		}
		if(piece >= 32) {
			piece -= 32;
		}

		let column = i + parseInt(i/8);
		let classname: string = column%2==0 ? "square light" : "square dark";

		return <div className={start_pos == i || end_pos == i ? "square red" : classname} key={"board element "+i} onClick={(e) => manageClick(i)}>
			<label className={color}>{pieces[piece]}</label>
		</div>
	}

	useEffect(() => {
		if(winner != "") {
			return;
		}
		let squares: JSX.Element[] = []
		
		for(let i: int = 0; i < 64; i++) {
			if(i%8 == 0 && i != 0) {
				squares.push(<br key={"break "+i}/>);
			}
			squares.push(RenderSquare(i));
		}

		if(blackSide == query.get("code")) {
			squares.reverse();
		}

		setChessBoard(squares);
	}, [boardData, start_pos, end_pos]);
	
	useEffect(() => {
		async function run() {
			if(start_pos == -1 || end_pos == -1) {
				return;
			}
			if ((await Move(query.get("code"), start_pos, end_pos))["status"] == "Success") {

				//do the move client side so its more responsive
				let newBoard: int[] = boardData;
				newBoard[end_pos] = newBoard[start_pos];
				newBoard[start_pos] = 0;
				setBoardData(newBoard);

				setStart_pos(-1);
				setEnd_pos(-1);
				return;
			}	
		}
		run();
	}, [start_pos, end_pos])
	
	useEffect(() => {
		let interval = setInterval(async() => {
			let fetch = await Fetch(query.get("code"))
			if(fetch["status"] != "Success") {
				alert("Game no longer exists");
				window.location.href = "/";
				return;
			}
			setBoardData(fetch["board"]);
			setWinner(fetch["winner"]);
			setBlackSide(fetch["black_side"]);
			setTurn(fetch["turn"]);
			setRule(fetch["rule"]);
		}, 1000);

		return () => clearInterval(interval);
	}, [boardData]);
	
	async function leaveGame() {
		await Leave(query.get("code"));
		window.location.href = "/";
	}

	return (
	<b>
		{chessBoard}
		<div className="alignBottom">
			<button className="bottomElement red" onClick={(e) => {leaveGame()}}>Leave</button>
			<label className="bottomElement">Join Code: {localStorage.getItem("guest_code")}</label>
			<label className="bottomElement">Rule: {rule}</label>
		</div>
	</b>
	)
}

export default Game;
