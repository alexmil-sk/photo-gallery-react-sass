import React, {useEffect, useState} from 'react';
import './index.scss';
import CollectionComp from "./components/CollectionComp";
import axios from 'axios';
import TheLoader from "./components/TheLoader/TheLoader";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";


//https://62e38bb63c89b95396ca9aec.mockapi.io/foto_collection

const categoriesArray = [
  {"name": "All"},
  {"name": "Sea"},
  {"name": "Mountains"},
  {"name": "Architecture"},
  {"name": "Cities"}
];


function App() {
  
  const [myCollections, setMyCollections] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  
  const categoryQuery = categoryId ? `category=${categoryId}` : '';
  const paginationQuery = `page=${paginationPage}&limit=10`;
  
  
  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://62e38bb63c89b95396ca9aec.mockapi.io/foto_collection?${categoryQuery}&${paginationQuery}`)
      .then(res => setMyCollections(res.data))
      .catch(error => setIsError(error.message))
      .finally(() => setIsLoading(false))
  }, [categoryQuery, paginationQuery]);
  
  function searchInputHandler(e) {
    setSearchValue(e.target.value);
  }
  
  function categoryHandler(idx) {
    setCategoryId(idx);
    setPaginationPage(1);
  }
  
  function clearSearchValue() {
    setSearchValue('');
  }
  
  return (
    <div className="App">
      <h1>My collection of Photos</h1>
      <div className="top">
        <ul className="tags">
          {
            categoriesArray.map((item, idx) => (
              <li
                key={idx}
                className={categoryId === idx ? 'active' : ''}
                onClick={() => categoryHandler(idx)}
              >
                {item.name}
              </li>
            ))
          }
        
        </ul>
        
        <span className="bs-search"><BsSearch /></span>
        <input
          className={`search-input ${!searchValue && 'border-radius'}`}
          placeholder="Search by names"
          value={searchValue}
          onChange={searchInputHandler}
        />
        {
          searchValue && <span
            className="ai-outline-clear"
            onClick={clearSearchValue}
          >
            <AiOutlineClear />
          </span>
        }
      </div>
      <div className="content">
        {
          isLoading
            ? (<TheLoader />)
            : isError ? (<p className="error">ERROR! {isError}</p>) : (myCollections
                .filter(item => (item.name.toLowerCase()).includes(searchValue.toLowerCase()))
                .map((item, idx) => (
                  <CollectionComp
                    key={idx}
                    name={item.name}
                    images={item['photos']}
                  />
                ))
            )
        }
      
      </div>
      <ul className="pagination">
        {
  
          [...Array(3)].map((_, idx) => (
            <li
              key={idx}
              onClick={() => setPaginationPage(idx + 1)}
              className={paginationPage === idx + 1 ? "active" : ''}
            >
              {idx + 1}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
