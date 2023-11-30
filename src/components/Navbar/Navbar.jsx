import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import img1 from '../../images/logo.548dc5719c2345c22eef.png'

export default function Navbar(props) {

    let { user, logOut } = props



    return (
        <div>
            <nav className="navbar navbar-expand-lg  bg-dark ">
                <div className="container">



                    <Link className="navbar-brand text-white fs-2 font1" to='home'>
                        <img className='img1' alt='img' src={img1} />Game Over</Link>
                    <button className="navbar-toggler bg-danger" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {user != null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active text-white font1 mx-2 fs-2" : "nav-link text-white fs-5"}
                                    aria-current="page" to="home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active text-white font1 mx-2 fs-2" : "nav-link text-white fs-5"} to='all'>All</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-white fs-5 ok" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Platforms
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to='platforms/pc'>Pc</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='platforms/browser'>Browser</NavLink></li>

                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-white fs-5 ok" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort-By
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to='sort-by/release-date'>Release date</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='sort-by/popularity'>Popularity</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='sort-by/alphbetical'>Alphbetical</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='sort-by/relevance'>Relevance</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-white fs-5 ok" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to='categories/racing'>Racing</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='categories/sports'>Sports</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='categories/social'>Social</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='categories/shooter'>Shooter</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='categories/open-world'>Open World</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='categories/zombie'>Zombie</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='categories/fantasy'>Fantasy</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='categories/action-rbg'>Action-RBG</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='categories/action'>Action</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='categories/fight'>Fight</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='categories/battle-royal'>Battle Royal</NavLink></li>

                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white fs-5" onClick={logOut}>LogOut</NavLink>
                            </li>
                        </ul>
                            :

                            <ul className='navbar-nav ms-auto'>
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => isActive ? "nav-link active text-white font1 mx-2 fs-2" : "nav-link text-white fs-5"} aria-current="page" to="login">Login</NavLink>
                                </li><li className="nav-item">
                                    <NavLink className={({ isActive }) => isActive ? "nav-link active text-white font1 mx-2 fs-2" : "nav-link text-white fs-5"} aria-current="page" to="register">Register</NavLink>
                                </li>
                            </ul>
                        }




                    </div>
                </div>
            </nav>
        </div>
    )
}
