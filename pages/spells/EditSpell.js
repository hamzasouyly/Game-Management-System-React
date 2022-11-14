import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";

function EditSpell() {

    const [classes, setClasses] = useState([]);
    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [image, SetImage] = useState(null);
    const [classes_id, SetClasses_id] = useState('');
    const navigate = useNavigate();
    const [slug] = useState(useParams().slug);
    const [spell, setSpell] = useState([])

    const onChangeImage = (event) => {
		SetImage(event.target.files[0]);
	};

  const changeOption = (event) => {
    console.log("Selected!!");
        classes_id(event.target.value)
	};

    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/api/spells/${slug}`).then(({data})=>{
            setSpell(data)

            const { title, discription, classes_id  } = data
            setTitle(title)
            setDiscription(discription)
            SetClasses_id(classes_id)
          console.log(data)
        }).catch(err => {
            console.error(err);
        })
        fetchClasses();
        return () => {
          console.log('component will unmount');
        };
      }, [slug]);

      const fetchClasses = async () => {
        await axios.get(`http://127.0.0.1:8000/api/classes/`).then(({data})=>{
            setClasses(data)
          console.log(data)
        }).catch(err => {
            console.error(err);
        })
    }

    

    const editClass = async (e) => {
        e.preventDefault();
  
        
        const formData = new FormData()
    
        formData.append('_method', 'PATCH');
        formData.append('title', title)
        formData.append('discription', discription)
        if(image!==null){
            formData.append('image', image);
          }
       
        formData.append('classes_id', classes_id)
  
        
        console.log(image)
        
        
    
        await axios.post(`http://127.0.0.1:8000/api/spells/${spell.slug}`, formData).then(({data})=>{
         console.log(data.message)
         alert('Edited successfully')
         navigate("/spells")
        }).catch(({response})=>{
          if(response.status===422){
            console.log(response.data.errors)
          }else{
            console.log(response.data.message)
          }
        })

       
      }

  return (
    <div className="content-wrapper">
       {/* Default form contact */}
<form className=" p-5" action="" onSubmit={editClass}>
  <p className="h1 mb-5 text-center">Create Class</p>
  {/* title */}
  <input type="text" id="defaultContactFormName" className="form-control mb-4" placeholder="title" name='title' value={title} onChange={(event)=>{setTitle(event.target.value)}} required/>
 {/* discription */}
 
 <div className="form-group">
    <textarea className="form-control rounded-0" id="exampleFormControlTextarea2" rows={3} placeholder="discription" value={discription} defaultValue={""} name='discription' onChange={(event)=>{setDiscription(event.target.value)}} required/>
  </div>

  
  {/* nft_id */}
  <label>Nft ID</label>
  
  <select className="browser-default custom-select mb-4" value={classes_id}  name='classes_id' onChange={changeOption}>

    <option value disabled selected>Choose option</option>
    { classes.length > 0  && classes.map((classe, i) =>
    <option value={classe.id}>{classe.title}</option>
    )}
  </select>

  {/* image */}
  <input type="file" id="defaultContactFormName" className="form-control mb-4" placeholder="image" name='image'  onChange={onChangeImage}/>
  
  {/* Send button */}
  <button className="btn btn-info btn-block" type="submit">Send</button>
</form>
{/* Default form contact */}

    </div>
  )
}

export default EditSpell