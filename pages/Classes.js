import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Classes() {

    const [classes, setClasses] = useState([]);


    useEffect(() => {
        
        fetchClasses();
        return () => {
          console.log('component will unmount');
        };
      }, []);

    const fetchClasses = async () => {
        await axios.get(`http://127.0.0.1:8000/api/classes/`).then(({data})=>{
            setClasses(data)
          console.log(data)
        }).catch(err => {
            console.error(err);
        })
    }

  return (
    <div className="content-wrapper">
        <div className='background_section background_section_classes'>
                <div className='container'>
                    <section>
                        <h1 className='text-center text-white py-5'>Classes</h1>
                <div class="row my-5">
                { classes.length > 0  && classes.map((classe, i) =>
                   
                    <div class="col-md-6 mb-4">
                    <Link to={`/show/${classe.slug}`}>
                        <div class="card card_background hover_zoom_cards">
                     <div
                       class="avatar w-100 white d-flex justify-content-center align-items-center"
                     >
                       <img src={process.env.PUBLIC_URL + `http://127.0.0.1:8000/uploads/backgrounds/${classe.image}`} alt={classe.image} width='100%'/>
                     </div>
                     <div class="card-body background_card_body_classes">
                       <p class="font-weight-bold my-2">{classe.title}</p>
                       <p class="">{classe.discription}</p> <br/>
                     </div>
                   </div>
                   </Link>
                    </div>
                     )}
                </div>
                    </section>
                </div>
        </div>
    </div>
  )
}

export default Classes