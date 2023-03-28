import React, { useContext } from 'react';
import AppContext from '../AppContext';

const SearchBar = () => {
    const { searchTerm, setSearchTerm, handleSearch } = useContext(AppContext);

  return (<div className="col-12 d-flex justify-content-center">
    <input
      type="text"
      className="form-control"
      id="search-input"
      placeholder="Search here..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button className="btn btn-primary ms-2" onClick={handleSearch}>
      Search
    </button>
  </div>
);
}

export default SearchBar;