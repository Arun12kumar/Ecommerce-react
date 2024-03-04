import React from 'react'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import PrivateRoute from "./Utils/PrivateRoute";
import { AuthProvider } from './Context/AuthContext'
import Dashboard from './Components/Dashboard'
import Navbar from './Components/Navbar'
import NewHome from './Components/NewHome'
import NewLogin from './Components/NewLogin'
import Register from './Components/Register'
import CartOreder from './Components/CartOreder'
import Placeorder from './Components/Placeorder'
import CategoryList from './Components/CategoryList'

import ProductDetail from './Components/ProductDetail'
import AppCss from './cssfolder/App.module.css'




function App() {
  return (
    <Router>
      <AuthProvider>
          <div className={AppCss.container}>
            <div className={AppCss.navbars}>< Navbar/></div>
            <div className={AppCss.switch}>
              <Switch >
                <PrivateRoute component={Dashboard} path="/dashboard" exact />
                <Route component={NewLogin} path="/login" />
                <Route component={Register} path="/register" exact />
                <Route component={NewHome} path="/" exact />
                <Route component={ProductDetail} path="/productdetail/:id" exact />
          
                <Route component={CartOreder} path="/cart" exact />
                {/* <Route component={CartOreder} path="/cart/:id" exact /> */}
                <Route component={Placeorder} path="/placeorder" exact />
                <Route component={CategoryList} path="/list/:id" exact />

              </Switch>
            </div>
            
          </div>
      </AuthProvider>
    </Router>
  )
}

export default App