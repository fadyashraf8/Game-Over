import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

export default function All() {


  const [allGames, setAllGames] = useState([])
  const [loading, setLoading] = useState(false)

  async function getAllGames() {

    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`, {
      headers: {
        'X-RapidAPI-Key': 'e651b43727msh08a84f868d5adadp18bceejsn84bed41db10b',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    })
    setAllGames(data)
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

      </div> : <div className='container'>
        <div className='row '>
          {allGames.map((e) => <div className='col-md-4'>
              <div className="card mt-5 bg-transparent" >
            <NavLink to={'/gamedetails/' + e.id}>
                <img src={e.thumbnail} className="card-img-top" alt="..." />
            </NavLink>

                <div className="card-body">
                  <div className='row'>
                    <div className='col-md-6 '>
                      <Link class="card-text text-white  h5">{e.title}</Link>
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
