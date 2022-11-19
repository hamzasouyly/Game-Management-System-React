import React from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Logout() {

    const navigate = useNavigate();
    const token = localStorage.getItem('auth_token');
    
    const http = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });

    const logout = async (e) => {
        e.preventDefault();
        http.post(`http://127.0.0.1:8000/api/logout/`).then(({data})=>{
            if(data.status === 200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                Swal.fire({
                    title: 'WOW',
                    text:   "Logout Succesfully",
                    });
                navigate('/login');
            }
        })
    }

  return (
    <div>
        {/* logout */}
    <li className="nav-item">
        <a className="nav-link" href="!#" onClick={logout}>
            Logout
        </a>
    </li>
    </div>
  )
}

export default Logout