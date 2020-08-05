import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TemplateList from './components/TemplateList';
import CVList from './components/CVList';
import CVEditor from './components/CVEditor';
import DataContext from './contexts/DataContext';
const axios = require('axios');

function App() {
  const [templates, setTemplates] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_TEMPLATES_URL)
    .then(function (response) {
      // handle success
      setTemplates(response.data)
    })
    .catch(function (error) {
      // handle error
    })
    .then(function () {
      // always executed
    });
  }, []);

  const [updateValue, setUpdateValue] = useState(false);
  const [currentCv, setCurrentCv] = useState(null);
  const data = {
    templates,
    currentCv,
    setCurrentCv,
    updateValue,
    setUpdateValue
  };

  return (
    <DataContext.Provider value={data}>
      <div className="App">
        <Header />
        <TemplateList />
        <CVList />
        <CVEditor />
        <Footer />
      </div>
    </DataContext.Provider>
  );
}

export default App;
