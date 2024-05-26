import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' 
import './App.css'
import Login from './components/Login'
import Home from './Home'

function App() {
  const [username,setUsername] = useState('')

  return username ?  (
      <Home username={username}/>
  ) : <Login onSubmit={setUsername}/>
}

export default App
