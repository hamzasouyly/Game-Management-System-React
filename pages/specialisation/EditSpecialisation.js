import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
// import Multiselect from 'multiselect-react-dropdown';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useParams } from "react-router-dom";

function EditSpecialisation() {

    const [title, setTitle] = useState('');
    // const [classes, SetClasses] = useState([]);
    const [classesId, SetClassesId] = useState([]);
    const [classes, SetClasses] = useState([]);
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();
    const [slug] = useState(useParams().slug);
    const [specialisation, setSpecialisation] = useState(useParams().slug);

    useEffect(() => {
        
        fetchClasses();

         axios.get(`http://127.0.0.1:8000/api/specialisations/${slug}`).then(({data})=>{
          setSpecialisation(data)
            const { title  } = data
            setTitle(title)
          console.log(data)
        }).catch(err => {
            console.error(err);
        })

        return () => {
          console.log('component will unmount');
        };
      }, [slug]);

      const onChangeSelect = (value) => {
        const classesTitle = []
        // value.map(option => classesTitle.push(option.value))
        value.forEach((option) => {
          classesTitle.push(option.value)
        })
        SetClassesId(classesTitle)
        console.log(classesTitle)
      }

    const fetchClasses = async () => {

      await axios.get(`http://127.0.0.1:8000/api/classes/`).then(({data})=>{
        const classesTitle = []
        data.forEach(element => {
          classesTitle.push({ value: element.id, label: element.title })
        });
        // console.log('classes' + classesTitle)
        SetClasses(classesTitle)
      
    }).catch(err => {
        console.error(err);
    })
        
    }


    const createClass = async (e) => {
        e.preventDefault();
  
        
        const formData = new FormData()
    
        formData.append('_method', 'PATCH');
        formData.append('title', title)
        formData.append('classes', classesId);

        console.log('test' + classesId)
        
        
        
        await axios.post(`http://127.0.0.1:8000/api/specialisations/${specialisation.slug}`, formData).then(({data})=>{
         console.log(data.message)
         
         alert('updated successfully')
         navigate("/specialisations")
        }).catch(({response})=>{
          if(response.status===422){
            console.log(response.data.errors)
          }else{
            console.log(response.data.message)
          }
        })

       
      }

  return (
    <div className="content-wrapper background_centent">
       {/* Default form contact */}
<form className="p-5 text-white" action="" onSubmit={createClass}>
  <p className="h1 mb-5 text-center">Create Specialisation</p>
  {/* title */}
  <label>Title</label>
  <input type="text" id="defaultContactFormName" className="form-control mb-4" placeholder="title" name='title' value={title} onChange={(event)=>{setTitle(event.target.value)}} required/>

  {/* Classes */}
  <label>Classes</label>
  
  
  <Select
    required
    name='classes'
    isMulti
    options={classes}
    onChange={onChangeSelect}
    components={animatedComponents}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  

  {/* Send button */}
  <button className="btn btn-info btn-block my-5" type="submit">Send</button>
</form>
{/* Default form contact */}

    </div>
  )
}

export default EditSpecialisation