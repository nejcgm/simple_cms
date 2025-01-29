import { useContext } from "react"
import {Navigate} from 'react-router-dom'


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = sessionStorage.getItem('authToken');
  
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

export default ProtectedRoute




