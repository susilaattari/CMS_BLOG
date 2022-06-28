import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigasi = useNavigate();

  const [validasi,setValidasi]=useState([])
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigasi('/home')
    }
  },[])

  

  const loginHendle = async (e)=>{
    e.preventDefault();
    const formData = new FormData()

    formData.append('email',email);
    formData.append('password',password);

    await axios.post('http://127.0.0.1:8000/api/auth/login',formData)
    .then((response)=>{
      localStorage.setItem('token',response.data.access_token)
      navigasi('/home')
    })
    .catch((error)=>{
      setValidasi(error.response.data)
    })

  }
  return (
    <div>
      <Container className="form-body">
        <h2 className="text-center mb-3 fw-bold text-success fs-1">
          Toko Sila
        </h2>
        <Form className="form-login" onSubmit={loginHendle}>
          <h2 className="text-center fw-bold">Login</h2>
          {validasi.error && (
            <div className=" alert w-2 alert-danger" role="alert">
            {validasi.error}
            </div>
          )}
          <Form.Group className="mb-3 form-grup " controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Masukan Email" />
            {validasi.email &&(
               <small className="text-danger">{validasi.email}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3 form-grup" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="******" />
            {validasi.password &&(
              <small className="text-danger">{validasi.password}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3 form-grup" controlId="formBasicPassword">
            <Button
              className="button-login bg-success fw-bold px-4 py-2 fs-5 fw-4"
              type="submit"
            >
              Login
            </Button>
          </Form.Group>
          <Form.Group className="mb-3 form-grup" controlId="formBasicPassword">
            <Button
              className="button-login  bg-success px-4 py-2 fs-5 fw-4"
              type="button"
            >
              <Link className="text-decoration-none text-light fw-bold" to="/register">Register</Link>
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
export default Login;
