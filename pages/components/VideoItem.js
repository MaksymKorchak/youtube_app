import styles from '../../styles/Home.module.css'
import {useState} from "react";

export default function VideoItem({video}) {
  const item = video.items[0];
  const [selected, setSelected] = useState('');

  const putToStorage = (id) => {
    let existingProducts = JSON.parse(localStorage.getItem('Favourites'));
    if (existingProducts == null) existingProducts = [];
    existingProducts.push(id);
    let ProductsUniqCart = Array.from(new Set(existingProducts.map(JSON.stringify))).map(JSON.parse);
    localStorage.setItem('Favourites', JSON.stringify(ProductsUniqCart));
    setSelected(true);
  }

  const deleteFromStorage = (id) => {
    setSelected(false);
    if (JSON.parse(localStorage.getItem('Favourites')).includes(id)) {
      let newArr = JSON.parse(localStorage.getItem('Favourites')).filter((el) => el !== id);
      localStorage.setItem('Favourites', JSON.stringify(Array.from(newArr)));
    }

  }

  let existingProducts = JSON.parse(localStorage.getItem('Favourites'));
  if (existingProducts == null) existingProducts = [];
  let ProductsUniqCart = Array.from(existingProducts);
  localStorage.setItem('Favourites', JSON.stringify(ProductsUniqCart));

  return (
    <>
      {{video} ?
        <div className={styles.videoItemContainer}>
          <iframe
            className={styles.videoItemContainer__iframe}
            src={`https://www.youtube.com/embed/${item.id}`} allowFullScreen title="Video player"/>
          <div className={styles.videoItem_info}>
            <p className={styles.videoItem_infoType}><i className="fas fa-eye"></i> {item.statistics.viewCount}</p>
            <p className={styles.videoItem_infoType}><i className="fas fa-thumbs-up"></i> {item.statistics.likeCount}
            </p>
            <p className={styles.videoItem_infoType}><i
              className="fas fa-thumbs-down"></i> {item.statistics.dislikeCount}</p>
            <p className={styles.videoItem_infoType}><i className="fas fa-comment"></i> {item.statistics.commentCount}
            </p>
            {selected || (JSON.parse(localStorage.getItem('Favourites')).includes(item.id))
              ?
              <p className={styles.videoItem_infoTypeHeart} onClick={() => deleteFromStorage(item.id)}><i
                className="far fa-heart"></i></p>
              :
              <p className={styles.videoItem_infoType} onClick={() => putToStorage(item.id)}><i
                className="far fa-heart"></i></p>
            }

          </div>
        </div>
        : ''
      }
    </>
  )

}