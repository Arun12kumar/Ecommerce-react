
import { useContext } from 'react';
import SearchCss from '../cssfolder/searchlist.module.css'
import { Searchcontext } from '../Context/AppContext';






const Searchlist = ({ results }) => {


  const {searchData, setSearchData} = useContext(Searchcontext);

    const searchHandle=()=>{
      localStorage.setItem( "results", JSON.stringify(results) )
      var previousSearch = localStorage.getItem('results');
      var searchJson = JSON.parse(previousSearch)
      
      if(searchJson!= null){
        // searchJson.push(results)
        var searchString=JSON.stringify(searchJson);
        localStorage.setItem('results',searchString);
        setSearchData(searchJson)
      }// }else{
      //   var newSearchList=[];
      //   newSearchList.push(results);
      //   var searchString=JSON.stringify(newSearchList );
      //   localStorage.setItem('results',searchString);
      // }      
    }
    console.log(searchData)


  return (

    <div className={SearchCss.content}>

      {results.map((result, id) => {
        return <div key={id} id={SearchCss.item} onClick={searchHandle}>{result.title}</div>

      })}


    </div>
  )
}

export default Searchlist