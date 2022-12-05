import React from 'react'
import { Link } from 'react-router-dom';
import "../App"
import { useAppContext } from "../components/appContext";

export default function FavouriteScreen() {
  const { favourites, addToFavourites, removeFromFavourites } = useAppContext();
  const favouritesChecker = (id) => {
    const boolean = favourites.some((item) => item.id === id);
    return boolean;
  };
  return (
    <>
    <div className='favourites'>
    {favourites.length >0 ? (
        favourites.map((item) => {
        let thumbnail =
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.smallThumbnail;
        let buylink = item.saleInfo.buyLink;
        if (thumbnail !== undefined) {
          return (
            <div className="book-list" key={item.id}>
              <div className='favImage'>
                <img src={thumbnail} alt={item.volumeInfo.title} />
                <div className="bottom">
                  <h2 className="title">{item.volumeInfo.title}</h2>
                </div>
                <div>
                  {favouritesChecker(item.id) ? (
                    <button
                      onClick={() => removeFromFavourites(item.id)}
                      className="bookbutton"
                    >
                      Remove From favourites
                    </button>
                  ) : (
                    <button
                      onClick={() => addToFavourites(item)}
                      className="itembutton"
                    >
                      Add to favourites
                    </button>
                  )}
                </div>
              </div>
              <div>
                <h6 className="favdescription">{item.volumeInfo.description}</h6>
              </div>
              <div> 
                {buylink? (
                  <a href={buylink } target="_blank"><button>Buy Link</button></a>
                ) : (
                 <h4> Not for Sale </h4> 
                )
                } 
              </div>
            </div>
          );
        }
      })):(
        <div>
          <h1>Add your favourite books. </h1>
        <h4>Continue to Add  <span><Link to="/search">Books</Link></span></h4>
        </div>
        
      )}
    </div>
      
    </>
  );
}
