import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

function Spells() {

    const [spells, setSpells] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        fetchspells();
        return () => {
          console.log('component will unmount');
        };
      }, []);

    const fetchspells = async () => {
        await axios.get(`http://127.0.0.1:8000/api/spells/`).then(({data})=>{
            setSpells(data)
          console.log(data)
        }).catch(err => {
            console.error(err);
        })
    }

    const deleteSpell = async (slug) => {
      if(window.confirm('Delete the Class?')){
        await axios.delete(`http://127.0.0.1:8000/api/spells/${slug}`).then(({data})=>{
          navigate("/spells")
          alert('Deleted successfully')
        })
      }
      
  }


  return (
    <div className='content-wrapper'>
        <div className='background_section background_section_classes'>
                <div className='container'>
                    <section>
                        <h1 className='text-center text-white py-5'>spells</h1>
                <div class="row my-5">
                { spells.length > 0  && spells.map((spell, i) =>
                   
                    <div class="col-md-4 mb-4">
                    
                        <div class="card card_background hover_zoom_cards">
                        <div className='text-right'>
                        
                        <button class="btn mr-4" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-h text-white"></i></button>
                        <div class="dropdown-menu">
                        <Link to={`/spell/edit/${spell.slug}`}>
                        <a class="dropdown-item" href="!">Edit</a>
                        </Link>
                        <a class="dropdown-item" href='/spells' onClick={() => deleteSpell(spell.slug)}>Delete</a>
                        </div>
                        </div>
                        
                     <div
                       class="avatar my-4 w-100 white d-flex justify-content-center align-items-center"
                     >
                       <img src={process.env.PUBLIC_URL + `http://127.0.0.1:8000/uploads/spells/${spell.image}`} alt={spell.image}/>
                     </div>
                     <div class="card-body background_card_body_classes">
                       <p class="font-weight-bold my-2">{spell.title}</p>
                       <p class="">{spell.discription}</p>
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

export default Spells