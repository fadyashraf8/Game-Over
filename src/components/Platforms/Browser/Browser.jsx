import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Browser() {

  const [browserGames, setBrowserGames] = useState([])
  const [loading, setLoading] = useState(false)

  async function getBrowserGames() {

    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser`, {
      headers: {
        'X-RapidAPI-Key': 'e651b43727msh08a84f868d5adadp18bceejsn84bed41db10b',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    })
    setBrowserGames(data)
    console.log(data[0]);
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    getBrowserGames()
  }, [])


  return (
    <>

      {loading === true ? <div className='container vh-100  d-flex flex-column justify-content-center align-items-center'>
        <i class="fa-solid fa-spinner fa-spin icon text-white"></i>

      </div> : <div className='container'>
        <div className='row '>
          {browserGames.map((games) => <div className='col-md-4'>
            <div className="card mt-5 bg-transparent" >
              <NavLink to={'/gamedetails/' + games.id}>
                <img src={games.thumbnail} className="card-img-top" alt="..." />
              </NavLink>

              <div className="card-body">
                <div className='row'>
                  <div className='col-md-6 '>
                    <a class="card-text text-white  h5">{games.title}</a>
                  </div>
                  <div className='col-md-6'>
                    <a href={games.game_url} target='_blank' className="btn btn-primary">Play Now!</a>
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
