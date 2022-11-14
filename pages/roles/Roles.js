import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

function Roles() {

    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        fetchClasses();
        return () => {
          console.log('component will unmount');
        };
      }, []);

    const fetchClasses = async () => {
        await axios.get(`http://127.0.0.1:8000/api/roles/`).then(({data})=>{
            setRoles(data)
          console.log(data)
        }).catch(err => {
            console.error(err);
        })
    }

    const deleteRole = async (slug) => {
      if(window.confirm('Delete the Class?')){
        await axios.delete(`http://127.0.0.1:8000/api/roles/${slug}`).then(({data})=>{
          navigate("/roles")
          alert('Deleted successfully')
        })
      }
      
  }

  return (
    <div className="content-wrapper">
        <div className='background_section background_section_classes'>
                <div className='container'>
                    <section>
                        <h1 className='text-center text-white py-5'>Roles</h1>
                <div class="row my-5">
                { roles.length > 0  && roles.map((role, i) =>
                   
                    <div class="col-md-4 mb-4">
                    
                        <div class="card card_background hover_zoom_cards">
                     <div className='text-right'>
                        
                        <button class="btn mr-4" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-h text-white"></i></button>
                        <div class="dropdown-menu">
                        <Link to={`/role/edit/${role.slug}`}>
                        <a class="dropdown-item" href="!">Edit</a>
                        </Link>
                        <a class="dropdown-item" href='/roles' onClick={() => deleteRole(role.slug)}>Delete</a>
                        </div>
                        </div>
                        
                        <div
                       class="avatar my-4 w-100 white d-flex justify-content-center align-items-center"
                        >
                       <img src={process.env.PUBLIC_URL + `http://127.0.0.1:8000/uploads/roles/${role.image}`} alt={role.image}/>
                     </div>
                     <div class="card-body background_card_body_classes text-center">
                       <p class="font-weight-bold my-2">{role.title}</p>
                       <div class="font-weight-bold my-2">{role.discription}</div>
                     </div>
                   </div>
                    </div>
                     )}
                </div>
                    </section>
                </div>
        </div>
    </div>
  )
}

export default Roles