

const SearchResult = ({results}) => {
    
    
    const informArray = Array(results)
    console.log(informArray)
   
  return (
    <div>SearchResult
      {informArray.map((result, id) => {
        return <div key={id} ></div>

      })}
    </div>

  )
}

export default SearchResult