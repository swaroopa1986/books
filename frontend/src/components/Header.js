import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

 export default function Header() {
  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  return (
    <>
    <div>
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='media' href="#">info@readme.com</Nav.Link>
            <Nav.Link className='media' href="#">01-654789321</Nav.Link>
          </Nav>
          <Nav className="justify-content-center justify-content-lg-end d-flex align-items-center">
          <Nav.Link className='media' href="https://facebook.com" target = "_blank">
                <i className="fab fa-facebook-f"></i>
              </Nav.Link>
              <Nav.Link className='media' href="https://instagram.com"target = "_blank">
                <i className="fab fa-instagram"></i>
              </Nav.Link>
              <Nav.Link className='media' href="https://google.com"target = "_blank">
                <i className="fab fa-google"></i>
              </Nav.Link>
              <Nav.Link className='media' href="https://twitter.com"target = "_blank">
                <i className="fab fa-twitter"></i>
              </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Navbar bg="info" variant="light" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Read Me</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/cart">
                    <Navbar.Brand>
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                    </Navbar.Brand>
                  </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav  className="me-auto  w-100  justify-content-end">
                  <Link to="/search" className="nav-link">
                    More Books
                  </Link>
                  </Nav>
                  <Nav  className="me-auto  w-100  justify-content-end">
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                  </Nav>
                  <Nav  className="me-auto  w-100  justify-content-end">
                  <Link to="/contact" className="nav-link">
                    Contact
                  </Link>
                  </Nav>
                  <Nav  className="me-auto  w-100  justify-content-end">
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/favourites">
                        <NavDropdown.Item>My Favourites</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  </Nav>
                  <Nav  className="me-auto  w-100  justify-content-end">
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/contacts">
                        <NavDropdown.Item>Messages</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    </div>
    </>  
  )
};
