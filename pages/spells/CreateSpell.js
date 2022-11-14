import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
function CreateSpell() {


  const [classes, setClasses] = useState([]);
  const [title, setTitle] = useState('');
  const [discription, setDiscription] = useState('');
  const [image, SetImage] = useState();
  const [classes_id, SetClasses_id] = useState('');
  const navigate = useNavigate();

  const onChangeImage = (event) => {
  SetImage(event.target.files[0]);
};


const changeOption = (event) => {
  console.log("Selected!!");
  SetClasses_id(event.target.value)
};

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

  const createClass = async (e) => {
      e.preventDefault();

      
      const formData = new FormData()
  
      formData.append('title', title)
      formData.append('discription', discription)
      formData.append('image', image);

      formData.append('classes_id', classes_id)

      
      console.log(image)
      
      
  
      await axios.post(`http://127.0.0.1:8000/api/spells/`, formData).then(({data})=>{
       console.log(data.message)
       alert('created successfully')
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
    <div className="content-wrapper background_centent">
       {/* Default form contact */}
<form className="p-5 text-white" action="" onSubmit={createClass}>
  <p className="h1 mb-5 text-center">Create Class</p>
  {/* title */}
  <label>Title</label>
  <input type="text" id="defaultContactFormName" className="form-control mb-4" placeholder="title" name='title' onChange={(event)=>{setTitle(event.target.value)}} required/>
 {/* discription */}
 <label>Discription</label>
 <div className="form-group">
    <textarea className="form-control rounded-0" id="exampleFormControlTextarea2" rows={3} placeholder="discription" defaultValue={""} name='discription' onChange={(event)=>{setDiscription(event.target.value)}} required/>
  </div>

  
  {/* nft_id */}
  <label>Classes ID</label>
  
  <select className="browser-default custom-select mb-4" name='classes_id' onChange={changeOption}>

    <option value disabled selected>Choose option</option>
    { classes.length > 0  && classes.map((classe, i) =>
    <option value={classe.id}>{classe.title}</option>
    )}
  </select>

  {/* image */}
  <label>Image</label>
  <input type="file" id="defaultContactFormName" className="form-control mb-4" placeholder="image" name='image' onChange={onChangeImage} required/>

  {/* Send button */}
  <button className="btn btn-info btn-block my-5" type="submit">Send</button>
</form>
{/* Default form contact */}

    </div>
  )
}

export default CreateSpell