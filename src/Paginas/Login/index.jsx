import React, { useState } from 'react';
import styles from "./index.module.css"

import { useNavigate } from 'react-router-dom';

import Logo from '../../images/logo.png'
import Satc from '../../images/satc.svg'
import api from '../../services/api'
import { useEffect } from 'react';
function Login(props) {
  const navigate = useNavigate();
  const [erro, setErro] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    if(localStorage.getItem('@CDTEC/Token') !== null)
    navigate('/home');
  }, [])

  const login = (evt) => {
    evt.preventDefault();

    console.log('MEEEEEEEEEEEEEEH')

    api.post('/login', {usuario: usuario,senha: senha }).then((res) => {

      localStorage.setItem('@CDTEC/Token', res.data.token)
      localStorage.setItem('@CDTEC/User', res.data.user.nome)
      navigate('/home');
      

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
              <input type="text" value={usuario} onChange={(evt) => { setUsuario(evt.target.value) }} className="form-control" id="exampleInputEmail1" />
            </div>


            <div className="form-group">
              <label for="exampleInputPassword1">Senha:</label>
              <input type="password" value={senha} onChange={(evt) => { setSenha(evt.target.value) }} className={`${"form-control"}`} id="exampleInputPassword1" />
              <div className={styles.infoWrap}>

              </div>
            </div>

            <button type="submit" onClick={(evt) => { login(evt) }} className={` ${styles.btnLogin}`}>Entrar</button>
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