import React, { useState } from 'react';
import './index.css';


const Titulo = function () {
  return (


    <h1>Cadastro de chaves</h1>
  )
}

const Lista = function ({itemList}) {
  return (
    <ul className='none'>
      {itemList.map((item) => (
        <li><strong>{item}</strong></li>
      ))}
    </ul>
  )
}

function App() {

  const [CodChave, setCodChave] = useState('');
  const [chaveList, setChaveList] = useState([])

  const AddCod = () => {
    setChaveList([CodChave].concat(chaveList))
    setCodChave('')
  }

  const [sala, setSala] = useState('');
  const [salaList, setSalaList] = useState([])

  const AddSala = () => {
    setSalaList([sala].concat(salaList))
    setSala('')
  }

  return (
    <div className="App">
      <Titulo></Titulo>
      <br />
      <br />
      <h5>Insira o código da chave</h5>
      <input type="text" placeholder="código" value={CodChave} name="item" onChange={e => setCodChave(e.target.value)} />
      <h5>Insira o numero da sala</h5>
      <input type="text" placeholder="código" value={sala} name="item" onChange={e => setCodChave(e.target.value)} />
      <br />
      <br />
      <button className="btn btn-primary" onClick={AddCod}>Adicionar Item</button>

      <div className='lista'>
        <h3>Lista de Chaves cadastradas</h3>
        <Lista itemList={chaveList}></Lista>
      </div>



    </div>
  );
}
export default App;