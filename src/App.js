
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './Paginas/Login'
import CadChave from './Paginas/Teste'





function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={'/CadChave'} element={true ? <CadChave /> : <Navigate to="/" />} 
        />
      </Routes>
    </div>
  );
}

export default App;
