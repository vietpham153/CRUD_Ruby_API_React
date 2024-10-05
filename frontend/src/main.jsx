import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authentication, { PageType } from './pages/Authentication.jsx'
import { CookiesProvider } from 'react-cookie'
import AddChallenge from './pages/Challenge.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:  <App />
  },
  {
    path: '/login',
    element:  <Authentication pageType={PageType.LOGIN} />
  },
  {
    path: '/register',
    element:  <Authentication pageType={PageType.REGISTER} />
  },
  {
    path: '/add-challenge',
    element:  <AddChallenge />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider defaultSetOption={{ path: '/' }}>
      <RouterProvider router = {router} />
    </CookiesProvider>
  </StrictMode>,
)
