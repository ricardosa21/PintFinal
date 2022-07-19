import React, { useState, useEffect, Fragment } from "react";

import { useHistory, useNavigate  } from "react-router-dom";
import { toast } from "react-toastify";


import DataTable from "react-data-table-component";
import * as xlsx from 'xlsx';


const CryptoJS = require("crypto-js");
const APIUrl = "http://localhost:3000";
const chave_secreta = process.env.REACT_APP_KEY;


const FormRegistarUtilizador = () => {
    
    
    const [inputs, setInputs] = useState({
        nome_utilizador: "",
        morada: "",
        telemovel: "",
        email: "",
        perfil: "",
        estado: ""
    });

    const { nome_utilizador, morada, telemovel, email, perfil, estado } = inputs;

    const onChange = (e) => {
        setInputs({
            ...inputs, [e.target.name]: e.target.value
        });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { nome_utilizador, morada, telemovel, email, perfil, estado }
            await fetch(APIUrl + "/api/utilizador", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            alert('Utilizador registado com sucesso!');
            toast.success("Utilizador registado com sucesso!");
            setInputs({
                nome_utilizador: '',
                morada: '',
                telemovel: '',
                email: '',
                password: ''
                

            });
        } catch (error) {
            console.log(error.message);
        };
    };

    return (
        <div className="divNice">
        <form id="registo" onSubmit={onSubmitForm}>
            <h4>Registe aqui o Utilizador</h4>
            <div className="form-row">
                <div className="col-sm-6">
                    <label htmlFor="nome_utilzzador">Nome:</label>
                    <input type="text" name="nome_utilizador" className="form-control" id="nome_utilizador" pattern="^[a-zA-ZÀ-ž\s]+$" value={nome_utilizador} onChange={e => onChange(e)} required />
                    <br />
                    <label htmlFor="morada">Morada:</label>
                    <input type="text" name="morada" className="form-control" id="morada" pattern="^[a-zA-ZÀ-ž\s]+$" value={morada} onChange={e => onChange(e)} required />
                    <br />
                    <label htmlFor="telemovel">Telemovel:</label>
                    <input type="tel" name="telemovel" className="form-control" id="telemovel" pattern="[9][1236][0-9]{7}" value={telemovel} onChange={e => onChange(e)} required />
                    <br />
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" className="form-control" id="email"  value={email} onChange={e => onChange(e)} required />
                    <br />
                    <label htmlFor="perfil">Perfil:</label>
                    <select className="form-control" name="perfil" id="estado"  onClick = { e => onChange(e) } required>
                    <option value="1">Admin </option>
                    <option value="0">Utilizador</option>
                    </select>
                    <br />
                    <label htmlFor="estado">Estado:</label>
                    <select className="form-control" name="estado" id="estado"  onClick = { e => onChange(e) } required>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                    </select>
                    <br/>
                </div>    
            </div>
            <button type="submit" className="btn btn-primary"  >Registar Utilizador</button>
            </form>
        </div>
    )
}




