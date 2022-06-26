
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './Paginas/Login'
import Home from './Paginas/Home'
import Chaves from './Paginas/Chaves'
import Usuarios from './Paginas/Usuarios'
import Reservas from './Paginas/Reservas'


const ProtectedRoute = ({
  redirectPath = '/',
  children,
}) => {
  if (!localStorage.getItem('@CDTEC/Token')) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/chaves" element={<ProtectedRoute><Chaves /></ProtectedRoute>} />
        <Route path="/usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
        <Route path="/reservas" element={<ProtectedRoute><Reservas /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
