import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Game.css'



function RenderSquare(piece: int, number: int) {
	let pieces: string[] = [" ", "P", "R", "N", "B", "Q", "K"];
	let color: string = piece > 128 ? "blacktext" : "whitetext";

	if(piece >= 128) {
		piece -= 128;
	}

	let column = number + parseInt(number/8);
	let classname: string = column%2==0 ? "lightSquare" : "darkSquare";

	return <div className={classname} key={"Board Element "+number}>
		<label className={color}>{pieces[piece]}</label>
	</div>
}


function RenderGame() {
	const [squareHTML, setSquareHTML] = useState<JSX.Element[]>();
	let array: int[] = [130,131,132,133,134,132,131,130,129,129,129,129,129,129,129,129,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,3,4,5,6,4,3,2];
	useEffect(() => {
		let squares: JSX.Element[] = []

		for(let i: int = 0; i < 64; i++) {
			if(i%8 == 0) {
				squares.push(<br key={"break "+i}/>);
			}
			squares.push(RenderSquare(array[i], i));
		}

		setSquareHTML(squares);
	}, []);
	return <>
		{squareHTML}
	</>
}








function Game() {
  return (
    <b>
	<RenderGame />
    </b>
  )
}

export default Game

