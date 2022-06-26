import React, { useEffect, useState } from 'react';
import styles from "./index.module.css"

import Pagina from '../../Components/Pagina'
import Modal from '../../Components/Modal'

import api from '../../services/api'

import { useNavigate } from "react-router-dom";


function Chaves() {

    const navigate = useNavigate();


    const [modalCadOpen, setModalCadOpen] = useState(false);
    const [modalDelOpen, setModalDelOpen] = useState(false);

    const [idxSelecao, setIdxSelecao] = useState(-1)

    const [sala, setSala] = useState('')
    const [observacao, setObservacao] = useState('')

    const [chaves, setChaves] = useState([]);

    useEffect(() => {
        api.get('/chave/recupera', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@CDTEC/Token')
            }
        }).then((res) => {

            setChaves(res.data)

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

    const adicionar = () => {
        setModalCadOpen(true);
    }

    const deletar = (idx) => {
        setIdxSelecao(idx);
        setModalDelOpen(true)
    }

    const deleta = () => {
        api.delete(`/chave/deleta/${chaves[idxSelecao].id}`, { sala, observacao }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@CDTEC/Token')
            }
        }).then((res) => {

            var tempChaves = chaves;
            tempChaves.splice(idxSelecao, 1);
            setChaves([...tempChaves])
            fechaModais();
            alert(res.data.msg)

        }).catch((err) => {
            if (err.response.status === 401) {
                localStorage.removeItem('@CDTEC/Token')
                localStorage.removeItem('@CDTEC/User')
                navigate('/');
            } else {
                alert(err.response.data.err)
            }
        })
    }

    const salvar = () => {

        if (idxSelecao === -1) {

            api.post('/chave/cadastra', { sala, observacao }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@CDTEC/Token')
                }
            }).then((res) => {
                var tempChaves = chaves;
                tempChaves.push({ id: res.data.chave.id, sala: res.data.chave.sala, observacao: res.data.chave.observacao })
                setChaves([...tempChaves])
                fechaModais();
                alert(res.data.msg)
            }).catch((err) => {
                if (err.response.status === 401) {
                    localStorage.removeItem('@CDTEC/Token')
                    localStorage.removeItem('@CDTEC/User')
                    navigate('/');
                } else {
                    alert(err.response.data.err)
                }
            })
        } else {
            api.put(`/chave/edita/${chaves[idxSelecao].id}`, { sala, observacao }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@CDTEC/Token')
                }
            }).then((res) => {
                var tempChaves = chaves;
                tempChaves[idxSelecao] = { id: tempChaves[idxSelecao].id, sala: res.data.chave.sala, observacao: res.data.chave.observacao };
                setChaves([...tempChaves])
                fechaModais();
                alert(res.data.msg)
            }).catch((err) => {
                if (err.response.status === 401) {
                    localStorage.removeItem('@CDTEC/Token')
                    localStorage.removeItem('@CDTEC/User')
                    navigate('/');
                } else {
                    alert(err.response.data.err)
                }
            })
        }
    }

    const editar = (idx) => {
        setIdxSelecao(idx);
        setModalCadOpen(true);
        setSala(chaves[idx].sala)
        setObservacao(chaves[idx].observacao)
        setIdxSelecao(idx);
    }

    const fechaModais = () => {
        limpar();
        setModalCadOpen(false)
        setModalDelOpen(false)
    }

    const limpar = () => {
        setSala('');
        setObservacao('');
        setIdxSelecao(-1);
    }



    return (
        <>
            {modalDelOpen ?

                <Modal title={'Confirmação'} setOpen={(value) => { fechaModais() }}>
                    <>


                        <h4>Você realmente deseja excluir ?</h4>

                        <hr />
                        <div className={styles.WrpButton}>
                            <button type="button" onClick={() => { deleta() }} className="btn btn-success me-1">Confirmar</button>
                        </div>

                    </>

                </Modal>

                : null}

            {modalCadOpen ?
                <Modal title={'Chaves'} setOpen={(value) => { fechaModais() }}>
                    <>

                        <div className={`group ${styles.MarginGroup}`}>
                            <label for="exampleInputEmail1">Sala:</label>
                            <input type="text" value={sala} onChange={(evt) => { setSala(evt.target.value) }} className="form-control" id="exampleInputEmail1" />
                        </div>

                        <div className={`group ${styles.MarginGroup}`}>
                            <label for="exampleInputEmail1">Observação:</label>
                            <input type="text" value={observacao} onChange={(evt) => { setObservacao(evt.target.value) }} className="form-control" id="exampleInputEmail1" />
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
                        <h3>Chaves</h3>
                    </div>
                    <div className={styles.ContainerBtnTitulo}>
                        <button type="button" onClick={() => { adicionar() }} className="btn btn-success me-1" data-toggle="modal" data-target="#exampleModal">Adicionar</button>
                    </div>



                </div>


                <div className={styles.WrpTable}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Sala</th>
                                <th scope="col">Observacao</th>
                                <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chaves.map((values, idx) => {
                                return (<tr>
                                    <td>{values.sala}</td>
                                    <td>{values.observacao}</td>
                                    <div className={styles.BotoesTable}>
                                        <button type="button" onClick={() => { deletar(idx) }} className="btn btn-danger me-1">Excluir</button>
                                        <button type="button" onClick={() => { editar(idx) }} className="btn btn-primary me-1">Editar</button>
                                    </div>
                                </tr>)
                            })
                            }






                        </tbody>
                    </table>


                </div>



            </Pagina>
        </>



    );
}

export default Chaves;