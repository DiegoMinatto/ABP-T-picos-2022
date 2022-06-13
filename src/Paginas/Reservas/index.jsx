import React, { useState } from 'react';
import styles from "./index.module.css"

import Logo from '../../images/logo.png'
import Satc from '../../images/satc.svg'
import Hub from '../../images/hub.svg'
import Pagina from '../../Components/Pagina'
import Modal from '../../Components/Modal'


function Reservas() {

    const [modalReservaOpen, setModalReservaOpen] = useState(false);
    const [modalDevOpen, setModalDevOpen] = useState(false);



    const [usuario, setUsuario] = useState('')



    const reservar = () => {
        setModalReservaOpen(true);
    }

    const devolver = () => {
        setModalDevOpen(true);
    }



    const fechaModais = () => {
        limpar();
        setModalReservaOpen(false)
        setModalDevOpen(false)
    }


    const limpar = () => {
        setUsuario('');
    }



    return (
        <>
            {modalDevOpen ?

                <Modal title={'Confirmação'} setOpen={(value) => { fechaModais() }}>
                    <>


                        <h4>Confirmar devolução da chave ?</h4>

                        <hr />
                        <div className={styles.WrpButton}>
                            <button type="button" className="btn btn-success me-1">Confirmar</button>
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

                        <div className={styles.WrpButton}>
                            <button type="button" className="btn btn-success me-1">Salvar</button>
                        </div>

                    </>

                </Modal>

                :

                null
            }
            <Pagina>

                <div className={styles.WrpTitulo}>
                    <div className={styles.ContainerTitulo}></div>
                    <div className={styles.ContainerTitulo}>
                        <h3>Reservas</h3>
                    </div>
                    <div className={styles.ContainerBtnTitulo}>
                    <button type="button" onClick={() => {reservar()}} className="btn btn-success me-1" data-toggle="modal" data-target="#exampleModal">Nova reserva</button>
                    </div>



                </div>


                <div className={styles.WrpTable}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Sala</th>
                                <th scope="col">Reservado</th>
                                <th scope="col">Nome reserva</th>
                                <th scope="col">Data Reservado</th>
                                <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1.12.12</td>
                                <td>Sim</td>
                                <td>Vagner rodrigues</td>
                                <td>12/06/2022</td>
                                <div className={styles.BotoesTable}>
                                    <button type="button" onClick={() => { devolver() }} className="btn btn-success me-1">Devolver</button>
                                </div>
                            </tr>
                        </tbody>
                    </table>


                </div>



            </Pagina>
        </>



    );
}

export default Reservas;