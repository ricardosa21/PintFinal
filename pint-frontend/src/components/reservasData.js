import React, { useState, useEffect } from 'react'


const APIUrl = "http://localhost:3000";


function ReservasData() {

  const [reservas, setReservas] = useState([]);


  const reservasDados = async () => {
    try {
      const res = await fetch(APIUrl + "/api/reserva");
      const reservasArray = await res.json();
      setReservas(reservasArray);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  async function deleteReserva(id) {
    
    try {
      const deleteReserva = await fetch(APIUrl + "/api/reserva/" + id, {
        method:"DELETE"
      });
      setReservas(reservas.filter(reserva => reserva.id_reserva !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    reservasDados();
  }, []);

  return (
    <div className='divNice2'>
    <h4>Lista de reservas</h4>
    <table className="table mt-5 text-center">
        <thead>
          <tr>
            
            <th>Utilizador</th>
            <th>Centro</th>
            
            <th>Sala</th>
            <th>Data</th>
            <th>Hora inicio</th>
            <th>Hora fim</th>
            <th>Apagar</th>
          </tr>
        </thead>
        
        
        <tbody>
        {reservas.map(REPORT => ( 
            <tr key={REPORT.id_reserva}>
                
                <td>{REPORT.nome_utilizador}</td>
                <td>{REPORT.nome_centro}</td>
                <td>{REPORT.nome_sala}</td>
                <td>{REPORT.data}</td>
                <td>{REPORT.horainicio}</td>
                <td>{REPORT.horafim}</td>
            <td><button className="btn btn-danger" onClick={() => deleteReserva(REPORT.id_reserva)}>Apagar reserva</button></td>
            </tr>
         
     ))}
          
        </tbody>
      </table>
      </div>
  )
}

export default ReservasData