const FormAssociarUtilizadorCentro = () => {
    
    const [centros, setCentros] = useState([]);
    const [inputs, setInputs] = useState({
        id_centro:"",
    });
    const [idutilizador, setIdutilizador] = useState(null);
    const [utilizadores, setUtilizadores] = useState([]);
    

    //const { id_centro } = inputs;

    const onChange = (e) => {
        setInputs({
            ...inputs, [e.target.name]: e.target.value
        });
    };


    const utilizadorSel = (e) => {
        const selectedIndexM = document.getElementById("utilizador_sel").options.selectedIndex;
        if (utilizadores.length >= 1) {
            setIdutilizador(Number(document.getElementById("utilizador_sel").options[selectedIndexM].getAttribute('data-uti')));
        }
    };

    

    

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            await fetch(APIUrl + "/api/utilizador/centro-uti/"+ idutilizador, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
            });
            alert('Utiliador editado com sucesso!');
            toast.success("Utilizador editado com sucesso!");
        } catch (error) {
            console.log(error.message);
        };
    };

    async function getUtilizadores() {
        const res = await fetch(APIUrl + "/api/utilizador");
        const utilizadoresArray = await res.json();
        setUtilizadores(utilizadoresArray);
    }

    async function getCentros() {
        const res = await fetch(APIUrl + "/api/centro");
        const centrosArray = await res.json();
        setCentros(centrosArray);
    };


    useEffect(() => {
        getUtilizadores();
        getCentros();
    }, []);

    return (
        <div className="divNice">
            <h4>Associe um centro ao utilizador</h4>
        <form id="AtivarUti" onSubmit={onSubmitForm}>
        <div className="col-sm-6">
            <label htmlFor="utilizador_sel">Escolha o utilizador:</label>
            <select className="form-control" name="utilizadores" id="utilizador_sel"  onChange={ e => utilizadorSel(e) } required>
                <option value="" disabled="disable"> Selecione um utilizador</option>
                {utilizadores.map(e => (
                    <option key={e.id_utilizador} data-uti={e.id_utilizador} >{e.nome_utilizador}</option>
                ))}
                </select>
                
            </div>
            <div className="col-sm-6">
                <label htmlFor="estado">Altere o centro:</label>
                <select className="form-control" name="id_centro" id="id_centro"  onChange = { e => onChange(e) } required>
                <option value="" disabled="disable"> Selecione um centro</option>
                {centros.map(e => (
                    <option key={e.id_centro} value={e.id_centro} data-uti={e.id_centro}>{e.nome_centro}</option>
                ))}
                </select>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary" >Mudar centro do utilizador</button>
        </form>
        </div>    
    )
        
        
}

const FormDefinirEstadoSala = () => {
    const [input, setEstado] = useState({
        estado: "",
    });

    
    const [centros, setCentros] = useState([]);
    const [idsala, setIdSala] = useState(null);
    const [idcentro, setIdCentro] = useState(null);
    const [salasCentro, setSalasCentro] = useState([]);

    const { estado } = input;


    const setIdSalaEst = () => {
        const selectedIndexS = document.getElementById("sala_sel").options.selectedIndex;
        if (salasCentro.length >= 1) {
            setIdSala(Number(document.getElementById("sala_sel").options[selectedIndexS].getAttribute('data-sala')));
        }
    };

    const setEstadoSala = (e) => {
        setEstado({
            ...input, [e.target.name]: e.target.value
        });
    }

    const onMouseOver = () => {
        const selectedIndexC = document.getElementById("centro_sel").options.selectedIndex;
        if (centros.length >= 1) {
            setIdCentro(Number(document.getElementById("centro_sel").options[selectedIndexC].getAttribute('data-centro')));
        }
    };



    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            await fetch(APIUrl + "/api/sala/"+idsala, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input)
            });
            alert('Estado editado com sucesso!');
            toast.success("Estado editado com sucesso!");
        } catch (error) {
            console.log(error.message);
        };
    };

    

    async function getCentros() {
        const res = await fetch(APIUrl + "/api/centro");
        const centrosArray = await res.json();
        setCentros(centrosArray);
    };



    async function getSalasCentro() {
        const res = await fetch(APIUrl + "/api/sala/salas-centro/"+ idcentro );
        const salasCentroArray = await res.json();
        setSalasCentro(salasCentroArray);

    };
    
   


    useEffect(() => {
        //getSalasCentro();
        getCentros();
        
    },[]);

    return (
        <div className="divNice">
            <h4>Ativar ou inativar a sala</h4>
        <form id="AlterarEstado" onSubmit={onSubmitForm}>
        
                <label htmlFor="sala_sel">Escolha o centro:</label>
            <div className="form-row">
                <div className="col-sm-6">
            <select className="form-control" name="centros" id="centro_sel"  onMouseOver={ onMouseOver }  onClick={getSalasCentro}  required>
                <option value="" disabled="disable"> Selecione um centro</option>
                {centros.map(e => (
                    <option  key={e.id_centro} data-centro={e.id_centro}>{e.nome_centro}</option>
                    
                ))}
                    </select>
                    
                    
            </div>    
            </div>

            <label htmlFor="sala_sel">Escolha a sala:</label>
            <div className="col-sm-6">
                    <select className="form-control" name="salas" id="sala_sel"  onClick={ e => setIdSalaEst(e) }  required>
                    <option value="" disabled="disable"> Selecione uma sala</option>
                        {salasCentro.map(e => (
                            <option key={e.id_sala} data-sala={e.id_sala}>
                                {e.nome_sala}
                            </option>
                        ))

                        }
                    </select>
            </div>

            
            <div className="col-sm-6">
            <label htmlFor="estado">Altere o estado:</label>
                <select className="form-control" name="estado" id="estado" onMouseOver = { e => setEstadoSala(e) } required>
                    <option value=""></option>
                    <option value="Ativo">Ativar </option>
                    <option value="Inativo">Inativar</option>
                </select>
            </div>
            <br/>
            
            <button type="submit" className="btn btn-primary">Guardar altereções</button>
        </form>
        </div>
    )
}

