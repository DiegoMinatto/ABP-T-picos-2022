import React, { useState } from 'react';
import styles from "./index.module.css"
import Pagina from '../../Components/Pagina'
import { Link } from "react-router-dom";

import { useNavigate  } from "react-router-dom";

function Home(props) {

    const navigate = useNavigate ();

    return (



        <Pagina navigate={navigate}>
            <div style={{}} className={`${'row'} ${styles.row}`}>
                <>

     
                    <div  className={` ${'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'} ${styles.hiden}`}>
                        <div onClick={(evt) => {navigate('/chaves')}} className={`${styles.child}  `}><span>Chaves</span></div>
                    </div>
            
                    <div className={` ${'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'} ${styles.hiden}`}>
                        <div onClick={(evt) => {navigate('/usuarios')}} className={`${styles.child}  `}><span>Usuários</span></div>
                    </div>

                    <div className={` ${'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'} ${styles.hiden}`}>
                        <div onClick={(evt) => {navigate('/reservas')}} className={`${styles.child} ${styles.oportunidades}  `}><span>Reservas</span></div>
                    </div>

                
                </>

            </div>
        </Pagina>

    );
}

export default Home;