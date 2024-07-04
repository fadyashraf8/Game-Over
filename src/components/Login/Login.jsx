import React, { useState } from 'react'
import img2 from '../../images/RegImage.d5751ff804c935b205d3.jpg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Joi from 'joi'
export default function Login(props) {
  let { saveUserData } = props

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [errorApi, setErrorApi] = useState("")
  const [errorList, setErrorList] = useState([])
  const [loading, setLoading] = useState(false)


  let navigate = useNavigate()

  function addUser(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }
  
  async function submitForm(e) {
    e.preventDefault()
    let valid = validData()
    if (valid.error === undefined) {
      setLoading(true)

     await axios.post("https://signup-signin-backend.vercel.app/user/signin", user)
     .then((data)=>{
      navigate('/home')
      setLoading(false)
      localStorage.setItem("token", data.data.token)
      saveUserData()

     }).catch((error)=>{
      setErrorApi(error.response.data.error)
      setLoading(false)
      console.log(error.response.data.error);
     })
    } else {
      setErrorList(valid.error.details)
      setLoading(false)
    }

  }

  function validData() {

    const schema = Joi.object({

      email: Joi.string().required().email({ tlds: { allow: ['net', 'com'] } }),
      password: Joi.string().required().pattern(new RegExp(/^[a-z]{2,}[0-9]{1,}?$/))
    })
    return schema.validate(user, { abortEarly: false })
  }




  return (

    <>

      <div className='container'>
        {errorApi === "" ? "" : <div className='alert alert-danger mt-2'>{errorApi}</div>}
        {errorList.length > 0 ? errorList.map((e) => <div className='alert alert-danger mt-2'>{e.message}</div>) : ""}
        <div className='row mt-5 '>
          <div className='col-md-6'>
            <img src={img2} className='img2' alt="" />
          </div>
          <div className='col-md-6 d-flex flex-column justify-content-center align-items-center bg-dark'>
            <h2 className='text-white font1'>Login To Our Website</h2>
            <form className='w-100 text-center' onSubmit={submitForm}>

              <input type="text" placeholder='Enter Your Email' className='form-control  text-dark mt-3 bg-dark-subtle' name='email' id='email' onChange={addUser} />

              <input type="password" placeholder='Enter Your Password' className='form-control bg-dark-subtle text-dark mt-3 ' name='password' id='password' onChange={addUser} />



              {loading ? <button className='btn mt-4 btn-outline-light w-75 '>
                <i className=" fa-solid fa-spinner fa-spin fs-3"></i>
              </button> :
                <button className='btn mt-4 btn-outline-light w-75 '>Login</button>}

            </form>
            <p className='text-white mt-4'>Don't have an account? <Link to='/register' className='font1 fs-4 link-underline link-underline-opacity-0'>Register Now!</Link> </p>
          </div>
        </div>
      </div>
    </>
  )
}
