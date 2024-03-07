import React, { createContext, useEffect, useState } from 'react'


const SearContext = createContext();

const SearchProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      // Fetch data from the API
      fetch('http://127.0.0.1:8000/api/product/products/')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
  
    return (
      <SearContext.Provider value={products}>
        {children}
      </SearContext.Provider>
    );
  };


export  {SearContext,SearchProvider};
