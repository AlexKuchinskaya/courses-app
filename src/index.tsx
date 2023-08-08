import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const containerRoot = document.getElementById('root');
const root = ReactDOM.createRoot(containerRoot);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
