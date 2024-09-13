import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Lab0 from './components/Lab0/Lab0';
import Lab1 from './components/Lab1/Lab1';
import Root from './components/Layouts/Root';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(createRoutesFromElements([
    <Route path="/" element={<Root />}>
      <Route index element={<Lab0 />}/>
      <Route path="lab1" element={<Lab1 />} />
    </Route>
]));

root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
