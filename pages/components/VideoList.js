import styles from '../../styles/Home.module.css'

export default function VideoList({video, handleVideoSelect}) {

  return (
    <div className={styles.VideoListItemContainer} onClick={() => handleVideoSelect(video)}>
      <img className={styles.iframeImg}
           src={video.snippet.thumbnails.medium.url}
           alt={video.snippet.title}
      />
      <span>{video.snippet.title}</span>
    </div>
  )

}