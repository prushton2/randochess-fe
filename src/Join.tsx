import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {CreateGame, JoinGame} from "./axios.ts"
import './App.css'



function App() {
	
	const [code, setCode] = useState("");
	
	async function create_game() {
		let codes = await CreateGame();
		console.log(codes);
		localStorage.setItem("code", codes.host_code);
		localStorage.setItem("guest_code", codes.guest_code);
		window.location.href = "/play";
	}
	async function join_game() {
		let result: string = await JoinGame(code as number);
		if(result == "1") {
			localStorage.setItem("code", code.host_code);
			window.location.href = "/play";
		} else {
			alert("Invalid Code");
		}
	}

	return (
	<b>
		<button onClick={create_game}>
		      Create Game
		</button>
		<br/><br/>
		or
		<br/><br/>
		<input type="number" onChange={(e) => {setCode(e.target.value)}}/>

		<button onClick={join_game}>
			Join
		</button>
	</b>
	)
}

export default App
