import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from "./utils";
import Footer from './Footer';


function App() {

  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))

    inputUrlRef.current.value = '';

  }

  return (
    <div className="app">
      
      <span className="logo"></span>
      <section className="content">
        <h1 className="content_title">YouTube to MP3 Converter</h1>
        <p className="content_description">
          Transform YouTube videos into MP3s in just a few clicks!
        </p>
        

        <form onSubmit={handleSubmit} className="form">
        <label for="myInput" class="label">
        <span class="label-title">Enter url to search</span>
        <input id="myInput" class="input" name="text" ref={inputUrlRef} placeholder="Paste a Youtube video URL link..." type="text"/>
        </label>

       <div className="div-btn">
       <button class="cssbuttons-io-button"> search
        <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
        </div>
        </button>
       </div>

        </form>

        {urlResult ? <a target='_blank' rel="noreferrer" href={urlResult} className="download_btn">Download MP3</a> : ''}

        <Footer/>


        
        
      </section>

      

      
    </div>
  )
}

export default App


