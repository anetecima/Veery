import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainPage } from './pages/main/mainPage'
import { AboutUsPage } from './pages/aboutUs/aboutUsPage.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/about',
    element: <AboutUsPage />,
  },
])
// font-family: 'Lato', sans-serif;
// font-family: 'Roboto', sans-serif;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
