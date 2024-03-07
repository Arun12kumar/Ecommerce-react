import { useContext } from "react";
import SearCss from '../cssfolder/searchresult.module.css'
import { Link } from 'react-router-dom'
import { Searchcontext } from "../Context/AppContext";



const SearchResult = () => {


  const {searchData, setSearchData} = useContext(Searchcontext);
  console.log(searchData)
  
  return (
    <div className={SearCss.main}>
      <h2>Product List</h2>
      <ul className={SearCss.container}>
        {searchData.map((item) => (
          <li key={item.id} className={SearCss.items}><Link to={`/productdetail/${item.id}`}><img src={item.image}   /></Link></li>
        ))}
      </ul>

    </div>
  );
};

export default SearchResult;