import React, { useState, useEffect } from 'react';
import styles from "./index.module.css"

import Logo from '../../images/logo.png'
import Satc from '../../images/satc.svg'
import Hub from '../../images/hub.svg'
import Pagina from '../../Components/Pagina'
import Modal from '../../Components/Modal'
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import api from '../../services/api'
import moment from 'moment'


function Reservas() {

    const navigate = useNavigate();

    const [modalReservaOpen, setModalReservaOpen] = useState(false);
    const [modalDevOpen, setModalDevOpen] = useState(false);
    const [chaves, setChaves] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [idxSel, setIdxSel] = useState(-1);

    useEffect(() => {

        api.get('/chave/recuperadisponiveis', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@CDTEC/Token')
            }
        }).then(async (res) => {
            var temp = [];
            await res.data.forEach(element => {
                temp.push({ value: element.id, label: element.sala })
            });
            setChaves(temp)

        }).catch((err) => {
            if (err.response.status === 401) {
                localStorage.removeItem('@CDTEC/Token')
                localStorage.removeItem('@CDTEC/User')
                navigate('/');
            } else {
                alert(err.response.data.err)
            }
        })



        api.get('/reserva/recupera', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@CDTEC/Token')
            }
        }).then(async (res) => {


            setReservas(res.data)


        }).catch((err) => {
            if (err.response.status === 401) {
                localStorage.removeItem('@CDTEC/Token')
                localStorage.removeItem('@CDTEC/User')
                navigate('/');
            } else {
                alert(err.response.data.err)
            }
        })



    }, [])



    const [usuario, setUsuario] = useState('')
    const [chave, setChave] = useState(-1)



    const reservar = () => {
        setModalReservaOpen(true);
    }

    const devolver = (idx) => {
        setIdxSel(idx);
        setModalDevOpen(true);
    }

    const salvar = () => {

        if (chave === -1) {
            return alert("Você deve selecionar uma chave!");
        }
        if (!usuario) {
            return alert("Você deve fornecer o nome de quem reservou!");
        }

        var chaveSelect = chaves.find((value => value.value === chave)).label;



        api.post('/reserva/reservar', { sala_id: chave, nome_reserva: usuario }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@CDTEC/Token')
            }
        }).then((res) => {


            var tempReserva = [...reservas];
            var tempChaves = [...chaves];

            console.log(chaves)

            var index = chaves.map(function (e) { return e.value; }).indexOf(chave);
            tempChaves.splice(index, 1);
            setChaves([...tempChaves])

            tempReserva.push({ id: res.data.reserva.id, nome_reserva: res.data.reserva.nome_reserva, createdAt: res.data.reserva.createdAt, sala: chaveSelect })
            setReservas([...tempReserva])

            fechaModais();
            alert(res.data.msg)


        }).catch((err) => {
            console.log(err)
            if (err.response.status === 401) {
                localStorage.removeItem('@CDTEC/Token')
                localStorage.removeItem('@CDTEC/User')
                navigate('/');
            } else {
                alert(err.response.data.err)
            }
        })


    }



    const fechaModais = () => {
        limpar();
        setModalReservaOpen(false)
        setModalDevOpen(false)
    }


    const limpar = () => {
        setUsuario('');
        setChave(-1)
        setIdxSel(-1)
    }

    const devolve = () => {


        api.post('/reserva/devolver', { id: reservas[idxSel].id }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@CDTEC/Token')
            }
        }).then((res) => {

            var tempReservas = reservas;
            tempReservas.splice(idxSel, 1);
            setReservas([...tempReservas])
            setChaves([...chaves, ...[res.data.chave]])
            fechaModais();
            alert(res.data.msg)

        }).catch((err) => {
            console.log(err)
            if (err.response.status === 401) {
                localStorage.removeItem('@CDTEC/Token')
                localStorage.removeItem('@CDTEC/User')
                navigate('/');
            } else {
                alert(err.response.data.err)
            }
        })

    }



    return (
        <>
            {modalDevOpen ?

                <Modal title={'Confirmação'} setOpen={(value) => { fechaModais() }}>
                    <>


                        <h4>Confirmar devolução da chave ?</h4>

                        <hr />
                        <div className={styles.WrpButton}>
                            <button type="button" className="btn btn-success me-1" onClick={() => { devolve() }}>Confirmar</button>
                        </div>

                    </>

                </Modal>

                : null}

            {modalReservaOpen ?
                <Modal title={'Reservar chave'} setOpen={(value) => { fechaModais() }}>
                    <>

                        <div className={`group ${styles.MarginGroup}`}>
                            <label for="exampleInputEmail1">Nome reserva:</label>
                            <input type="text" value={usuario} onChange={(evt) => { setUsuario(evt.target.value) }} className="form-control" id="exampleInputEmail1" />
                        </div>

                        <div className={`group ${styles.MarginGroup}`}>
                            <label for="exampleInputEmail1">Sala:</label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                onChange={(value) => { setChave(value.value) }}
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={true}
                                name="color"
                                options={chaves}
                            />
                        </div>




                        <div className={styles.WrpButton}>
                            <button type="button" onClick={() => { salvar() }} className="btn btn-success me-1">Salvar</button>
                        </div>

                    </>

                </Modal>

                :

                null
            }
            <Pagina navigate={navigate}>

                <div className={styles.WrpTitulo}>
                    <div className={styles.ContainerTitulo}></div>
                    <div className={styles.ContainerTitulo}>
                        <h3>Reservas</h3>
                    </div>
                    <div className={styles.ContainerBtnTitulo}>
                        <button type="button" onClick={() => { reservar() }} className="btn btn-success me-1" data-toggle="modal" data-target="#exampleModal">Nova reserva</button>
                    </div>



                </div>


                <div className={styles.WrpTable}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Sala</th>
                                <th scope="col">Nome reserva</th>
                                <th scope="col">Data Reservado</th>
                                <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        <tbody>

                            {reservas.map((values, idx) => {
                                return (
                                    <tr>
                                        <td>{values.sala}</td>
                                        <td>{values.nome_reserva}</td>
                                        <td>{moment(values.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
                                        <div className={styles.BotoesTable}>
                                            <button type="button" onClick={() => { devolver(idx) }} className="btn btn-success me-1">Devolver</button>
                                        </div>
                                    </tr>
                                )
                            })}




                        </tbody>
                    </table>


                </div>



            </Pagina>
        </>



    );
}

export default Reservas;