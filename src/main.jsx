import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../Ready4Hire.jsx'

document.getElementById('loading')?.remove()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
