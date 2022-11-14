import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
// import Multiselect from 'multiselect-react-dropdown';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

function CreateSpecialisation() {

    
    const [title, setTitle] = useState('');
    // const [classes, SetClasses] = useState([]);
    const [classesId, SetClassesId] = useState([]);
    const [classes, SetClasses] = useState([]);
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();
   
 
//   const changeOption = (event) => {
//     console.log("Selected!!");
//         SetClassesId(event.target.value)
// 	};

    useEffect(() => {
        
        fetchClasses();

        return () => {
          console.log('component will unmount');
        };
      }, []);

      const onChangeSelect = (value) => {
        const classesTitle = []
        // value.map(option => classesTitle.push(option.value))
        value.forEach((option) => {
          classesTitle.push(option.value)
        })
        SetClassesId(classesTitle)
        console.log(classesTitle)
      }

      // const onChangeSelect = (value) => {
      //   value.forEach((option) => {
      //   SetClassesId(value.some((element) => element.value === "Users"));
      // };
      

    // const fetchClasses = async () => {

    //     const classesTitle = []

    //     const reqData = await fetch('http://127.0.0.1:8000/api/classes')
    //     const resData = await reqData.json();

    //     for (let i = 0; i < resData.length; i++) {
    //         classesTitle.push(resData[i].id)
    //     }
    //     SetClasses(classesTitle)
        
    // }

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
        
        
        await axios.post(`http://127.0.0.1:8000/api/specialisations/`, formData).then(({data})=>{
         console.log(data.message)
         
         alert('created successfully')
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
  <input type="text" id="defaultContactFormName" className="form-control mb-4" placeholder="title" name='title' onChange={(event)=>{setTitle(event.target.value)}} required/>

  {/* nft_id */}
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

export default CreateSpecialisation