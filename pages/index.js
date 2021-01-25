import Head from 'next/head'
import styles from '../styles/Home.module.css'
import youtube from './api/youtube';
import {useEffect, useState} from "react";
import {mostPopular} from './api/youtube'
import VideoList from "./components/VideoList";
import VideoItem from "./components/VideoItem";
import {KEY} from './api/youtube'

export default function Home() {

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [SearchInputValue, setSearchInputValue] = useState('');

  const handleSubmit = async (value) => {
    const response = await youtube.get('/search', {
      params: {
        q: value
      }
    })
    await setVideos(response.data.items);
  }

  const handleVideoSelect = async (video) => {
    console.log(video);
    let videoID = (video.id.videoId || video.id);
    const res = await fetch('https://www.googleapis.com/youtube/v3/videos?' + 'part=statistics,snippet&' + 'id=' + videoID + '&key=' + KEY + '&fields=items(id,snippet,statistics)'
    );
    const data = await res.json();
    await setSelectedVideo(data);
  }

  useEffect(async () => {
    const res = await mostPopular.get('/search');
    await setVideos(res.data.items);
  }, [])


  return (
    <>
      <Head>
        <title>Youtube Main page</title>
        <link rel="icon" href="/youtube.ico"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"/>
      </Head>
      <header className={styles.header}>
        <img src="/youtube.jpeg" className={styles.logoImage}/>
        <div>
          <input className={styles.searchInput} type='text' placeholder={"Search here..."}
                 onChange={(e) => setSearchInputValue(e.target.value)}/>
          <button className={styles.searchBtn}
                  onClick={() => handleSubmit(SearchInputValue)}>Search
          </button>
        </div>
      </header>

      <main className={styles.main_container}>
        {selectedVideo !== null && selectedVideo !== undefined ? <VideoItem video={selectedVideo}/>:<h1>Choose video for watching</h1>}

        <div className={styles.videosContainer}>
          {videos.map((el) => {
            return <VideoList video={el} key={el.id.videoId} handleVideoSelect={handleVideoSelect}/>
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© Copyright 2020 MK | All Rights Reserved</p>
      </footer>
    </>
  )
}
