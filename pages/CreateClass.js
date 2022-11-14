import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function CreateClass() {

    const [nfts, setNfts] = useState([]);
    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [image, SetImage] = useState();
    const [cover, SetCover] = useState();
    const [icon, SetIcon] = useState();
    const [imagesMale, SetImagesMale] = useState();
    const [imagesFemale, SetImagesFemale] = useState();
    const [nftId, SetNftId] = useState('');
    const navigate = useNavigate();

    const onChangeImage = (event) => {
      SetImage(event.target.files[0]);
	};
  const onChangeCover = (event) => {
		SetCover(event.target.files[0]);
	};
  const onChangeIcon = (event) => {
		SetIcon(event.target.files[0]);
	};
  const onChangeImageMale = (event) => {
		SetImagesMale(event.target.files);
    
	};
  const onChangeImageFemale = (event) => {
		SetImagesFemale(event.target.files);
	};

  const changeOption = (event) => {
    console.log("Selected!!");
		SetNftId(event.target.value)
	};

    useEffect(() => {
        
        fetchClasses();
        return () => {
          console.log('component will unmount');
        };
      }, []);

    const fetchClasses = async () => {
        await axios.get(`http://127.0.0.1:8000/api/nfts/`).then(({data})=>{
            setNfts(data)
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
        formData.append('cover', cover);
        formData.append('icon', icon);

        // imagesMale.map((imageMale) => 
        //   formData.append('imagesMale[]', imageMale)
        // )
        for (let i = 0; i < imagesMale.length; i++) {
          formData.append('imagesMale[]', imagesMale[i])
        }
        // imagesFemale.map((imageFemale) => 
        //   formData.append('imagesFemale[]', imageFemale)
        // )
        for (let i = 0; i < imagesFemale.length; i++) {
          formData.append('imagesFemale[]', imagesFemale[i])
        }
        formData.append('nft_id', nftId)
  
        
        console.log(imagesMale)
        console.log(image)
        
        
    
        await axios.post(`http://127.0.0.1:8000/api/classes/`, formData).then(({data})=>{
         console.log(data.message)
         alert('created successfully')
         navigate("/classes")
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
  <label>Nft ID</label>
  
  <select className="browser-default custom-select mb-4" name='nft_id' onChange={changeOption}>

    <option value disabled selected>Choose option</option>
    { nfts.length > 0  && nfts.map((nft, i) =>
    <option value={nft.id}>{nft.title}</option>
    )}
  </select>

  {/* image */}
  <label>Image</label>
  <input type="file" id="defaultContactFormName" className="form-control mb-4" placeholder="image" name='image' onChange={onChangeImage} required/>

  {/* cover */}
  <label>Cover</label>
  <input type="file" id="defaultContactFormName" className="form-control mb-4" placeholder="Cover" name='cover' onChange={onChangeCover} required/>

  {/* icon */}
  <label>Icon</label>
  <input type="file" id="defaultContactFormName" className="form-control mb-4" placeholder="Icon" name='icon' onChange={onChangeIcon} required/>

    {/* imagesMale */}
    <label>Images Male</label>
  <input type="file" id="defaultContactFormName" className="form-control mb-4" placeholder="imagesMale" name='imagesMale[]' onChange={onChangeImageMale} multiple required/>
  
   {/* imagesFemale */}
   <label>Images Female</label>
   <input type="file" id="defaultContactFormName" className="form-control mb-4" placeholder="imagesFemale" name='imagesFemale[]' onChange={onChangeImageFemale} multiple required/>
  
  {/* Send button */}
  <button className="btn btn-info btn-block my-5" type="submit">Send</button>
</form>
{/* Default form contact */}

    </div>
  )
}

export default CreateClass