
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
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
// import ProductDetail from './Components/ProductDetail'
import AppCss from './cssfolder/App.module.css'
import SearchResult from "./Components/SearchResult";
import { SearchProvider } from "./Context/SearContext";
import { useState } from "react";

import { Searchcontext } from "./Context/AppContext";
import Payment from "./Components/Payment";
import ProductInfo from "./Components/ProductInfo";
import YourOrder from "./Components/YourOrder";
import EditAddress from "./Components/EditAddress";





const datacheck = localStorage.getItem('results')


function App() {

  const [searchData, setSearchData] = useState(JSON.parse(datacheck));
  return (
    <Router>
      
        <Searchcontext.Provider value={{ searchData, setSearchData }}>
          <AuthProvider>
            <SearchProvider>
              <div className={AppCss.container}>
                <div className={AppCss.navbars}>< Navbar /></div>
                <div className={AppCss.switch}>
                  <Switch >
                    <PrivateRoute component={Dashboard} path="/dashboard" exact />
                    <Route component={NewLogin} path="/login" />
                    <Route component={Register} path="/register" exact />
                    <Route component={NewHome} path="/" exact />
                    {/* <Route component={ProductDetail} path="/productdetail/:id" exact /> */}
                    <Route component={ProductInfo} path="/productinfo/:id" exact />

                    <Route component={CartOreder} path="/cart" exact />
                    {/* <Route component={CartOreder} path="/cart/:id" exact /> */}
                    <Route component={Placeorder} path="/placeorder" exact />


                    <Route component={SearchResult} path="/result" exact />
                    <Route component={YourOrder} path="/orders" exact />
                    <Route component={EditAddress} path="/edit" exact />


                    <Route component={CategoryList} path="/list/:id" exact />
                    <Payment/>

                  </Switch>
                </div>

              </div>
            </SearchProvider>
          </AuthProvider>
        </Searchcontext.Provider>
      
    </Router>
  )
}

export default App