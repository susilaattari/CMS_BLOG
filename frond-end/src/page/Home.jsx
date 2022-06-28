import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent"
function Home(){
    const [user,setUser]=useState({});
    const navigasi = useNavigate()

    // token
    const token = localStorage.getItem('token');

    const featchData = async ()=>{
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        await axios.post("http://127.0.0.1:8000/api/auth/me")
        .then((response)=>{
          console.log(response.data)
          setUser(response.data)
        })
    }

    useEffect(()=>{
        if(!token){
            navigasi('/login')
        }
        featchData()
    },[]);


    return (
        <div>
            <NavbarComponent/>
            <h2>walcome {user.nama}</h2>
        </div>
    )
}
export default Home