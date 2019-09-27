// Web/UI/App.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import AppRouter from './Components/Router';

export function NavBar(): React.ReactElement {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Example">Example</Link>
        </li>
        <li>
          <Link to="/Test">Test</Link>
        </li>
      </ul>
    </nav>
  );
}

export function App(): React.ReactElement {
  return (
    <>
      <NavBar />
      <AppRouter />
    </>
  );
}