const FormDesativarCentro = () => {
    const [estado, setEstado] = useState({
            estado: ""
    });
    
    const [centros, setCentros] = useState([]);
    const [idcentro, setIdcentro] = useState(null);
    const [centrosAtivos, setCentrosAtivos] = useState([]);
    const [centrosInativos, setCentrosInativos] = useState([]);
    
    
    
        const onChange = (e) => {
            const selectedIndexM = document.getElementById("centro_sel").options.selectedIndex;
            setEstado({
                ...estado, [e.target.name]: e.target.value
            });
            if (centros.length >= 1) {
                setIdcentro(Number(document.getElementById("centro_sel").options[selectedIndexM].getAttribute('data-uti')));
            }
        };
    
        const onSubmitForm = async (e) => {
            e.preventDefault();
            try {
                await fetch(APIUrl + "/api/centro/"+idcentro, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(estado)
                });
                alert('Centro editado com sucesso!');
                toast.success("Centro editado com sucesso!");
            } catch (error) {
                console.log(error.message);
            };
        };
    
    async function getCentros() {
            const res = await fetch(APIUrl + "/api/centro");
            const centroArray = await res.json();
            setCentros(centroArray);
    }
    
    async function getCentrosAtivos() {
        const res = await fetch(APIUrl + "/api/centro/centrosativos");
        const centroAtivoArray = await res.json();
        setCentrosAtivos(centroAtivoArray);
    };

    const listaCentrosAtivos = centrosAtivos.map((centros) => (
        <li key={centros.id_centro} className="list-group-item list-group-item-action">{centros.nome_centro}</li>
    ));

    async function getCentrosInativos() {
        const res = await fetch(APIUrl + "/api/centro/centrosinativos");
        const centroInativoArray = await res.json();
        setCentrosInativos(centroInativoArray);
    };

    const listaCentrosInativos = centrosInativos.map((centros) => (
        <li key={centros.id_centro} className="list-group-item list-group-item-action">{centros.nome_centro}</li>
    ));

        useEffect(() => {
            getCentros();
            getCentrosAtivos();
            getCentrosInativos();
        }, []);
    
        return (
            <Fragment>
                <div className="divNice3" style={{ float: "left" }}>
                <h3>Lista dos centros ativos:</h3>
                <ul className="list-group">
                    {listaCentrosAtivos}
                </ul>
            </div>        
                <div className="divNice3" style={{ float: "left" }}> 
                <h3>Lista dos centros inativos:</h3>        
                <ul className="list-group">
                    {listaCentrosInativos}
                </ul>
            </div>
                <div className="divNice4">
                <h3>Ativar ou inativar o centro</h3>
            <form id="DesativarCentro" onSubmit={onSubmitForm}>
            <div className="col-sm-6">
                <label htmlFor="centro_sel">Escolha o centro:</label>
                <select className="form-control" name="centros" id="centro_sel"  onClick={ e => onChange(e) } required>
                    <option value="" disabled="disable"> Selecione um centro</option>
                    {centros.map(e => (
                        <option key={e.id_centro} data-uti={e.id_centro} >{e.nome_centro}</option>
                    ))}
                    </select>
                    
                </div>
                <div className="col-sm-6">
                    <label htmlFor="estado">Altere o estado:</label>
                    <select className="form-control" name="estado" id="estado"  onClick = { e => onChange(e) } required>
                        <option value="Ativo">Ativar </option>
                        <option value="Inativo">Inativar</option>
                    </select>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary" >Ativar ou Inativar Centro</button>
                    </form>
            </div>
            </Fragment>
            
      )
    }

