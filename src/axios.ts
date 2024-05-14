import axios from 'axios';

export async function CreateGame() {
	const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/game/new`;
	console.log(url);
	const response = await axios.get(url);
	return response.data;
}
