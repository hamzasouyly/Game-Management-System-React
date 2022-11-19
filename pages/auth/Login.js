import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Login() {

    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("authenticated")) {
//         navigate.push("/")
//     }
//   }, []);

const login = async (e) => {
    e.preventDefault();

    
    const formData = new FormData()

    formData.append('email', email)
    formData.append('password', password);

    await axios.post(`http://127.0.0.1:8000/api/login/`, formData).then(({data})=>{
     console.log(data.message)

     if (data.status === 200) {
          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('auth_name', data.name);
      Swal.fire({
        title: 'WOW',
        text:   "You have been logged-in successfully",
        });
      if (data.role === 'admin') {
      navigate("/")
      }else{
        navigate("/classes")
      }
      
     }else{
       Swal.fire({
        title: 'OPPS',
        text:   "Error : Invalid Credentiels",
      });
     }

    //  Swal.fire({
    //   title: 'WOW',
    //   text:   "You have been logged-in successfully",
    //   });
    //  navigate("/")
    // }).catch(({response})=>{
    //   if(response.status===401){
    //     console.log(response.data.errors)
    //     Swal.fire({
    //       title: 'OPPS',
    //       text:   "Error 422",
        
    //   });
    //   }else{
    //     console.log(response.data.message)
    //     Swal.fire({
    //       title: 'OPPS',
    //       text:   "Error",
        
    //   });
    //   }
    })

   
  }

  return (
    <div className=''>
    <div className="container my-5 px-0 z-depth-1">
{/*Section: Content*/}
<section className="p-5 my-md-5 text-center" style={{backgroundImage: 'url(https://images5.alphacoders.com/120/1200625.jpg)', backgroundSize: 'cover', backgroundPosition: 'center center'}}>
  <form className="my-5 mx-md-5" onSubmit={login}>
    <div className="row">
      <div className="col-md-8 mx-auto">
        {/* Material form login */}
        <div className="card">
          {/*Card content*/}
          <div className="card-body">
            {/* Form */}
            <h3 className="font-weight-bold my-4 pb-2 text-center dark-grey-text">Login</h3>
            
            {/* email */}
            <input type="email" name='email' id="defaultSubscriptionFormPassword" className="form-control mb-4" placeholder="Email" onChange={(event)=>{setEmail(event.target.value)}} required/>
            {/* password */}
            <input type="password" name='password' id="defaultSubscriptionFormEmail" className="form-control" placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}} required/>
            <small id="passwordHelpBlock" className="form-text text-right blue-text mt-4">
              <a href="!#" className='mr-3'>Recover Password</a>
              <a href="/login">Login</a>
            </small>
            <div className="text-center">
              <button type="submit" className="btn btn-danger btn-rounded my-4 waves-effect">Send</button>
            </div>
            {/* Form */}
          </div>
        </div>
        {/* Material form login */}
      </div>
    </div></form>
</section>
{/*Section: Content*/}
</div>



  </div>
  )
}

export default Login