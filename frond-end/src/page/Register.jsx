import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validasi
  const [validation, setValidation] = useState([]);

  // navigation
  const navigasi = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigasi('/home')
    }
  },[])
  const registerHendle = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    console.log(formData.name)
    await axios
      .post("http://127.0.0.1:8000/api/auth/register", formData)
      .then(() => {
        navigasi("/login");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <div>
      <Container className="form-body">
        <h2 className="text-center mb-3 fw-bold text-success fs-1">
          Toko Sila
        </h2>
        <Form className="form-login" onSubmit={registerHendle}>
          <h2 className="text-center fw-bold">Register</h2>
          <Form.Group className="mb-3 form-grup " controlId="formBasicEmail">
            <Form.Label>Name Lengkap</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Nama Lengkap"
            />
            {validation.name && (
              <small className="text-danger">{validation.name[0]}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3 form-grup " controlId="formBasicEmail">
            <Form.Label>Alamat Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Masukan mail"
            />
            {validation.email && (
              <small className="text-danger">{validation.email[0]}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3 form-grup" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="******"
            />
            {validation.password && (
              <small className="text-danger">{validation.password[0]}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3 form-grup" controlId="formBasicPassword">
            <Button
              className="button-login bg-success fw-bold px-4 py-2 fs-5 fw-4"
              type="submit"
            >
              Register
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
export default Register;
