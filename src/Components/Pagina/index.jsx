import React, { useState } from 'react';
import styles from "./index.module.css"

import Logo from '../../images/logo.png'

import { useNavigate  } from "react-router-dom";

import { AiFillHome, AiFillStar } from 'react-icons/ai';
import { BsKeyFill } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { FaHamburger } from 'react-icons/fa';

function Pagina({children, ...rest}) {

    const navigate = useNavigate ();

    const [nav, setNav] = useState(false);

    const logout = () => {
        localStorage.removeItem('@CDTEC/Token')
        localStorage.removeItem('@CDTEC/User')
        navigate('/login');
    }

    return (

        <div className={styles.body}>



            <div className={`${styles.wrpSide} ${nav ? null : styles.hide}`}>
                <div style={{ backgroundColor: '#1B9696' }} className={styles.side}>

                    <div className={styles.nav}>
                        <div className={styles.logoWrap}>
                            <div className={styles.menu}>
                                <div onClick={() => { setNav(!nav) }} className={styles.menuIconWrp}>
                                    <FaHamburger size={20} />
                                </div>
                            </div>
                            <span className={`${styles.marginTitulo} ${styles.white}`}>Sistema<br></br><b>Controle de chaves</b></span>
                        </div>
                    </div>
                    <div className={styles.options}>

                        <>
                            <div className={styles.btnOptions} onClick={() => {rest.navigate('/home')}}><AiFillHome className={styles.iconSide} size={20} /><span>Home</span></div>
                            <div className={styles.btnOptions} onClick={() => {rest.navigate('/chaves')}}><BsKeyFill className={styles.iconSide} size={20} /><span>Chaves</span></div>
                            <div className={styles.btnOptions} onClick={() => {rest.navigate('/usuarios')}}><BiUser className={styles.iconSide} size={20} /><span>Usuarios</span></div>
                            <div className={styles.btnOptions} onClick={() => {rest.navigate('/reservas')}}><AiFillStar className={styles.iconSide} size={20} /><span>Reservas</span></div>
                        </>



                    </div>
                </div>
            </div>

            <div className={styles.nav}>
                <div className={styles.menu}>
                    <div className={styles.menuIconWrp} onClick={() => { setNav(!nav) }}>
                        <FaHamburger size={20} />
                    </div>
                </div>
                <div className={styles.logoWrap}>
                    <img className={styles.imgLogo} src={Logo}></img>
                    <span className={styles.marginTitulo}>Sistema<br></br><b>Controle de chaves</b></span>
                </div>
                <div className={styles.controleUsuario}>
                    <div>
                        <span className={styles.info}>Space Control</span><br></br>
                        <span onClick={() => {logout()}} className={styles.logout}>{'<'} LOGOUT</span> <span className={styles.ceo}>{localStorage.getItem('@CDTEC/User')}</span>  <br></br>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>


              {children}



            </div>
        </div>

    );
}

export default Pagina;