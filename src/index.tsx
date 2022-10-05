import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
const App = React.lazy(() => import('./App'));

const container = document.getElementById('app')!;

const root = ReactDOMClient.createRoot(container).render(

        <App />
);