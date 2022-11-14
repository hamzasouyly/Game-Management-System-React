import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
// import Multiselect from 'multiselect-react-dropdown';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useParams } from "react-router-dom";

function EditRole() {

    
    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [image, SetImage] = useState(null);
    const [role, SetRole] = useState([]);
    const [classesId, SetClassesId] = useState([]);
    const [classes, SetClasses] = useState([]);
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();
    const [slug] = useState(useParams().slug);
 
//   const changeOption = (event) => {
//     console.log("Selected!!");
//         SetClassesId(event.target.value)
// 	};

    useEffect(() => {
        
        fetchClasses();

        axios.get(`http://127.0.0.1:8000/api/roles/${slug}`).then(({data})=>{
          SetRole(data)
            const { title, discription, image  } = data
            setTitle(title)
            setDiscription(discription)
            SetImage(image)
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

      const onChangeImage = (event) => {
        SetImage(event.target.files[0]);
      };

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
    
        formData.append('title', title)
        formData.append('discription', discription)
        if(image!==null){
          formData.append('image', image);
        }
        // for (let i = 0; i < classesId.length; i++) {
        //   formData.append('classes', classesId[i])
        // }
        
       
        formData.append('classes', classesId);

        console.log('test' + classesId)
        // const test = [] 
        // for (let i = 0; i < classesId.length; i++) {
        //   // formData.append('classes', classesId[i])
        //   console.log(classesId[i])
        // }
        
        
        await axios.post(`http://127.0.0.1:8000/api/roles/${role.slug}`, formData).then(({data})=>{
         console.log(data.message)
         
         alert('Updated successfully')
         navigate("/roles")
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
  <p className="h1 mb-5 text-center">Create Roles</p>
  {/* title */}
  <label>Title</label>
  <input type="text" id="defaultContactFormName" className="form-control mb-4" placeholder="Title" name='title' value={title} onChange={(event)=>{setTitle(event.target.value)}} required/>
  {/* discription */}
  <label>Description</label>
  <textarea type="text" id="defaultContactFormName" className="form-control mb-4" placeholder="Description" name='discription' value={discription} onChange={(event)=>{setDiscription(event.target.value)}} required/>
  {/* Image */}
   <label>Image</label>
  <input type="file" id="defaultContactFormName" className="form-control mb-4" placeholder="Image" name='image' onChange={onChangeImage}/>

  {/* Classes */}
  <label>Classes</label>
  
  {/* <select className="browser-default custom-select mb-4" name='classesId' onChange={changeOption}>

    <option value disabled selected>Choose option</option>
    { classes.length > 0  && classes.map((classe, i) =>
    <option value={classe.id}>{classe.title}</option>
    )}
  </select> */}
  
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

export default EditRole