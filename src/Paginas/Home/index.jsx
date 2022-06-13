import React, { useState } from 'react';
import styles from "./index.module.css"

import Logo from '../../images/logo.png'
import Satc from '../../images/satc.svg'
import Hub from '../../images/hub.svg'
import Pagina from '../../Components/Pagina'


import { AiFillHome, AiOutlineShareAlt, AiOutlineFileText, AiOutlineMenu } from 'react-icons/ai';
import { BsGear } from 'react-icons/bs';
import { GoMail } from 'react-icons/go';
import { FaHamburger } from 'react-icons/fa';

function Home() {

    const [nav, setNav] = useState(false);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (

        <Pagina>
            <div style={{}} className={`${'row'} ${styles.row}`}>
                <>
                    <div className={` ${'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'} ${styles.hiden}`}>
                        <div onClick={(evt) => { this.props.alteraPagina(7) }} className={`${styles.child} ${styles.prestacaoContas} `}><span>Chaves</span></div>
                    </div>

                    <div className={` ${'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'} ${styles.hiden}`}>
                        <div onClick={(evt) => { this.props.alteraPagina(8) }} className={`${styles.child} ${styles.chamados} `}><span>Usuários</span></div>
                    </div>

                    <div className={` ${'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'} ${styles.hiden}`}>
                        <div className={`${styles.child} ${styles.oportunidades}  `}><span>Reservas</span></div>
                    </div>

                    <div className={` ${'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'} ${styles.hiden}`}>
                        <div className={`${styles.child} ${styles.dadosCadastrais} `}><span>Reservar chave</span></div>
                    </div>
                </>

            </div>
        </Pagina>

    );
}

export default Home;