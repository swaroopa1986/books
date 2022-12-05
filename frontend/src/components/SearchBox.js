import React, { useState } from "react";
import axios from "axios";
import BookList from "../screens/BookList";
import { Helmet } from "react-helmet-async";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const [error, setError] = useState("");
  function handleSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  async function getBook(e) {
    e.preventDefault();
    try {
      var response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes/",
        {
          params: {
            q: search,
            key: "AIzaSyBqnjw8xdLU88u5_fErYj7bsFvKgTBW3D0",
            maxResults: 10,
          },
        }
      );
      setData(response.data.items);
    } catch (e) {
      setError("Book not found, please check the name of the book.");
    }
  }
  return (
    <>
      <div className="bookheader">
        <Helmet><title>Search</title></Helmet>
        <div className="row1">
          <h1 className="booktext">
            The more that you READ,
            <br />
            the more you will KNOW.{" "}
          </h1>
        </div>
        <div className="row2">
          <h1 className="booktext">Search for your favourite book. </h1>
          <div className="search">
            <input
              type="text"
              placeholder="Book Title"
              value={search}
              onChange={handleSearch}
            />
            <button onClick={getBook}>Search</button>
          </div>
        </div>
      </div>
      <div className="bookcontainer">{<BookList book={bookData} />}</div>
    </>
  );
}
