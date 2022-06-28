import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NavbarComponent() {
  const navigasi = useNavigate();

  // token
  const token = localStorage.getItem("token");
  const logoutHendle = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post("http://127.0.0.1:8000/api/auth/logout").then(() => {
      localStorage.removeItem("token");
      navigasi("/login");
    });
  };
  return (
    <div>
      <Navbar className="Navbar-body ">
        <Container className="d-flex justify-content-around">
          <Navbar className="title">Toko Sila</Navbar>
          <Nav className="me-auto">
            <Link className="text-decoration-none ms-3 link" to="/home">
              Home
            </Link>
            <Link className="text-decoration-none ms-3 link" to="/about/">
              About
            </Link>
          </Nav>
          <button type="button" onClick={logoutHendle} className="btn btn-success">Logout</button>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavbarComponent;
