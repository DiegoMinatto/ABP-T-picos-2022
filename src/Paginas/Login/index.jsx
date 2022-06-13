import React, { useState } from 'react';
import styles from "./index.module.css"

import Logo from '../../images/logo.png'
import Satc from '../../images/satc.svg'
import Hub from '../../images/hub.svg'
function Login() {

  const [erro, setErro] = useState(false);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (


<div className={styles.body}>
         <div className={styles.container}>
          <div className={styles.login}>


            <form>
              <div className={styles.logoWrap}>
                
                <img className={styles.imgLogo} src={Logo}></img>
                <p className={styles.marginTitulo}>Sistema<br></br><b>Controle de chaves</b></p>
         
              </div>


              <div className="form-group">
                <label for="exampleInputEmail1">Usuário:</label>
                <input type="text"    className="form-control" id="exampleInputEmail1" />
              </div>


              <div className="form-group">
                <label for="exampleInputPassword1">Senha:</label>
                <input type="password"   className={`${"form-control"}`} id="exampleInputPassword1"/>
                <div className={styles.infoWrap}>
               
                </div>
              </div>

              <button type="submit"  className={` ${styles.btnLogin}`}>Entrar</button>
            </form>  



            <div className={styles.bottom}>
              <img className={styles.imgBottom} src={Satc}></img>
      
            </div>
          </div>



          </div>
        </div>
  
  );
}

export default Login;