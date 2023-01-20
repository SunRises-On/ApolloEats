import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function UserHeader(){
    return(
    <>
        <Navbar className="mb-3">
          <Container fluid>
          <NavDropdown className='ms-5 me-5' title="Menu">
            <NavDropdown.Item href="restaurants/register">Register Restaurant</NavDropdown.Item>
                {/* <NavDropdown.Item href="#action4">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                    Something else here
                </NavDropdown.Item> */}
            </NavDropdown>
            <Navbar.Brand className='ms-5 me-5' href="#">ApolloEats</Navbar.Brand>
            <Navbar.Toggle  />
            <Navbar.Offcanvas
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title >
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="restaurants">Restaurants</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  {/* <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  /> */}
                  <Button className='me-5' variant="outline-success" href="login">Login</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
    );
}
export default UserHeader;