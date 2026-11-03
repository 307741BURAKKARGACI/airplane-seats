import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LogoutButton } from './AuthComponents';

function NavHeader(props) {
  return (
  
  <Navbar bg="secondary" variant="dark">
    <Container fluid>
      <Link to='/' className='navbar-brand'>Airplane Seat Reservation</Link>
      {props.loggedIn ? 
        <LogoutButton logout={props.handleLogout} /> :
        <Link to='/login'className='btn btn-outline-light'>Login</Link>
        }
    </Container>
  </Navbar>
  );
}
export default NavHeader;