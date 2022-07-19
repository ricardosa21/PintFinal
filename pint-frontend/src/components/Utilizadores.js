import React, { useState, useEffect } from 'react'


const APIUrl = "http://localhost:3000";


function UtilizadoresData() {



    const [estadoativo, setEstadoAtivo] = useState({
        estado: "Ativo"
    });
    const [estadoinativo, setEstadoInativo] = useState({
        estado: "Inativo"
    });

    const [utilizadores, setUtilizadores] = useState([]);
    


  const utilizadoresDados = async () => {
    try {
      const res = await fetch(APIUrl + "/api/utilizador");
      const utilizadoresArray = await res.json();
      setUtilizadores(utilizadoresArray);
    } catch (err) {
      console.error(err.message);
    }
    };
    
  
  async function inativarUtilizador(id) {
    
    try {
      const inativarUtilizador = await fetch(APIUrl + "/api/utilizador/editar-estado/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estadoinativo)
      });
        alert("Utilizador inativado!");
        utilizadoresDados();
    } catch (error) {
      console.log(error.message);
    }
    };
    
    async function ativarUtilizador(id) {
    
        try {
          const ativarUtilizador = await fetch(APIUrl + "/api/utilizador/editar-estado/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(estadoativo)
          });
            alert("Utilizador ativado!");
            utilizadoresDados();
        } catch (error) {
          console.log(error.message);
        }
      };

  useEffect(() => {
    utilizadoresDados();
  }, []);

  return (
    <div className='divNice2'>
    <h4>Lista de utilizadores</h4>
    <table className="table mt-5 text-center">
        <thead>
          <tr>
            
            <th>Utilizador</th>
            <th>Centro</th>
            
            <th>Morada</th>
            <th>Telemovel</th>
            <th>Email</th>
            <th>Estado</th>
                      <th>Ativar</th>
                      <th>Inativar</th>
          </tr>
        </thead>
        
        
        <tbody>
        {utilizadores.map(REPORT => ( 
            <tr key={REPORT.id_utilizador}>
                
                <td>{REPORT.nome_utilizador}</td>
                <td>{REPORT.nome_centro}</td>
                <td>{REPORT.morada}</td>
                <td>{REPORT.telemovel}</td>
                <td>{REPORT.email}</td>
                <td>{REPORT.estado}</td>

                <td><button className="btn btn-success" onClick={() => ativarUtilizador(REPORT.id_utilizador)}>Ativar</button></td>
                <td><button className="btn btn-danger" onClick={() => inativarUtilizador(REPORT.id_utilizador)}>Inativar</button></td>
            </tr>
         
     ))}
          
        </tbody>
      </table>
      </div>
  )
}

export default UtilizadoresData