
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
import ProductDetail from './Components/ProductDetail'
import AppCss from './cssfolder/App.module.css'
import SearchResult from "./Components/SearchResult";
import { SearchProvider } from "./Context/SearContext";
import { useState } from "react";
import { CartContext } from "./Context/AppContext";
import { Searchcontext } from "./Context/AppContext";




const checkCart = localStorage.getItem('cartData');
const datacheck = localStorage.getItem('results')


function App() {

  const [cartsData, setcartsData] = useState(JSON.parse(checkCart));
  const [searchData, setSearchData] = useState(JSON.parse(datacheck));
  return (
    <Router>
      <CartContext.Provider value={{ cartsData, setcartsData }}>
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
                    <Route component={ProductDetail} path="/productdetail/:id" exact />

                    <Route component={CartOreder} path="/cart" exact />
                    {/* <Route component={CartOreder} path="/cart/:id" exact /> */}
                    <Route component={Placeorder} path="/placeorder" exact />


                    <Route component={SearchResult} path="/result" exact />


                    <Route component={CategoryList} path="/list/:id" exact />

                  </Switch>
                </div>

              </div>
            </SearchProvider>
          </AuthProvider>
        </Searchcontext.Provider>
      </CartContext.Provider>
    </Router>
  )
}

export default App