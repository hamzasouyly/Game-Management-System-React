import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";

function EditClass() {

    const [nfts, setNfts] = useState([]);
    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [image, SetImage] = useState(null);
    const [imagesMale, SetImagesMale] = useState(null);
    const [imagesFemale, SetImagesFemale] = useState(null);
    const [nft_id, SetNft_id] = useState('');
    const navigate = useNavigate();
    const [slug, setSlug] = useState(useParams().slug);
    const [classe, setClasse] = useState([])

    const onChangeImage = (event) => {
		SetImage(event.target.files[0]);
	};
  const onChangeImageMale = (event) => {
		SetImagesMale(event.target.files);
    
	};
  const onChangeImageFemale = (event) => {
		SetImagesFemale(event.target.files);
	};

  const changeOption = (event) => {
    console.log("Selected!!");
		SetNft_id(event.target.value)
	};

    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/api/classes/${slug}`).then(({data})=>{
            setClasse(data)

            const { title, discription, nft_id  } = data
            setTitle(title)
            setDiscription(discription)
            SetNft_id(nft_id)
            console.log('nftId '+nft_id)
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
        await axios.get(`http://127.0.0.1:8000/api/nfts/`).then(({data})=>{
            setNfts(data)
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
        if(imagesMale!==null){
          for (let i = 0; i < imagesMale.length; i++) {
            formData.append('imagesMale[]', imagesMale[i])
              };
          }
         if(imagesFemale!==null){
          for (let i = 0; i < imagesFemale.length; i++) {
            formData.append('imagesFemale[]', imagesFemale[i])
                };
          }
        formData.append('nft_id', nft_id)
  
        
        console.log(imagesMale)
        console.log(image)
        
        
    
        await axios.post(`http://127.0.0.1:8000/api/classes/${classe.slug}`, formData).then(({data})=>{
         console.log(data.message)
         alert('Edited successfully')
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
    <div className="content-wrapper">
       {/* Default form contact */}
<form className="p-5" action="" onSubmit={editClass}>
  <p className="h1 mb-5 text-center">Create Class</p>
  {/* title */}
  <input type="text" id="defaultContactFormName" className="form-control mb-4" placeholder="title" name='title' value={title} onChange={(event)=>{setTitle(event.target.value)}} required/>
 {/* discription */}
 
 <div className="form-group">
    <textarea className="form-control rounded-0" id="exampleFormControlTextarea2" rows={3} placeholder="discription" value={discription} defaultValue={""} name='discription' onChange={(event)=>{setDiscription(event.target.value)}} required/>
  </div>

  
  {/* nft_id */}
  <label>Nft ID</label>
  
  <select className="browser-default custom-select mb-4" value={nft_id}  name='nft_id' onChange={changeOption}>

    <option value disabled selected>Choose option</option>
    { nfts.length > 0  && nfts.map((nft, i) =>
    <option value={nft.id}>{nft.title}</option>
    )}
    <option value='4'>fozke</option>
  </select>

  {/* image */}
  <input type="file" id="defaultContactFormName" className="form-control mb-4" placeholder="image" name='image'  onChange={onChangeImage}/>

    {/* image */}
  <input type="file" id="defaultContactFormName" className="form-control mb-4" placeholder="imagesMale" name='imagesMale[]' onChange={onChangeImageMale} multiple/>
  
   {/* imagesFemale */}
   <input type="file" id="defaultContactFormName" className="form-control mb-4" placeholder="imagesFemale" name='imagesFemale[]' onChange={onChangeImageFemale} multiple/>
  
  {/* Send button */}
  <button className="btn btn-info btn-block" type="submit">Send</button>
</form>
{/* Default form contact */}

    </div>
  )
}

export default EditClass