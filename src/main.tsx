// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './Redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
