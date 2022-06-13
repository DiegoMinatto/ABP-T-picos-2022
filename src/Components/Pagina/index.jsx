import React, { useState } from 'react';
import styles from "./index.module.css"

import Logo from '../../images/logo.png'
import Satc from '../../images/satc.svg'
import Hub from '../../images/hub.svg'


import { AiFillHome, AiOutlineShareAlt, AiOutlineFileText, AiOutlineMenu } from 'react-icons/ai';
import { BsGear } from 'react-icons/bs';
import { GoMail } from 'react-icons/go';
import { FaHamburger } from 'react-icons/fa';

function Pagina({children, ...rest}) {

    const [nav, setNav] = useState(false);

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
                            <div className={styles.btnOptions}><AiFillHome className={styles.iconSide} size={20} /><span>Home</span></div>
                            <div className={styles.btnOptions}><BsGear className={styles.iconSide} size={20} /><span>Gestão Geral</span></div>
                            <div className={styles.btnOptions}><GoMail className={styles.iconSide} size={20} /><span>Chamados</span></div>
                            <div className={styles.btnOptions}><AiOutlineShareAlt className={styles.iconSide} size={20} /><span>Oportunidades</span></div>
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
                        <span className={styles.logout}>{'<'} LOGOUT</span> <span className={styles.ceo}>Leandro G.</span>  <br></br>
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