
import SearchCss from '../cssfolder/searchlist.module.css'



const Searchlist = ({ results }) => {

  

  return (

    <div className={SearchCss.content}>

      {results.map((result, id) => {
        return <div key={id} id={SearchCss.item}>{result.title}</div>

      })}

    </div>
  )
}

export default Searchlist