const FormMudarpermUtilizador = () => {
    const [perfil, setPerfil] = useState({
        perfil: ""
    });

    const [utilizadores, setUtilizadores] = useState([]);
    const [idutilizador, setIdutilizador] = useState(null);


    const onChange = (e) => {
        const selectedIndexM = document.getElementById("utilizador_sel").options.selectedIndex;
        setPerfil({
            ...perfil, [e.target.name]: e.target.value
        });
        if (utilizadores.length >= 1) {
            setIdutilizador(Number(document.getElementById("utilizador_sel").options[selectedIndexM].getAttribute('data-uti')));
        }
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            await fetch(APIUrl + "/api/utilizador/mudar-perm/"+idutilizador, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(perfil)
            });
            alert('Utiliador editado com sucesso!');
            toast.success("Utilizador editado com sucesso!");
        } catch (error) {
            console.log(error.message);
        };
    };

    async function getUtilizadores() {
        const res = await fetch(APIUrl + "/api/utilizador");
        const utilizadoresArray = await res.json();
        setUtilizadores(utilizadoresArray);
    }
    useEffect(() => {
        getUtilizadores();
    }, []);

    return (
        <div className="divNice">
            <h4>Mude aqui a permissão do utilizador</h4>
        <form id="AtivarUti" onSubmit={onSubmitForm}>
        <div className="col-sm-6">
            <label htmlFor="utilizador_sel">Escolha o utilizador:</label>
            <select className="form-control" name="utilizadores" id="utilizador_sel"  onMouseOver={ e => onChange(e) } required>
                <option value="" disabled="disable">Selecione um utilizador</option>
                {utilizadores.map(e => (
                    <option key={e.id_utilizador} data-uti={e.id_utilizador} >{e.nome_utilizador}</option>
                ))}
                </select>
                
            </div>
            <div className="col-sm-6">
                <label htmlFor="perfil">Altere o perfil do utilizador:</label>
                <select className="form-control" name="perfil" id="perfil"  onClick = { e => onChange(e) } required>
                    <option value="1">Admin</option>
                    <option value="0">Utilizador</option>
                </select>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">Mudar permissão</button>
        </form>
        </div>
    )
        
        
}



