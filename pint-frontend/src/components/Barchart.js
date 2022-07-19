/*
import React from 'react'
import { Bar } from 'react-chartjs-2'
import {Chart as ChastJS} from 'chart.js/auto'

function Barchart({ charData }) {
  

  const [inputs, setInputs] = useState({
    idcentro: ""
    
});

const { idcentro } = inputs;

const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
}
  const [reservasData, setReservasData] = useState({
    labels: reservasData.map(),
    
    datasets:[]
  })


  const dadosReservas = async () => {
    e.preventDefault();
    const body = { idcentro };
    try {
      const res = await fetch(APIUrl + "/api/reserva/reservaMensal", 
        {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    });
      const dadosArray = await res.json();
      setReservasData(dadosArray);
    } catch (err) {
      console.error(err.message);
    }
  };



  return (

    <Bar data={charData}  />
  )
}

export default Barchart
*/