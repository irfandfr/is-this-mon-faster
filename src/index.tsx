import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import Homepage from './Page/index';
import CalculatorUI from './Page/calculator/calculatorUI';
import ResultPage from './Page/result/ResultPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path:'/',
      //   element:<Homepage />
      // },
      {
        path:'/',
        element:<CalculatorUI />
      },
      {
        path:'/result',
        element:<ResultPage advanced={false} />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
