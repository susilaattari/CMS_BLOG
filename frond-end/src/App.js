import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Belajar from "./Belajar/Belajar";
import About from "./page/About"
import './App.css'
import './Belajar/belajar.css'
function App() {
  return (
    <div>
     <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/belajar" element={<Belajar/>}/>
      </Routes>
    </div>
  );
}

export default App;