const FormDefinirLimiteSala = () => {
    const [input, setLimite] = useState({
        limite: "",
    });

    
    const [centros, setCentros] = useState([]);
    const [idsala, setIdSala] = useState(null);
    const [idcentro, setIdCentro] = useState(null);
    const [salasCentro, setSalasCentro] = useState([]);

    const { limite } = input;


    const setIdSalaLim = () => {
        const selectedIndexS = document.getElementById("sala_sel").options.selectedIndex;
        if (salasCentro.length >= 1) {
            setIdSala(Number(document.getElementById("sala_sel").options[selectedIndexS].getAttribute('data-sala')));
        }
    };

    const setLimiteSala = (e) => {
        setLimite({
            ...input, [e.target.name]: e.target.value
        });
    }

    const onMouseOver = () => {
        const selectedIndexC = document.getElementById("centro_sel").options.selectedIndex;
        if (centros.length >= 1) {
            setIdCentro(Number(document.getElementById("centro_sel").options[selectedIndexC].getAttribute('data-centro')));
        }
    };



    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            await fetch(APIUrl + "/api/sala/edit-limite/"+idsala, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input)
            });
            alert('Limite editado com sucesso!');
            toast.success("Limite editado com sucesso!");
        } catch (error) {
            console.log(error.message);
        };
    };

    

    async function getCentros() {
        const res = await fetch(APIUrl + "/api/centro");
        const centrosArray = await res.json();
        setCentros(centrosArray);
    };



    async function getSalasCentro() {
        const res = await fetch(APIUrl + "/api/sala/salas-centro/"+ idcentro );
        const salasCentroArray = await res.json();
        setSalasCentro(salasCentroArray);

    };
    
   


    useEffect(() => {
        //getSalasCentro();
        getCentros();
        
    },[]);

    return (
        <div className="divNice">
            <h4>Defina o limite da sala</h4>
        <form id="AlterarLimite" onSubmit={onSubmitForm}>
        
                <label htmlFor="sala_sel">Escolha o centro:</label>
            <div className="form-row">
                <div className="col-sm-6">
            <select className="form-control" name="centros" id="centro_sel"  onMouseOver={ onMouseOver }  onClick={getSalasCentro}  required>
                <option value="" disabled="disable"> Selecione um centro</option>
                {centros.map(e => (
                    <option  key={e.id_centro} data-centro={e.id_centro}>{e.nome_centro}</option>
                    
                ))}
                    </select>
                    
                    
            </div>    
            </div>

            <label htmlFor="sala_sel">Escolha a sala:</label>
            <div className="col-sm-6">
                    <select className="form-control" name="salas" id="sala_sel"  onClick={ e => setIdSalaLim(e) }  required>
                    <option value="" disabled="disable"> Selecione uma sala</option>
                        {salasCentro.map(e => (
                            <option key={e.id_sala} data-sala={e.id_sala}>
                                {e.nome_sala}
                            </option>
                        ))

                        }
                    </select>
            </div>

            
            <div className="col-sm-6">
                <label htmlFor="limite">Limite:</label>
                <input type="text" name="limite" className="form-control" id="limite"  value={limite} onChange={e => setLimiteSala(e)}/>
                
            </div>
            <br/>
            
            <button type="submit" className="btn btn-primary">Guardar altereções</button>
            </form>
            </div>
        
    )
}

const  FormCriarCentro = () => {
    const [inputs, setInputs] = useState({
        nome: "",
        morada: ""
        
    });

    const { nome_centro, morada } = inputs;

    const onChange = (e) => {
        setInputs({
            ...inputs, [e.target.name]: e.target.value
        });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { nome_centro, morada }
            await fetch(APIUrl + "/api/centro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            alert('Centro criado com sucesso!');
            toast.success("Centro criado com sucesso!");
        } catch (error) {
            console.log(error.message);
        };
    };

    return (
        <div className="divNice">
        <form id="criacao" onSubmit={onSubmitForm}>
            <h4>Crie aqui o centro</h4>
            <div className="form-row">
                <div className="col-sm-6">
                    <label htmlFor="nome_centro">Nome:</label>
                    <input type="text" name="nome_centro" className="form-control" id="nome_centro" pattern="^[a-zA-Z0-9À-ž\s]+$" value={nome_centro} onChange={e => onChange(e)} required />
                    <br />
                    <label htmlFor="morada">Morada:</label>
                    <input type="text" name="morada" className="form-control" id="morada" pattern="^[a-zA-Z0-9À-ž\s]+$" value={morada} onChange={e => onChange(e)} required />
                    <br />
                </div>    
            </div>
            <button type="submit" className="btn btn-primary"  >Criar Centro</button>
            </form>
            </div>
    )
}

