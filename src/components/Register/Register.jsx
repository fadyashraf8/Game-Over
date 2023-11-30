import React, { useState } from 'react'
import img2 from '../../images/RegImage.d5751ff804c935b205d3.jpg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Joi from 'joi'

export default function Register() {

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
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

      let { data } = await axios.post("https://signup-signin-backend.onrender.com/user/signup", user)
      if (data.message === "success") {
        navigate('/login')
        setLoading(false)
      } else {
        setErrorApi(data.message)
        setLoading(false)

      }

    } else {
      setErrorList(valid.error.details)
      console.log(valid.error.details);

    }

  }

  function validData() {

    const schema = Joi.object({
      first_name: Joi.string().required().min(3).max(30).alphanum(),
      last_name: Joi.string().required().min(3).max(30).alphanum(),
      age: Joi.number().required().min(10).max(80),
      email: Joi.string().required().email({ tlds: { allow: ['net', 'com'] } }),
      password: Joi.string().required().pattern(new RegExp(/^[a-z]{2,}[0-9]{1,}?$/))
    })
    return schema.validate(user, { abortEarly: false })
  }









  return (
    <div className='container'>

      {errorApi === "" ? "" : <div className='alert alert-danger mt-2'>{errorApi}</div>}
      {errorList.length > 0 ? errorList.map((e) => <div className='alert alert-danger mt-2'>{e.message}</div>) : ""}
      <div className='row mt-5 '>
        <div className='col-md-6'>
          <img src={img2} className='img2' alt="" />
        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center align-items-center bg-dark p-3'>
          <h2 className='text-white font1'>Register To Our Website</h2>
          <form className='w-100 text-center' onSubmit={submitForm}>
            <input type="text" placeholder='First Name' className='form-control  text-dark mt-3 bg-dark-subtle' id='first_name' name='first_name' onChange={addUser} />

            <input type="text" placeholder='Last Name' className='form-control bg-dark-subtle text-dark mt-3' id='last_name' name='last_name' onChange={addUser} />

            <input type="number" placeholder='Age' className='form-control bg-dark-subtle text-dark mt-3' id='age' name='age' onChange={addUser} />

            <input type="text" placeholder='Enter Your Email' className='form-control  text-dark mt-3 bg-dark-subtle' name='email' id='email' onChange={addUser} />

            <input type="password" placeholder='Enter Your Password' className='form-control bg-dark-subtle text-dark mt-3 ' name='password' id='password' onChange={addUser} />


            {loading ? <button className='btn mt-4 btn-outline-light w-75 '>
              <i className=" fa-solid fa-spinner fa-spin fs-3"></i>
            </button> :
              <button className='btn mt-4 btn-outline-light w-75 '>Register</button>}



          </form>
          <p className='text-white mt-4'>Already have an account? <Link to='/login' className='font1 fs-4 link-underline link-underline-opacity-0'>Login Now!</Link> </p>

        </div>
      </div>
    </div>
  )
}
