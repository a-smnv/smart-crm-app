import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux' // 1. Импортируем Провайдер [main.tsx]
import { store } from './app/store'     // 2. Импортируем наш собранный Стор [main.tsx]
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> 
    <App />
    </Provider>
  </React.StrictMode>,
)
