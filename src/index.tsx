import "core-js";
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoadingPage from './Page/loading/Loading';
const Homepage = lazy(() => import('./Page/index'));
const CalculatorUI = lazy(() => import('./Page/calculator/calculatorUI'));
const ResultPage = lazy(() => import('./Page/result/ResultPage'));
const ErrorPage = lazy(() => import('./Page/error/error'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorPage />,
    children: [
      {
        path:'/',
        element:(
          <Suspense fallback={<LoadingPage errorText='' />}>
            <Homepage />
          </Suspense>)
      },
      {
        path:'/calc',
        element:<Suspense fallback={<LoadingPage errorText=''/>}><CalculatorUI /></Suspense>,
      },
      {
        path:'/advanced',
        element:<Suspense fallback={<LoadingPage errorText=''/>}><CalculatorUI advanced/></Suspense>,
      },
      {
        path:'/advresult',
        element:<Suspense fallback={<LoadingPage errorText=''/>}><ResultPage advanced={true} /></Suspense>
      },
      {
        path:'/smpresult',
        element:<Suspense fallback={<LoadingPage errorText=''/>}><ResultPage advanced={false} /></Suspense>
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
