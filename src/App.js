import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    // Here, you'd typically make an API request to fetch data based on the searchTerm.
    // For the purpose of this example, we'll just use dummy data.
    const dummyData = [
      {
        id: 1,
        title: 'Card 1',
        image: 'https://via.placeholder.com/150',
        score: 4.5
      },
      {
        id: 2,
        title: 'Card 2',
        image: 'https://via.placeholder.com/150',
        score: 3.7
      }
    ];
    const apiUrl = 'https://moly.hu/api/books.json';
    const params = {
      q: "tüskevár",
      key: '82bcbc88494e224498b951657083bb4d'
    };
  
    try {
      const response = await axios.get(apiUrl, { params: params });
  
      // Extract book data from JSON response
      const books = response.data.books;
  
      // Log the book data
      console.log('Books:', books);
  
      // If you want to log individual properties of each book:
      books.forEach((book) => {
        console.log('id:', book.id);
        console.log('author:', book.author);
        console.log('title:', book.title);
      });
  
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    const apiUrl_ = 'https://api.citatum.hu/idezet.php';
    const params_ = {
      f: 'Mondvanolvaso',
      j: 'c53d6e70479b94bf1d1a4bc872eb2bd7'
    };
  
    try {
      const customHeaders = {
        Host: 'https://book-app-inky.vercel.app/'
            };
      const response = await axios.get(apiUrl_, { params: params_, headers: customHeaders });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
    setData(dummyData);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Search Example</h1>
        </div>
        <div className="col-12 d-flex justify-content-center">
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
        <div className="col-12 mt-4">
          {data.map((item) => (
            <div key={item.id} className="card mb-3" style={{ maxWidth: '540px' }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">Score: {item.score}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
