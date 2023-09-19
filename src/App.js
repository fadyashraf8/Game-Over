import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import All from './components/All/All';
import Home from './components/Home/Home';
import MasterLayout from './components/MasterLayout/MasterLayout.jsx';
import Pc from './components/Platforms/pc/Pc.jsx';
import Browser from './components/Platforms/Browser/Browser.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import ReleaseDate from './components/SortBy/ReleaseDate/ReleaseDate';
import Popularity from './components/SortBy/Popularity/Popularity';
import Alphbetical from './components/SortBy/Alphbetical/Alphbetical.jsx';
import Relevance from './components/SortBy/Relevance/Relevance.jsx';
import Racing from './components/Categories/Racing/Racing';
import Sports from './components/Categories/Sports/Sports';
import Social from './components/Categories/Social/Social.jsx';
import Shooter from './components/Categories/Shooter/Shooter.jsx';
import OpenWorld from './components/Categories/OpenWorld/OpenWorld';
import Zombie from './components/Categories/Zombie/Zombie.jsx';
import Fantasy from './components/Categories/Fantasy/Fantasy';
import ActionRbg from './components/Categories/ActionRbg/ActionRbg';
import Action from './components/Categories/Action/Action';
import Fight from './components/Categories/Fight/Fight';
import BattleRoyal from './components/Categories/BattleRoyal/BattleRoyal';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import NotFound from './components/NotFound/NotFound';
import DetailsGame from './components/DetailsGame/DetailsGame.jsx';

function App() {

  let [user, setUser] = useState(null)



  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      saveUserData()
    }
  }, [])

  function saveUserData() {

    let token = localStorage.getItem("token")
    let data = jwtDecode(token)
    setUser(data)
  }

  function ProtectedRouter(props) {

    if (localStorage.getItem("token") === null) {
      return <Navigate to="/login" />

    } else {
    return  props.children
    }
  }
  function ProtectedRouter2(props) {

    if (localStorage.getItem("token") != null) {
      return <Navigate to="/home" />

    } else {
    return  props.children
    }
  }

  function logOut() {
    localStorage.removeItem("token")
    setUser(null)
    return <Navigate to="/login" />
  }

  let router = createHashRouter([
    {
      path: '/', element: <MasterLayout user={user} logOut={logOut} />, children: [
        { path: '/', element: <ProtectedRouter><Home /></ProtectedRouter>  },
        { path: 'home', element:<ProtectedRouter><Home /></ProtectedRouter>  },
        { path: 'all', element: <ProtectedRouter><All /></ProtectedRouter>  },
        { path: 'platforms/pc', element: <ProtectedRouter><Pc /></ProtectedRouter> },
        { path: 'platforms/browser', element: <ProtectedRouter><Browser /></ProtectedRouter>  },
        { path: 'sort-by/release-date', element: <ProtectedRouter><ReleaseDate /></ProtectedRouter>  },
        { path: 'sort-by/popularity', element: <ProtectedRouter><Popularity /></ProtectedRouter> },
        { path: 'sort-by/alphbetical', element: <ProtectedRouter><Alphbetical /></ProtectedRouter>  },
        { path: 'sort-by/relevance', element: <ProtectedRouter><Relevance /></ProtectedRouter>  },
        { path: 'categories/racing', element: <ProtectedRouter><Racing /></ProtectedRouter>  },
        { path: 'categories/sports', element: <ProtectedRouter><Sports /></ProtectedRouter>  },
        { path: 'categories/social', element: <ProtectedRouter><Social /></ProtectedRouter>  },
        { path: 'categories/shooter', element: <ProtectedRouter><Shooter /></ProtectedRouter>  },
        { path: 'categories/open-world', element: <ProtectedRouter><OpenWorld /></ProtectedRouter>  },
        { path: 'categories/zombie', element: <ProtectedRouter><Zombie /></ProtectedRouter>  },
        { path: 'categories/fantasy', element:<ProtectedRouter><Fantasy /></ProtectedRouter> },
        { path: 'categories/action-rbg', element:<ProtectedRouter><ActionRbg /></ProtectedRouter>  },
        { path: 'categories/action', element: <ProtectedRouter><Action /></ProtectedRouter>  },
        { path: 'categories/fight', element: <ProtectedRouter><Fight /></ProtectedRouter>  },
        { path: 'categories/battle-royal', element: <ProtectedRouter><BattleRoyal /></ProtectedRouter>  },
        { path: 'gamedetails/:id', element: <ProtectedRouter><DetailsGame /></ProtectedRouter>  },
        { path: 'login', element:<ProtectedRouter2><Login saveUserData={saveUserData} /> </ProtectedRouter2> },
        { path: 'register', element:<ProtectedRouter2><Register /></ProtectedRouter2>  },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])



  return (
    <RouterProvider router={router} />
  );
}

export default App;


