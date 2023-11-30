import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function DetailsGame() {
    let { id } = useParams()

    const [detailsGame, setDetailsGame] = useState([])

    async function getDetailsGame(id) {


        let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, {
            headers: {
                'X-RapidAPI-Key': 'e651b43727msh08a84f868d5adadp18bceejsn84bed41db10b',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        })
        console.log(data);
        setDetailsGame([data])
    }


    useEffect(() => {
        getDetailsGame(id)
    }, [id])




    {
        let Information = detailsGame.minimum_system_requirements
        if (Information !== undefined) {
            var graphics = Information.graphics
            var memory = Information.memory
            var os = Information.os
            var processor = Information.processor
            var storage = Information.storage   
        } 
    }


    return (
        <div className='container mt-5'>
            {detailsGame.map((e) =>
                <div className='row'>
                    <div className='col-md-4'>
                        <div class="card bg-transparent " >
                            <img src={e.thumbnail} class="card-img-top" alt="..." />
                            <div class="card-body text-center">
                                <Link to={e.game_url} target='_blank' class="btn btn-primary">Play Now!</Link>
                            </div>
                        </div>
                    </div>
                    <div className='offset-1 col-md-7'>
                        <h1 className='text-white font1'>{e.title}</h1>
                        <p className='text-white'>{e.description.slice(0, 636)}</p>
                        <div className='border border-1 rounded-5 p-4'>
                            <h3 className='text-white mt-4'>Minimum System Requirements</h3>

                            <p className='text-white'><span className='h5'>Graphics</span> : {graphics}</p>
                            
                            <p className='text-white'><span className='h5'>Memory</span> : {memory}</p>

                            <p className='text-white'><span className='h5'>OS</span> : {os}</p>

                            <p className='text-white'><span className='h5'>Processor</span> : {processor}</p>

                            <p className='text-white'><span className='h5'>Storage</span> : {storage}</p>
                        </div>

                        <div className='border border-1 rounded-5 p-4 mt-4 mb-4'>
                            <h3 className='text-white mt-4'>Additional Information</h3>

                            <p className='text-white'><span className='h5'>Platform</span> : {e.platform}</p>

                            <p className='text-white'><span className='h5'>Publisher</span> : {e.publisher}</p>

                            <p className='text-white'><span className='h5'>Release Date</span> : {e.release_date}</p>

                            <p className='text-white'><span className='h5'>Developer</span> : {e.developer}</p>
                        </div>



                    </div>

                </div>
            )}

        </div>
    )
}
