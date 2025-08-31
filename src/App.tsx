import { useState } from 'react';
import Header from './features/weather-display/Header';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Header />
			<div className='card'>
				<button type='button' onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
