import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function ShowClass() {

 

    const [slug] = useState(useParams().slug);
    const [classe, setClasse] = useState([])
    const [classes, setClasses] = useState([])
    const [spells, setSpells] = useState([])
    const [roles, setRoles] = useState([])
    const [imagesMale, setImagesMale] = useState([])
    const [imagesFemale, setImagesFemale] = useState([])
    const [spellId, setSpellId] = useState([])
    const [spellIdCondiction, setSpellIdCondiction] = useState(false)
    const navigate = useNavigate();

    

  useEffect(() => {
    
    
    axios.get(`http://127.0.0.1:8000/api/classes/${slug}`).then(({data})=>{
            setClasse(data)
            setSpells(data.spells)
            setRoles(data.roles)
            setImagesMale(data.images_male)
            setImagesFemale(data.images_female)
          console.log(data)
          console.log(data.spells)
        }).catch(err => {
            console.error(err);
        })

        axios.get(`http://127.0.0.1:8000/api/classes/`).then(({data})=>{
            setClasses(data)
        }).catch(err => {
            console.error(err);
        })
    
    
    return () => {
      console.log('component will unmount');
    };
  },[slug]);

  const deleteClass = async (slug) => {
    if(window.confirm('Delete the Class?')){
      await axios.delete(`http://127.0.0.1:8000/api/classes/${slug}`).then(({data})=>{
        navigate("/classes")
        alert('Deleted successfully')
      })
    }
    
}

  const showspell = async (slug) => {

    await axios.get(`http://127.0.0.1:8000/api/spells/${slug}`).then(({data})=>{
      setSpellId(data) 
      setSpellIdCondiction(true)
      console.log(data)
    })
  }

  return (
    <div className="content-wrapper background_centent">

    <div className='background1_show_classes' style={{backgroundImage: `url(http://127.0.0.1:8000/uploads/cover/${classe.cover})`, backgroundSize:'cover'}}>
        <div className='container'>
              <section>
                    <div className='row'>
                        <div className="col-md-5">
                            <div className='my-4'>
                            <div className='py-4 text-center background_title_classes'>
                              <h1>{classe.title}</h1>
                            </div>
                            <div className='p-4 background_body_classes'>
                              <p className='py-4'>
                                  {classe.discription}
                              </p>
                              <div className='py-4 text-center'>
                                <h4 className='pb-3'>Roles</h4>
                                {roles.map((role, i) =>
                                <img src={process.env.PUBLIC_URL + `http://127.0.0.1:8000/uploads/roles/${role.image}`} alt={role.image} className='ml-2' width='100px' />
                                )}
                                
                              </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-7 background_caracters_classes">
                                  <div className='background_carater text-center'>
                                     {/* <!-- Tab panels --> */}
                            <div class="tab-content px-0 pt-5">
                        
                        {/* <!-- Panel 1 --> */}
                        <div class="tab-pane fade in show active" id="panel5" role="tabpanel">
                  
                        <OwlCarousel className='owl-theme' loop nav items dots={false}
                                  navText={[
                                    '<span class="arrow prev">‹</span>',
                                    '<span class="arrow next">›</span>'
                                  ]}
                                  animateOut={'true'}
                                  >
                                      {imagesMale.map((imageMale, i) =>
                                      <div class='item'>
                                      <img src={process.env.PUBLIC_URL + `http://127.0.0.1:8000/uploads/imagesMale/${imageMale.imageM}`} alt="" />
                                      </div>
                                       )}
                                  </OwlCarousel>
                  
                        </div>
                        {/* <!-- Panel 1 --> */}
                  
                        {/* <!-- Panel 2 --> */}
                        <div class="tab-pane fade" id="panel6" role="tabpanel">
                        
                        <OwlCarousel className='owl-theme' loop nav items dots={false}
                                  navText={[
                                    '<span class="arrow prev">‹</span>',
                                    '<span class="arrow next">›</span>'
                                  ]}
                                  >
                                    {imagesFemale.map((imageFemale, i) =>
                                      <div class='item'>
                                      <img src={process.env.PUBLIC_URL + `http://127.0.0.1:8000/uploads/imagesFemale/${imageFemale.imageF}`} alt="" />
                                      </div>
                                       )}
                                  </OwlCarousel>
                           
                          
                        </div>
                        {/* <!-- Panel 2 --> */}

                      </div>
                      {/* <!-- Tab panels --> */}
                                    <div className='text-center'>
                                    <ul class="nav md-tabs nav-justified grey lighten-3 mx-0" role="tablist">
                                      <li class="nav-item">
                                          <a href="!" class="nav-link active" data-toggle="tab" href="#panel5" role="tab"><i class="fas fa-mars icon_male ml-4"></i></a>
                                      </li>
                                      <li class="nav-item">
                                        <a href="!" class="nav-link" data-toggle="tab" href="#panel6" role="tab"><i class="fas fa-venus icon_female ml-3"></i></a>
                                      </li>
                                    </ul>
                                    </div>
                                   
                      </div>
                        </div>
                    </div>
              </section>
        </div>
    </div>

    

        <div className='background2_show_classes'>
            <div className='container'>
                  <section>
                      <div className='row'>
                          <div className='col-md-8'>
                          <div className='text-white my-4 py-2 background_title_spells'>
                            <h4>SPELLS</h4>
                          </div>
                      <div className='spells_content'>
                        {spells.map((spell, i) =>
                           <img src={process.env.PUBLIC_URL + `http://127.0.0.1:8000/uploads/spells/${spell.image}`} alt={spell.image} className='border_spells ml-2 c_pointer' width={'80px'} onClick={() => showspell(spell.slug)}/>
                           
                            )}
                      </div>
                      { spellIdCondiction ? (
                    <div className='spells_discription text-white my-5 pl-3'>
                        <div className='text-center pb-4'>
                        <img src={process.env.PUBLIC_URL + `http://127.0.0.1:8000/uploads/spells/${spellId.image}`} alt={spellId.image} className='border_spells ml-2' width={'80px'}/>
                        </div>
                        <h3>{spellId.title}</h3>
                        <p>{spellId.discription}</p>
                    </div>)
                    :
                    ('')
                      }
                          </div>
                          <div className='col-md-4'>
                          <div className='text-white my-4 py-2 background_title_spells'>
                            <h4>CLASSES</h4>
                          </div>
                          <div className='spells_content'>
                          {classes.map((classee, i) =>
                          <Link to={`/show/${classe.slug}`}>
                           <img src={process.env.PUBLIC_URL + `http://127.0.0.1:8000/uploads/icon/${classee.icon}`} alt={classee.image} className='ml-2' width={'60px'}/>
                           </Link>
                          )}
                          </div>
                          </div>
                      </div>
                  </section>
              </div>
        </div>

      
        <div className='background2_show_classes'>
            <div className='container'>
                  <section>
                  <div className='text-right mr-5 my-4'>
                  <Link to={`/edit/${classe.slug}`}>
                  <button type="button" class="btn btn-outline-primary waves-effect ml-3">Edit</button>
                  </Link>
                  <button type="button" class="btn btn-outline-danger waves-effect ml-3" onClick={() => deleteClass(classe.slug)}>Delete</button>
                  </div>
                  </section>
            </div>
        </div>

        
        {/* <h1>{classe.title}</h1>
        {spells.map((spell, i) =>
                <div>
                  <p className="text-white">{spell.title}</p>
                </div>
        )}
        <Link to={`/edit/${classe.slug}`}>
        <button type="button" class="btn btn-primary">Edit</button>
        </Link>
        <button type="button" class="btn btn-danger" onClick={() => deleteClass(classe.slug)}>Delete</button> */}

    </div>
  )
}

export default ShowClass