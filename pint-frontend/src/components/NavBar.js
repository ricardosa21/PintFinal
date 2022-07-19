import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from 'react-router-dom';
import './NavBar.css';



function Topnav({logout}) {
  return (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand> <img className="imgsoftinsa" src="\imagens\softinsa_logo.png" alt="Logo Softinsa" /></Navbar.Brand>
        <Nav.Link><Link to="/Dashboard" style={{ textDecoration: 'none', color: '#3D45A6'}}>Dashboard</Link></Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link><Link to="/Reservas" style={{ textDecoration: 'none', color: '#3D45A6'}}>Reservas</Link></Nav.Link>
          <NavDropdown title="Utilizador" id="nav-dropdown" >
            <NavDropdown.Item><Link to="/ListaUti" style={{ textDecoration: 'none', color: '#3D45A6'}}>Lista de Utilizadores</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to="/Register" style={{ textDecoration: 'none', color: '#3D45A6'}}>Registar Utilizador</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to="/BulkInsert" style={{ textDecoration: 'none', color: '#3D45A6'}}>Bulk Insert</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to="/DefinirCentroUti" style={{ textDecoration: 'none', color: '#3D45A6'}}>Definir Centro Utilizador</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to="/MudarPermUti" style={{ textDecoration: 'none', color: '#3D45A6'}}>Mudar Permissão Utilizador</Link></NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Centro" id="nav-dropdown">  
              <NavDropdown.Item><Link to="/CriarCentro" style={{ textDecoration: 'none', color: '#3D45A6'}}>Criar Centro</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="/AtivarInaCentro" style={{ textDecoration: 'none', color: '#3D45A6'}}>Ativar/Inativar Centro</Link></NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Sala" id="nav-dropdown">
            <NavDropdown.Item><Link to="/CriarSala" style={{ textDecoration: 'none', color: '#3D45A6'}}>Criar Sala</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to="/AtivarInaSala" style={{ textDecoration: 'none', color: '#3D45A6'}}>Ativar/Inativar Sala</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to="/DefinirLimiteSala" style={{ textDecoration: 'none', color: '#3D45A6'}}>Definir Limite da Sala</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to="/Sala-limpeza" style={{ textDecoration: 'none', color: '#3D45A6'}}>Limpar Salas</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to="/TempoLimpeza" style={{ textDecoration: 'none', color: '#3D45A6'}}>Tempo de Limpeza</Link></NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Nav className="ms-auto">
            <Nav.Link navbar-right><Link to="/" style={{ textDecoration: 'none', color: '#3D45A6', float: "right"}} onClick={e => logout(e)}>Terminar sessão <i className="fa fa-sign-out" aria-hidden="true"></i></Link></Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar> 
  );
}



export {
  
  Topnav
  
}