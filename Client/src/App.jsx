import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import HeaderComp from "./components/HeaderComp";

function App() {
  const [count, setCount] = useState(0);

  const fetchApi = async () => {
    const response = await axios.get("http://127.0.0.1:8080/getImg");
    console.log(response.data.link);
  };

  return (
    <>
      <HeaderComp />
    </>
  );
}

export default App;
