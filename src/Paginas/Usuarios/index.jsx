import React, { useState, useEffect } from 'react';
import styles from "./index.module.css"


import Pagina from '../../Components/Pagina'
import Modal from '../../Components/Modal'
import api from '../../services/api'
import { useNavigate } from "react-router-dom";


function Usuarios() {

    const navigate = useNavigate();

    const [modalCadOpen, setModalCadOpen] = useState(false);
    const [modalDelOpen, setModalDelOpen] = useState(false);

    const [idxSelecao, setIdxSelecao] = useState(-1)

    const [usuario, setUsuario] = useState('')
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [Repetirsenha, setRepetirSenha] = useState('')
    const [ativo, setAtivo] = useState(true)

    const [usuarios, setUsuarios] = useState([]);


    const salvar = () => {
        if (senha !== Repetirsenha) {
            return alert('As senhas não são iguais!');
        }
        if (idxSelecao === -1) {



            api.post('/usuarios/cadastra', { usuario, nome, password: senha }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@CDTEC/Token')
                }
            }).then((res) => {
                var tempUsers = usuarios;
                tempUsers.push({ id: res.data.user.id, nome: res.data.user.nome, usuario: res.data.user.usuario, ativo: res.data.user.ativo })
                setUsuario([...tempUsers])
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

            api.put(`/usuarios/edita/${usuarios[idxSelecao].id}`, { usuario, nome, password: senha, ativo: ativo }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@CDTEC/Token')
                }
            }).then((res) => {
                var tempUsers = usuarios;
                tempUsers[idxSelecao] = { id: tempUsers[idxSelecao].id, nome: res.data.user.nome, usuario: res.data.user.usuario, ativo: res.data.user.ativo };
                setUsuario([...tempUsers])
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

    const adicionar = () => {
        setModalCadOpen(true);
    }

    const deletar = (idx) => {
        setIdxSelecao(idx)
        setModalDelOpen(true)
    }

    const deleta = () => {
        api.delete(`/usuarios/deleta/${usuarios[idxSelecao].id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@CDTEC/Token')
            }
        }).then((res) => {

            var tempUsuarios = usuarios;
            tempUsuarios.splice(idxSelecao, 1);
            setUsuarios([...tempUsuarios])
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

    const editar = (idx) => {
        setIdxSelecao(idx);
        setUsuario(usuarios[idx].usuario)
        setNome(usuarios[idx].nome)
        setAtivo(usuarios[idx].ativo)
        setModalCadOpen(true);
    }

    const fechaModais = () => {
        limpar();
        setModalCadOpen(false)
        setModalDelOpen(false)
    }

    const limpar = () => {
        setUsuario('');
        setSenha('');
        setRepetirSenha('');
        setNome('');
        setAtivo(true);
        setIdxSelecao(-1);
    }

    useEffect(() => {
        api.get('/usuarios/recupera', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@CDTEC/Token')
            }
        }).then((res) => {

            console.log(res.data)
            setUsuarios(res.data)

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
                            <label for="exampleInputEmail1">Usuário:</label>
                            <input type="text" value={usuario} onChange={(evt) => { setUsuario(evt.target.value) }} className="form-control" id="exampleInputEmail1" />
                        </div>

                        <div className={`group ${styles.MarginGroup}`}>
                            <label for="exampleInputEmail1">Nome:</label>
                            <input type="text" value={nome} onChange={(evt) => { setNome(evt.target.value) }} className="form-control" id="exampleInputEmail1" />
                        </div>

                        <div className={`group ${styles.MarginGroup}`}>
                            <label for="exampleInputEmail1">Senha:</label>
                            <input type="password" value={senha} onChange={(evt) => { setSenha(evt.target.value) }} className="form-control" id="exampleInputEmail1" />
                        </div>

                        <div className={`group ${styles.MarginGroup}`}>
                            <label for="exampleInputEmail1">Confirmar Senha:</label>
                            <input type="password" value={Repetirsenha} onChange={(evt) => { setRepetirSenha(evt.target.value) }} className="form-control" id="exampleInputEmail1" />
                        </div>

                        {idxSelecao === -1 ? null :

                            <div class="form-check">
                                <input checked={ativo} onChange={() => { setAtivo(!ativo) }} type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Ativo</label>
                            </div>

                        }

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
                        <h3>Usuários</h3>
                    </div>
                    <div className={styles.ContainerBtnTitulo}>
                        <button type="button" onClick={() => { adicionar() }} className="btn btn-success me-1" data-toggle="modal" data-target="#exampleModal">Adicionar</button>
                    </div>



                </div>


                <div className={styles.WrpTable}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Usuário</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Ativo</th>
                                <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        <tbody>

                            {usuarios.map((values, idx) => {
                                return (<tr>
                                    <td>{values.usuario}</td>
                                    <td>{values.nome}</td>
                                    <td>{values.ativo ? 'Sim' : 'Não'}</td>
                                    <div className={styles.BotoesTable}>
                                        <button type="button" onClick={() => { deletar(idx) }} className="btn btn-danger me-1">Excluir</button>
                                        <button type="button" onClick={() => { editar(idx) }} className="btn btn-primary me-1">Editar</button>
                                    </div>
                                </tr>)
                            })}



                        </tbody>
                    </table>


                </div>



            </Pagina>
        </>



    );
}

export default Usuarios;