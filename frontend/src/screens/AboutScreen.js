import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

export default function AboutScreen() {
  return (
    <>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="First slide"
          height="350px"
        />
        <Carousel.Caption>
          <h3>The Holy Bible.</h3>
          <h4>“Sometimes, you read a book and it fills you with this weird evangelical zeal, and you become convinced that the shattered world will never be put back together unless and until all living humans read the book.” ― John Green, The Fault in Our Stars</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/1809340/pexels-photo-1809340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Second slide"
          height="350px"
        />

        <Carousel.Caption>
          <h3>Relax while reading a book.</h3>
          <h4>“You can never get a cup of tea large enough or a book long enough to suit me.” ― C.S. Lewis</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Third slide"
          height="350px"
        />

        <Carousel.Caption>
          <h3>Books Library.</h3>
          <h4>
          “A room without books is like a body without a soul.” ― Marcus Tullius Cicero
          </h4>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <div>
    <h4>Reading is more than just a hobby for me because I have always loved books and everything associated with them. People who are bookish frequently visit websites about books, just as many sports fans read sports news and music lovers enjoy learning more about music (rather than just listening to it).</h4>
    <h4>They search for online resources for readers and authors. additionally, there are author interviews, publishing stories, book news, and reviews of books. There is so much to discover and discuss, including fascinating new viewpoints on the book world.
You've probably heard of some of the top book/literary websites, some of which you should visit next.</h4>
    <h4>Read Me was established in to give customers another method to order books online while relaxing on their computers. Since then, readme.com has developed into Ireland's top online book and eBook store. Readme.com offers the exceptional value and service that are the foundation of the Read Me brand both domestically and internationally, with free shipping anywhere in Ireland and the UK for orders over €10 and a wide selection of titles. Many books that aren't usually available locally can now be purchased by people from all over the world thanks to this website.</h4>
    </div>
    </>
  );
}
