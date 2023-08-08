import { createRoot } from 'react-dom/client';
import Hello from './Hello';
import React from 'react';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Hello />);