const FormCriarSala = () => {
    const [centros, setCentros] = useState([]);
    const [id_centro, setIdCentro] = useState("");
    const [inputs, setInputs] = useState({
        nome_sala: "",
        
        lotacao: "",
        limite: "",
        estado: ""
    });

    const { nome_sala,  lotacao, limite, estado } = inputs;

    const onChange = (e) => {
        setInputs({
            ...inputs, [e.target.name]: e.target.value
        });
    };
    
    const onMouseOver = () => {
        const selectedIndexC = document.getElementById("centro_sel").options.selectedIndex;
        if (centros.length >= 1) {
            setIdCentro(Number(document.getElementById("centro_sel").options[selectedIndexC].getAttribute('data-centro')));
        }
    };

    async function getCentros() {
        const res = await fetch(APIUrl + "/api/centro");
        const centrosArray = await res.json();
        setCentros(centrosArray);
    };

    useEffect(() => {
        
        getCentros();
        
    },[]);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { nome_sala, id_centro, lotacao, limite, estado }
            await fetch(APIUrl + "/api/sala", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            alert('Sala criada com sucesso!');
            toast.success("Sala criada com sucesso!");
        } catch (error) {
            console.log(error.message);
        };
    };

    return (
        <div className="divNice">
            <h4>Cria aqui a sala</h4>
        <form id="criacao" onSubmit={onSubmitForm}>
            <div></div>
            <div className="form-row">
                <div className="col-sm-6">
                    <label htmlFor="nome_sala">Nome:</label>
                    <input type="text" name="nome_sala" className="form-control" id="nome_sala" pattern="^[a-zA-Z0-9\s]+$" value={nome_sala} onChange={e => onChange(e)} required />
                    <br />
                    
                    <label htmlFor="sala_sel">Escolha o centro:</label>
            <div className="form-row">
                <div className="col-sm-6">
            <select className="form-control" name="centros" id="centro_sel"  onClick={ onMouseOver } required>
                <option value="" disabled="disable"> Selecione um centro</option>
                {centros.map(e => (
                    <option  key={e.id_centro} data-centro={e.id_centro}>{e.nome_centro}</option>
                    
                ))}
                    </select>
                    
                    
            </div>    
            </div>
                    
                    <label htmlFor="lotacao">Lotação:</label>
                    <input type="text" name="lotacao" className="form-control" id="lotacao" value={lotacao} onChange={e => onChange(e)} required />
                    <br />
                    <label htmlFor="limite">Limite da Sala:</label>
                    <input type="text" name="limite" className="form-control" id="limite" value={limite} onChange={e => onChange(e)} required />
                    <br />
                    <label htmlFor="estado">Estado:</label>
                    <input type="text" name="estado" className="form-control" id="estado"  value={estado} onChange={e => onChange(e)} required />
                    <br/>
                </div>    
            </div>
            <button type="submit" className="btn btn-primary"  >Criar Sala</button>
            </form>
            </div>    
    )
}


    
    

function FormLogin({setAuth}) {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;
    
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch(APIUrl + "/api/utilizador/login",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
    
            const parseRes = await response.json();
    
            if (parseRes.jwtToken) {
                localStorage.setItem("jwtToken", parseRes.jwtToken);
                localStorage.setItem("verPass", parseRes.verPass);
                localStorage.setItem("id", parseRes.id);
                localStorage.setItem("email", CryptoJS.AES.encrypt(email, chave_secreta).toString());
                setAuth(true);
                toast.success("Sessão iniciada com sucesso!");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }

            
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        
        <div  id="login">
        <img className="img-fluid" src="\imagens\softinsa_logo.png" alt="Logo Softinsa" />
      
      <form  className="formlogin" onSubmit={onSubmitForm}>
      <div className="form-group col-md-4">
            <label htmlFor="email">Email:</label>
                <input type="text" name="email" className="form-control" id="email"  value={email} onChange={e => onChange(e)} required />
                <br />
            </div> 
        <div className="form-group col-md-4" >   
        <label htmlFor="password">Password:</label>
                <input type="text" name="password" className="form-control" id="password"  value={password} onChange={e => onChange(e)} required />
                <br />
        </div> 
          <div className="row">
              <div className="col-sm-6">
              <button type="submit" className="btn btn-primary">Login</button>
              </div>
          </div>
      </form>
      <div className="footer">©Todos os direitos reservados.</div>
            </div>
            
            
    );
}


