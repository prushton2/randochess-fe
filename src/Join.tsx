import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {CreateGame} from "./axios.ts"
import './App.css'


async function create_game() {
	let codes = await CreateGame();
	console.log(codes);
}

function join_game() {
	
}

function App() {
	const [code, setCode] = useState("");
  return (
    <b>
	<button onClick={create_game}>
	      Create Game
	</button>
	<br/><br/>
	or
	<br/><br/>
	<input onChange={(e) => {setCode(e.target.value)}}/>
	
	<button>
		Join
	</button>
    </b>
  )
}

export default App
