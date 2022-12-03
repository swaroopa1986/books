import React, { useState } from "react";
import BookDetails from "./BookDetails";
import "../App.css";
import { useAppContext } from "../components/appContext";
export default function BookList({ book }) {
  const [bookItem, setItem] = useState();
  const { favourites, addToFavourites, removeFromFavourites } = useAppContext();
  const [show,setShow]=useState(false);
  const favouritesChecker = (id) => {
    const boolean = favourites.some((item) => item.id === id);
    return boolean;
  };
  return (
    <>
      {book.map((item) => {
        let thumbnail =
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.smallThumbnail;
        let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
        if (thumbnail !== undefined) {
          return (
            <div className="book-list" key={item.id}>
              <div className="card">
                <img src={thumbnail} alt={item.volumeInfo.title}  onClick={()=>{setShow(true); setItem(item)}}/>
                <div className="bottom">
                  <h2 className="title">{item.volumeInfo.title}</h2>
                </div>
                <div>
                  <h4>{item.volumeInfo.authors}</h4>
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
              <div> 
                 <h4 className="amount">{amount ? '€'+amount : 'not for sale'}</h4>
              </div>
              </div>
            <BookDetails show={show} item={bookItem} onClose={()=>setShow(false)}/>
            </div>
          );
        }
      })}
    </>
  );
}
