import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import Alocacao from "./Alocacao";
import { FormDefinirLimiteSala, FormLimpaSala } from "./Form";
import { NavBarTopo } from "./NavBar";


const APIUrl = "http://localhost:3000";

function VerReservasDatas() {

     const [inputs, setInputs] = useState({
        datainicio: "",
        datafim: ""
    });

    const [reservas, setReservas] = useState();
    const [utilizadores, setUtilizadores] = useState([]);
    const [nreservas, setNreservas] = useState("");
    const { datainicio, datafim } = inputs;

    const onChange = (e) => {
        setInputs({
            ...inputs, [e.target.name]: e.target.value
        });
    };

    const utiTamanho = async () => {
        try {
          const res = await fetch(APIUrl + "/api/utilizador");
          const utilizadoresArray = await res.json();
          setUtilizadores(utilizadoresArray);
        } catch (err) {
          console.error(err.message);
        }
    };
    

    const reservasEntreDatas = async (e) => {
        e.preventDefault();
        try {
            const body = { datainicio, datafim }
            const reservasarray = await fetch(APIUrl + "/api/reserva/reservadata", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const jsonData = await reservasarray.json();
            setReservas(jsonData.dados);
            setNreservas(jsonData.nreservas);
            alert('Reservas!');
            toast.success("Reservas!");
        } catch (error) {
            console.log(error.message);
        };
    };

    useEffect(() => {
        utiTamanho();
        
      }, []);


    


    return (
        <Fragment>
                <h4>Dashboard</h4>
                <h2><p>O número de utilizadores da app é: {utilizadores.length}</p></h2>
           <div className="divNice">   
            <form id="verReservas" onSubmit={reservasEntreDatas}>
                <label htmlFor="Reservas"><h3>Reservas entre datas:</h3></label>
                <div className="form-row">
                    <div className="col-sm-6">
                        <label htmlFor="datainicio">Data Inicio:</label>
                        <input type="text" name="datainicio" className="form-control" id="datafim"  value={datainicio} onChange={e => onChange(e)} required />
                        <br />
                        <label htmlFor="datafim">Data Fim:</label>
                        <input type="text" name="datafim" className="form-control" id="datafim"  value={datafim} onChange={e => onChange(e)} required />
                        <br />
                        
                    </div>    
                </div>
                <button type="submit" className="btn btn-primary">Ver reservas</button>
            </form>
            </div>     
                
        {nreservas ? <div className="divNice"> <p>Nº total de reservas : { nreservas }</p></div>:<></>}
        {reservas ? <table className="table mt-5 text-center">
            <thead>
            <tr>
                
                <th>Utilizador</th>
                <th>Centro</th>
                
                <th>Sala</th>
                <th>Data</th>
                <th>Hora inicio</th>
                <th>Hora fim</th>
                
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
                </tr>
            
        ))}
            
            </tbody>
        </table>:<></> }
        
                
        <Alocacao/>
            
    </Fragment>
    )

}

export {
    VerReservasDatas,
}