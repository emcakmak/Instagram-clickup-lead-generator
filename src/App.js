import './App.css';
import { useState } from "react";

function App() {
  const [url, setUrl] = useState()
  const [status, setStatus] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const env = process.env.NODE_ENV

  let URL = 'https://instalead.netlify.app/.netlify/functions/meta'

  // if (env === "development") {
  //   URL = "http://localhost:4000"
  // } else {
  //   URL = 'http://localhost:8888/.netlify/functions/meta'
  // }

  const handleClick = () => {
    if (url === '' || url === undefined || url === null) {
      alert("Please enter a valid Instagram URL!")
    } else {


      setLoading(true)
      console.log(`${URL}/?url=${url}`)
      fetch(`${URL}/?url=${url}`)
        .then(res => {
          setLoading(false)
          if (res.body) {
            setIsLoaded(true)
            if (res.status === 200) {
              setStatus(true)
            } else {
              setStatus(false)
            }
          } else {
            setIsLoaded(false)
          }

        }).catch(err => console.log(err))
    }
  }

  const handleChange = (e) => {
    setUrl(e.target.value)
  }

  return (
    <div className="App">
      <h1>Insta-Lead ClickUp Task Generator</h1>
      <div className='input-container'>
        <input type="text" className='url-input' onChange={handleChange} />
      </div>
      <button className="btn" onClick={handleClick}>Submit</button>
      {loading ? <div className='loading'>Loading, please wait...</div> : <div className='loaded'>Loading, please wait...</div>}

      {isLoaded ? <div className='status-container-data'>
        {status ? <div className='status success'>
          Task successfully created!
        </div> : <div className='status failure'>
          Unsuccessful, please try again
        </div>}
      </div> : <div className='status-container-no-data'>
        {status ? <div className='status success'>
          Task successfully created!
        </div> : <div className='status failure'>
          Unsuccessful, please try again
        </div>}
      </div>}

    </div>
  );
}

export default App;
