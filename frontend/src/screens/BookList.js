import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
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
    <Helmet>
        <title>Books List</title>
      </Helmet>
      {book.map((item) => {
        let thumbnail =
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.smallThumbnail;
        let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
        if (thumbnail !== undefined ) {
          return (
            <div className="book-list" key={item.id}>
              <div className="bookcard">
                <img src={thumbnail} alt={item.volumeInfo.title}  onClick={()=>{setShow(true); setItem(item)}}/>
                <div className="bottom">
                  <h3 className="title">{item.volumeInfo.title}</h3>
                </div>
                <div>
                  <h6>{item.volumeInfo.authors}</h6>
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
                 <h5 className="amount">{amount ? '€'+amount : 'not for sale'}</h5>
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
