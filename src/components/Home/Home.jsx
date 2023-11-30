import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Link, NavLink } from 'react-router-dom'




export default function Home() {

  const [loading, setLoading] = useState(false)

  const [allGames, setAllGames] = useState([])


  async function getAllGames() {

    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`, {
      headers: {
        'X-RapidAPI-Key': 'e651b43727msh08a84f868d5adadp18bceejsn84bed41db10b',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    })
    setAllGames(data.slice(0, 3))
  }

  useEffect(() => {

    setLoading(true)

    setTimeout(() => {
      setLoading(false)

    }, 1000);
    getAllGames()
  }, [])



  return (
    <>


      {loading === true ? <div className='container vh-100  d-flex flex-column justify-content-center align-items-center'>
        <i class="fa-solid fa-spinner fa-spin icon text-white"></i>

      </div> : <div className='container mt-5 '>
        <div className='home p-5'>
          <div className='row  vh-50'>
            <div className='col-md-12  d-flex flex-column justify-content-center align-items-center'>

              <h1 className='text-white font1 mt-4'>Find & track the best free-to-play games!</h1>
              <p className='text-white font1 mt-4 h4'>Track what you've played and search for what to play next! Plus get free premium loot!
              </p>
              <Link to='/all'><button className='btn btn-outline-light mt-3' >Browse Games</button></Link>
            </div>
          </div>
        </div>


        <div className='row '>
          
          <h2 className='text-white'> 
         Personalized Recommendations
         <span>..</span>
         <i class="fa-solid fa-arrow-down fa-bounce fs-1"></i>
         </h2>
          {allGames.map((e) => <div className='col-md-4'>
            <div className="card mt-5 bg-transparent" >
              <NavLink to={'/gamedetails/' + e.id}>
                <img src={e.thumbnail} className="card-img-top" alt="..." />
              </NavLink>

              <div className="card-body">
                <div className='row'>
                  <div className='col-md-6 '>
                    <h5 class="card-text text-white  ">{e.title}</h5>
                  </div>
                  <div className='col-md-6'>
                    <Link to={e.game_url} target='_blank' className="btn btn-primary">Play Now!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>)}
        </div>

      </div>}


    </>
  )
}
