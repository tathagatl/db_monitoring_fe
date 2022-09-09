import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"
import { useSelector } from 'react-redux';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ResendPassword from './Pages/ResendPassword';
import HomePage from './Pages/HomePage';

const Routing = props => {

    const isSignedIn = useSelector(state => state.auth.isSignedIn)

    let routes;

    if(!isSignedIn) {
        routes = (
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/signup' element={<Signup />}/>
                <Route path='/reset' element={<ResendPassword />}/>
            </Routes>
        )
    }

    if(isSignedIn) {
        routes = (
            <Routes>
                <Route path='' element={<HomePage />}/>
            </Routes>
        )
    }

    return (
        <Router>{routes}</Router>
    )
}

export default Routing