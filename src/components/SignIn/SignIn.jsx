import React, { useContext, useEffect, useState } from 'react';
import './signIn.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {StoreContext} from '../../context/Context'
import axios from 'axios'
import {toast} from 'react-toastify'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const SignIn = ({inUp,setInUp}) => {
  const {url,setToken,loadCartData}= useContext(StoreContext);
  const {handleClose, open}=useContext(StoreContext);
  const[data,setData]=useState({
    name:'',
    email:'',
    password:'',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }; 
  
  const onLogin=async(e)=>{
     e.preventDefault();
     let newUrl=url;
    if(inUp==='signIn')
      newUrl=`${url}/api/user/login`;
    else if(inUp==='signUp')
      newUrl=`${url}/api/user/register`;
    
     const response= await axios.post(newUrl,data);
     if(response.data.success){
       toast.success(response.data.message);
       setToken(response.data.token);
       localStorage.setItem('token',response.data.token);
       setInUp('')
       loadCartData(localStorage.getItem('token'));
     }
     else{
      toast.error(response.data.message)
      
     }
     
  }
  return (
    <div className='model'>
   
          {inUp === 'signIn' && (
               <Modal
               open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
             >
             <Box className='rounded-4 box' sx={style} >
            <div className="card-body text-center container">
              <div className="h4">
                Log in 
              </div>
              <div className="card-body">
                <form onSubmit={onLogin}  >
                  <div className="mt-2 position-relative">
                    <div className="input-group has-validation">
                      <input
                        onChange={handleChange}
                        value={data.email}
                        placeholder="Email"
                        name="email"
                        type="text"
                        className="form-control"
                        id="validationTooltipUsername"
                        aria-describedby="validationTooltipUsernamePrepend"
                        required
                      />
                      <div className="invalid-tooltip">Please enter your username.</div>
                    </div>
                  </div>

                  <div className="mt-2 position-relative">
                    <div className="input-group has-validation">
                      <input
                        onChange={handleChange}
                        value={data.password}
                        placeholder="Password"
                        name="password"
                        type="password"
                        className="form-control"
                        id="validationTooltipUsername"
                        aria-describedby="validationTooltipUsernamePrepend"
                        required
                      />
                      <div className="invalid-tooltip">Password Field cannot be empty.</div>
                    </div>
                  </div>

                  <p className="card-text">
                    <small className="text-body-secondary">
                      <b>Forgot Your Password?</b>
                    </small>
                  </p>
                  <button type='submit' className="btn text-light w-100 rounded-2" style={{backgroundColor:'tomato'}}>Log in</button>
                </form>
              </div>
              <p className="card-text">
                <small className="text-body-tertiary">
                  By continuing, you agree to YummyBento's <b>Terms of service, Privacy policy.</b>
                </small>
              </p>
              <div className="card-footer bg-white">
                <p className="card-text">
                  <small className="text-body-secondary">
                    Not on YummyBento yet?
                    <a className="cursor-pointer" onClick={() => {setInUp('signUp');setData({name:'',email:'',password:''})}}>
                      <b className='cursor-pointer'> Sign up</b>
                    </a>
                  </small>
                </p>
              </div>
            </div>
            </Box>
            </Modal>
          )}
          {inUp === 'signUp' && (
               <Modal
               open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
             >
            <Box className='rounded-4 box' sx={style} >
            <div className='text-center'>
              <div className="h4">Sign Up </div>
              <div className="card-body">
                <form onSubmit={onLogin}>
                  <div className="mt-2 position-relative">
                    <div className="input-group has-validation">
                      <input
                        onChange={handleChange}
                        value={data.email}
                        placeholder="Email"
                        name="email"
                        type="text"
                        className="form-control"
                        id="validationTooltipUsername"
                        aria-describedby="validationTooltipUsernamePrepend"
                        required
                      />
                      <div className="invalid-tooltip">Please choose a unique and valid username.</div>
                    </div>
                  </div>

                  <div className="mt-2 position-relative">
                    <div className="input-group has-validation">
                      <input
                        onChange={handleChange}
                        value={data.name}
                        placeholder="Full name"
                        name="name"
                        type="text"
                        className="form-control"
                        id="validationTooltipUsername"
                        aria-describedby="validationTooltipUsernamePrepend"
                        required
                      />
                      <div className="invalid-tooltip">Please enter a full name.</div>
                    </div>
                  </div>

                  <div className="mt-2 position-relative">
                    <div className="input-group has-validation">
                      <input
                        onChange={handleChange}
                        value={data.password}
                        placeholder="Create Password"
                        name="password"
                        type="password"
                        className="form-control"
                        id="validationTooltipUsername"
                        aria-describedby="validationTooltipUsernamePrepend"
                        required
                      />
                      <div className="invalid-tooltip">Please enter a valid password.</div>
                    </div>
                  </div>
                  <button className="btn text-light w-100 rounded-2 mt-2"style={{backgroundColor:'tomato'}}>Create account</button>
                </form>
              </div>
              <p className="card-text">
                <small className="text-body-tertiary">
                  By continuing, you agree to Pinterest's <b>Terms of service, Privacy policy.</b>
                </small>
              </p>
              <div className="card-footer bg-white">
                <p className="card-text">
                  <small className="text-body-secondary">
                    Already have an account? 
                    <a className="cursor-pointer" onClick={() => setInUp('signIn')}>
                      <b> Login</b>
                    </a>
                  </small>
                </p>
              </div>
            </div>
           </Box>
           </Modal>
          )}
    </div>
  );
};

export default SignIn;
