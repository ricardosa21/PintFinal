import React, { useState, useEffect, Fragment } from 'react'

const APIUrl = "http://localhost:3000";

function Alocacao() {

    const [centros, setCentros] = useState([]);
    const [idcentro, setIdCentro] = useState();
    const [alocacaoDiaria, setAlocacaoDiaria] = useState();
    const [alocacaoMensal, setAlocacaoMensal] = useState();


    const getCentros = async () => {
        try {
          const res = await fetch(APIUrl + "/api/centro");
          const centrosArray = await res.json();
          setCentros(centrosArray);
        } catch (err) {
          console.error(err.message);
        }
    };

    const onChange = async () => {
        const selectedIndexC = document.getElementById("centro_sel").options.selectedIndex;
        
        setIdCentro(Number(document.getElementById("centro_sel").options[selectedIndexC].getAttribute('data-centro')));
};

    const dadosDiarios = async (e) => {
        e.preventDefault();
        try {
            const body = { idcentro };
            const res = await fetch(APIUrl + "/api/reserva/alocacaoDiaria", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const alocacaoDiaria = await res.json();
            setAlocacaoDiaria(alocacaoDiaria.result);
            alert("Sucess!");
        } catch (err) {
            console.error(err.message);
        }
    };

    const dadosMensais = async () => {
        try {
          const res = await fetch(APIUrl + "/api/reserva/reservaMensal/" + idcentro);
          const reservas = await res.json();
          setAlocacaoMensal(reservas);
        } catch (err) {
          console.error(err.message);
        }
      };
    
    useEffect(() => {
        getCentros();
    }, [])
    


  return (
      <Fragment>
      <div className='divNice'>
          <h3>Alocacao diaria:</h3>
          <form id="verReservas" onSubmit={dadosDiarios}>
            <label htmlFor='Centro'>Centro:</label>
            <div className="form-row">
                <div className="col-sm-6">
                          <select className="form-control" name="centros" id="centro_sel"  onClick={ onChange } required>
                              <option value="" disabled="disable"> Selecione um centro</option>
                                    {centros.map(e => (
                                        <option  key={e.id_centro} data-centro={e.id_centro}>{e.nome_centro}</option>
                                        
                                    ))}
                          </select>
                </div>    
          </div>
          <br/>
         <button type="submit" className="btn btn-primary" onClick={() => dadosMensais()}>Ver reservas</button>
      </form>
              {
              alocacaoDiaria ? <p>A alocação diária no centro {centros[idcentro -1].nome_centro} é { alocacaoDiaria }</p> : <></>
        }
        {
          alocacaoDiaria === 0 ? <p>Hoje não há reuniões</p> : <></>
            }
          
      
      </div>
      <div className='divNice3'>
          <h3>Alocação Mensal:</h3>
          {alocacaoMensal ? <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Janeiro</th>
            <th>Fevereiro</th>
            <th>Março</th>
            
            <th>Abril</th>
            <th>Maio</th>
            <th>Junho</th>
            <th>Julho</th>
            <th>Agosto</th>
            <th>Setembro</th>
            <th>Outubro</th>
            <th>Novembro</th>
            <th>Dezembro</th>
          </tr>
        </thead>
        
        
        <tbody>
        
            <tr>
                      <td>{alocacaoMensal.janeiro}%</td>
                      <td>{alocacaoMensal.fevereiro}%</td>
                      <td>{alocacaoMensal.marco}%</td>
                      <td>{alocacaoMensal.abril}%</td>
                      <td>{alocacaoMensal.maio}%</td>
                      <td>{alocacaoMensal.junho}%</td>
                      <td>{alocacaoMensal.julho}%</td>
                      <td>{alocacaoMensal.agosto}%</td>
                      <td>{alocacaoMensal.setembro}%</td>
                      <td>{alocacaoMensal.outubro}%</td>
                      <td>{alocacaoMensal.novembro}%</td>
                      <td>{alocacaoMensal.dezembro}%</td>

                
            </tr>
         
     
          
        </tbody>
        </table> : <></>}

      </div>
      </Fragment>

  )
}

export default Alocacao