import { toast } from "react-toastify";
import React, { Fragment, useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch,  Route, Redirect  } from "react-router-dom";
import './App.css';
import {  FormRegistarUtilizador, FormDefinirLimiteSala, FormLogin, FormMudarpermUtilizador, FormAssociarUtilizadorCentro, FormCriarCentro, FormCriarSala, FormAlterarPassword, FormLimpaSala, TempoLimpeza, FormDesativarCentro,  FormDefinirEstadoSala, FileCSV } from "./components/Form"
import { Topnav} from "./components/NavBar"
import { VerReservasDatas } from "./components/Dashboard";

import ReservasData from "./components/reservasData";
import Utilizadores from "./components/Utilizadores";


const CryptoJS = require("crypto-js");
const APIUrl = "http://localhost:3000";
const chave_secreta = process.env.REACT_APP_KEY;



//toast.configure();


function App() { 
  let email_encrypt, email;

  if(localStorage.getItem("email")) {
    email_encrypt = localStorage.getItem("email");
    let bytes  = CryptoJS.AES.decrypt(email_encrypt, chave_secreta);
    email = bytes.toString(CryptoJS.enc.Utf8);
  }
  
  const [perfil, setPerfil] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Verificar se está autenticado
  const checkAuthenticated = async () => {
    try {
      const res = await fetch(APIUrl + "/autenticar/verificar", {
        headers: { "jwtToken": localStorage.jwtToken }
      });

      const parseRes = await res.json();
      
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  };

   const checkProfile = async () => {
    try {
      
      const res = await fetch(APIUrl + "/api/utilizador/"+ localStorage.getItem("id"));
      const existe = await res.json();
      if (existe[0].pass ===true) {
        setPerfil(true);
      }
      else{
        setPerfil(false);
      }
        
    } catch (err) {
      console.error(err.message);
    }
  };
  
  useEffect(() => {
    checkProfile();
  }, []);
  


const setAuth = (boolean) => {
  setIsAuthenticated(boolean);
};

  return (
    
    <Router>
      
      <Switch>
        <Route exact path="/" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} />) : (<Redirect to="/Dashboard" />)}></Route>
        <Route path="/Dashboard" render={props => isAuthenticated ? (<Dashboard {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
        <Route path="/Register" render={props => isAuthenticated ? (<RegUti {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
        <Route path="/Criarcentro" render={props => isAuthenticated ? (<CriarCentro {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
        <Route path="/Criarsala" render={props => isAuthenticated ? (<CriarSala {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
        <Route path="/Reservas" render={props => isAuthenticated ? (<DataReservas {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
        <Route path="/Sala-limpeza" render={props => isAuthenticated ? (<SalaLimpeza {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
        <Route path="/TempoLimpeza" render={props => isAuthenticated ? (<SalaTempoLimpeza {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
        <Route path="/DefinirCentroUti" render={props => isAuthenticated ? (<DefinirCentroUti {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
        <Route path="/MudarPermUti" render={props => isAuthenticated ? (<MudarPermUti {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
        <Route path="/DefinirLimiteSala" render={props => isAuthenticated ? (<DefinirLimiteSala {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
        <Route path="/AtivarInaCentro" render={props => isAuthenticated ? (<AtivarInaCentro {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
        <Route path="/AtivarInaSala" render={props => isAuthenticated ? (<AtivarInaSala {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
        <Route path="/BulkInsert" render={props => isAuthenticated ? (<Bulkinsert {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
        <Route path="/ListaUti" render={props => isAuthenticated ? (<ListaUtilizadores {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}></Route>
          
          
      </Switch>
      
      
    </Router> 
     


 );
}

 


export default App;

function Login({setAuth}) {  
  return (
    <Fragment>
     
      <FormLogin setAuth={setAuth} />
      
    </Fragment>
  );
}

function Dashboard({setAuth}) {

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      
      localStorage.removeItem("verPass");
      localStorage.removeItem("id");
      
      setAuth(false);
      
      
      
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  
  const [verificar, setVerificar] = useState();
  

  const checkProfilePassword = async () => {
    try {
      
      const res = await fetch(APIUrl + "/api/utilizador/"+ localStorage.getItem("id"));
      const existe = await res.json();
      if (existe[0].pass === true && existe[0].perfil=== 1) {
        setVerificar("Verificado");
      } else if (existe[0].pass === true && existe[0].perfil === 0){
        setVerificar("SemPermissao");
      } else if (existe[0].pass !== true && existe[0].perfil === 1){
        setVerificar("NaoVerificado");
      } else if (existe[0].pass !== true && existe[0].perfil === 0) {
        setVerificar("SemPermissao");
      }
      
        
    } catch (err) {
      console.error(err.message);
    }
  };

  

  
  useEffect(() => {
    checkProfilePassword();
  }, []);
  
  
 
  return (
    <Fragment>
      {verificar === "Verificado" ?
        <>
          
          <Topnav logout={logout} />
          
          <VerReservasDatas />
        
        </>
        : <></>}
      
      {verificar === "SemPermissao" ? 
        <h4>Não tens permissão para entrar nesta parte</h4>
        :<></>
      }
      {verificar === "NaoVerificado" ? 
        <FormAlterarPassword/>
        :<></>
      }
      </Fragment>
      
    
      
    );
}

function DataReservas({ setAuth }) {
        
      const logout = async e => {
        e.preventDefault();
        try {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("email");
          
          localStorage.removeItem("verPass");
          localStorage.removeItem("id");
          
          setAuth(false);
          
          
          
          toast.success("Sessão terminada com sucesso.");
        } catch (err) {
          console.error(err.message);
        }
      };

      return (
        <Fragment>
          
          <Topnav logout={logout} />
            <ReservasData />
            
        </Fragment>
      );
}
    
  function RegUti({setAuth}) {
    const logout = async e => {
      e.preventDefault();
      try {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("email");
        
        localStorage.removeItem("verPass");
        localStorage.removeItem("id");
        
        setAuth(false);
        
        
        
        toast.success("Sessão terminada com sucesso.");
      } catch (err) {
        console.error(err.message);
      }
    };

    return (
      <Fragment>
        
          <Topnav logout={logout} />
          <FormRegistarUtilizador />
          
      </Fragment>
    );
}
  


function CriarCentro({setAuth}) {
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      
      localStorage.removeItem("verPass");
      localStorage.removeItem("id");
      
      setAuth(false);
      
      
      
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      
          <Topnav logout={logout} />
        <FormCriarCentro />
        
    </Fragment>
  );
}


function CriarSala({setAuth}) {
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      
      localStorage.removeItem("verPass");
      localStorage.removeItem("id");
      
      setAuth(false);
      
      
      
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      
          <Topnav logout={logout} />
        <FormCriarSala />
        
    </Fragment>
  );
}

function SalaLimpeza({setAuth}) {
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      
      localStorage.removeItem("verPass");
      localStorage.removeItem("id");
      
      setAuth(false);
      
      
      
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      
          
          <Topnav logout={logout} />
        <FormLimpaSala />
        
    </Fragment>
  );
}

function SalaTempoLimpeza({setAuth}) {
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      
      localStorage.removeItem("verPass");
      localStorage.removeItem("id");
      
      setAuth(false);
      
      
      
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      
          
          <Topnav logout={logout} />
        <TempoLimpeza />
        
    </Fragment>
  );
}

function DefinirCentroUti({setAuth}) {
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      
      localStorage.removeItem("verPass");
      localStorage.removeItem("id");
      
      setAuth(false);
      
      
      
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      
          <Topnav logout={logout} />
        <FormAssociarUtilizadorCentro />
       
    </Fragment>
  );
}



function MudarPermUti({setAuth}) {
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      
      localStorage.removeItem("verPass");
      localStorage.removeItem("id");
      
      setAuth(false);
      
      
      
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      
          <Topnav logout={logout} />
        <FormMudarpermUtilizador />
        
    </Fragment>
  );
}

function DefinirLimiteSala({setAuth}) {
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      
      localStorage.removeItem("verPass");
      localStorage.removeItem("id");
      
      setAuth(false);
      
      
      
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      
          <Topnav logout={logout} />
        <FormDefinirLimiteSala />
        
    </Fragment>
  );
}


function AtivarInaCentro({setAuth}) {
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      
      localStorage.removeItem("verPass");
      localStorage.removeItem("id");
      
      setAuth(false);
      
      
      
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      
          <Topnav logout={logout} />
        <FormDesativarCentro />
        
    </Fragment>
  );
}

function AtivarInaSala({setAuth}) {
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      
      localStorage.removeItem("verPass");
      localStorage.removeItem("id");
      
      setAuth(false);
      
      
      
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      
          <Topnav logout={logout} />
        <FormDefinirEstadoSala />
        
    </Fragment>
  );
}

function Bulkinsert({setAuth}) {
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      
      localStorage.removeItem("verPass");
      localStorage.removeItem("id");
      
      setAuth(false);
      
      
      
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
     
          <Topnav logout={logout} />
        <FileCSV />
        
    </Fragment>
  );
}

function ListaUtilizadores({setAuth}) {
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      
      localStorage.removeItem("verPass");
      localStorage.removeItem("id");
      
      setAuth(false);
      
      
      
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      
          <Topnav logout={logout} />
        <Utilizadores />
        
    </Fragment>
  );
}