function FormAlterarPassword() {

    const history = useHistory();
    let email_encrypt, email;
    
        email_encrypt = localStorage.getItem("email");
        let bytes  = CryptoJS.AES.decrypt(email_encrypt, chave_secreta);
        email = bytes.toString(CryptoJS.enc.Utf8);
    
    
    const [inputs, setInputs] = useState({
        email: email,
        passnova: "",
        passnovaverificar:""

    });

    const {  passnova, passnovaverificar } = inputs;
    
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        history.push("/");
        try {
            const body = { email, passnova, passnovaverificar };
            await fetch(APIUrl + "/api/utilizador/alterarpassword",
                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
            
            
        } catch (err) {
            console.error(err.message);
        }
        
    };


    
    
    return (
        <div  id="alterarpassword">
        <form  onSubmit={onSubmitForm}>
          <div className="form-group col-md-4">
                <label htmlFor="email">Nova Password:</label>
                    <input type="text" name="passnova" className="form-control" id="passnova"  value={passnova} onChange={e => onChange(e)} required />
                    <br />
                </div> 
            <div className="form-group col-md-4" >   
            <label htmlFor="password">Confirmar password:</label>
                    <input type="text" name="passnovaverificar" className="form-control" id="passnovaverificar"  value={passnovaverificar} onChange={e => onChange(e)} required />
                    <br />
            </div> 
			  <div className="row">
                  <div className="col-sm-6">
                  <button type="submit" className="btn btn-primary">Alterar password</button>
                  </div>
			  </div>
		  </form>
		  <div className="footer">Todos os direitos reservados.</div>
        </div>
    );
}


const FormLimpaSala = () => {
    

    
    const [centros, setCentros] = useState([]);
    const [idsala, setIdSala] = useState(null);
    const [idcentro, setIdCentro] = useState(null);
    const [salasCentro, setSalasCentro] = useState([]);

    
    const onMouseOver = () => {
            const selectedIndexC = document.getElementById("centro_sel").options.selectedIndex;
        if (centros.length >= 1) {
                setIdCentro(Number(document.getElementById("centro_sel").options[selectedIndexC].getAttribute('data-centro')));
            }
    };

    const setIdSalaLim = () => {
        const selectedIndexS = document.getElementById("sala_sel").options.selectedIndex;
        if (salasCentro.length >= 1) {
            setIdSala(Number(document.getElementById("sala_sel").options[selectedIndexS].getAttribute('data-sala')));
        }
    };

    

    



    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            await fetch(APIUrl + "/api/sala/sala-limpeza/"+idsala, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
                
            });
            alert('Aviso enviado!');
            toast.success("Limite editado com sucesso!");
        } catch (error) {
            console.log(error.message);
        };
    };

    

    async function getCentros() {
        const res = await fetch(APIUrl + "/api/centro");
        const centrosArray = await res.json();
        setCentros(centrosArray);
    };



    async function getSalasCentro() {
        const res = await fetch(APIUrl + "/api/sala/salas-centro/"+ idcentro );
        const salasCentroArray = await res.json();
        setSalasCentro(salasCentroArray);

    };
    
   


    useEffect(() => {
        getCentros();
    },[]);

    return (
        <div className="divNice">
            <h4>Escolha a sala que deve ser limpa</h4>
        <form id="AlterarLimite" onSubmit={onSubmitForm}>
        
                <label htmlFor="sala_sel">Escolha o centro:</label>
            <div className="form-row">
                <div className="col-sm-6">
            <select className="form-control" name="centros" id="centro_sel"  onMouseOver={ ()=>onMouseOver() }  onClick={()=> getSalasCentro()}  required>
                <option value="" disabled="disable"> Selecione um centro</option>
                {centros.map(e => (
                    <option  key={e.id_centro} data-centro={e.id_centro}>{e.nome_centro}</option>
                    
                ))}
                    </select>
                    
                    
            </div>    
            </div>

            <label htmlFor="sala_sel">Escolha a sala:</label>
            <div className="col-sm-6">
                    <select className="form-control" name="salas" id="sala_sel"  onClick={ e => setIdSalaLim(e) }  required>
                    <option value="" disabled="disable"> Selecione uma sala</option>
                        {salasCentro.map(e => (
                            <option key={e.id_sala} data-sala={e.id_sala}>
                                {e.nome_sala}
                            </option>
                        ))

                        }
                    </select>
            </div>

            
            
            <br />
            
            <button type="submit" className="btn btn-primary">Aviso de limpeza enviado!</button>
            </form>
            </div>
        
    )
}


