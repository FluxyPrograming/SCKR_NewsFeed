import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  const fetchApi = async () => {
    const response = await axios.get('http://127.0.0.1:8080/getImg');
    console.log(response.data.link)
    
  };



  return (
    <>
      <img id="slika" width="400px" />
      <div id="title"></div>
      <div id="summary"></div>
      <div id="img"></div>
      <div id="date"></div>
      <div id="pocitnice"></div>
    </>
  )
}

export default App
