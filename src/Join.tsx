import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function create_game() {

}

function join_game() {
	
}

function App() {
	const [code, setCode] = useState("");
  return (
    <b>
	<button>
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