function TempoLimpeza() {

    const [inputs, setInputs] = useState({
        tempo: ""
        
    });

    const { tempo } = inputs;
    
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { tempo };
            const response = await fetch(APIUrl + "/api/reserva/tempolimpeza",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
                
            );
            alert("Tempo de limpeza alterado!");
            
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <div className="divNice">
            <h4>Defina o tempo de limpeza</h4>
        <form onSubmit={onSubmitForm}>
            <label htmlFor="tempo">Escolha o tempo de limpeza:</label>
            <div className="form-row">
                <div className="col-sm-6">
            <select className="form-control" name="tempo" id="tempo" onClick={e => onChange(e)} required>
                <option value="" disabled="disable"> Selecione um valor</option>
                
                    <option value="00:05" >00:05</option>
                    <option value="00:10" >00:10</option>
                    <option value="00:15" >00:15</option>
                    <option value="00:20" >00:20</option>
                    
                
            </select>
                    
                    
            </div>    
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">Gravar altereções</button>
            </form >
            </div>
    );
}

function FileCSV() {
 
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
   
    // process CSV data
    const processData = dataString => {
      const dataStringLines = dataString.split(/\r\n|\n/);
      const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
   
      const list = [];
      for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        if (headers && row.length == headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            let d = row[j];
            if (d.length > 0) {
              if (d[0] == '"')
                d = d.substring(1, d.length - 1);
              if (d[d.length - 1] == '"')
                d = d.substring(d.length - 2, 1);
            }
            if (headers[j]) {
              obj[headers[j]] = d;
            }
          }
   
          // remove the blank rows
          if (Object.values(obj).filter(x => x).length > 0) {
            list.push(obj);
          }
        }
      }
   
      // prepare columns list from headers
      const columns = headers.map(c => ({
        name: c,
        selector: c,
      }));
   
      setData(list);
      setColumns(columns);
    }
   
    // handle file upload
    const handleFileUpload = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = xlsx.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = xlsx.utils.sheet_to_csv(ws, { header: 1 });
        processData(data);
      };
      reader.readAsBinaryString(file);
    };

    const onSubmitForm = e => {
        e.preventDefault();
        try {
            fetch(APIUrl + "/api/utilizador/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data) 
            });
            alert('Utilizadores importados com sucesso!');
            toast.success("Utilizadores importados com sucesso!");
            setData([]);
            setColumns([]);
        } catch (error) {
            console.log(error.message);
        };
    }
    
   
    return (
      <div className="divNice">
        <h3>Read CSV file </h3>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
        />
        <DataTable
          pagination
          highlightOnHover
          columns={columns}
          data={data}
        />
        <button
            onClick={(e) => {
              onSubmitForm(e);
            }}
          >
            IMPORT CSV
          </button>
      </div>
    );
  }







export {
    FormRegistarUtilizador,
    FormMudarpermUtilizador,
    FormDefinirLimiteSala,
    FormAssociarUtilizadorCentro,
    FormLogin,
    FormCriarCentro,
    FormCriarSala,
    FormAlterarPassword,
    FormLimpaSala,
    TempoLimpeza,
    FormDesativarCentro,
    FormDefinirEstadoSala,
    FileCSV,
}