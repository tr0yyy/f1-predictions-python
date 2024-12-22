import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import F1ContextProvider from './context/F1Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <F1ContextProvider>
      <App />
    </F1ContextProvider>
  </BrowserRouter>,
)
