import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Game.css'



function RenderSquare(piece: int, number: int) {
	
	let column = number + parseInt(number/8);

	let classname: string = column%2==0 ? "lightSquare" : "darkSquare";

	return <div className={classname} key={number}>
		

	</div>
}


function RenderGame() {
	const [squareHTML, setSquareHTML] = useState<JSX.Element[]>();
	let array: int[] = [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,129,0,0,1,0,0,0,0,129,0,0,1,0,0,0,0,129,0,0,1,0,0,0,0,129,0,0,1,0,0,0,0,129,0,0,1,0,0,0,0,129,0,0,1,0,0,0,0];

	useEffect(() => {
		let squares: JSX.Element[] = []

		for(let i: int = 0; i < 64; i++) {
			if(i%8 == 0) {
				squares.push(<br />);
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

