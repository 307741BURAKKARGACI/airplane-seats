import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container, Row, Alert } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (event) => {
      event.preventDefault();
      const credentials = { username, password };
      
      props.login(credentials);
  };

  const handleClick = () => {
    if(props.updateWithoutLogin===true) props.setsetupdateWithoutLogin(false);
    else props.setupdateWithoutLogin(true);
  };

  return (
    <>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='username'>
                <Form.Label>email</Form.Label>
                <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6}/>
            </Form.Group>

            <Button type="submit"className="btn btn-secondary mt-3">Login</Button>
        </Form>
        <Button className="btn btn-danger mt-3" as={Link} to="/" onClick={handleClick} >
        Continue without Login
        </Button>
        <Container fluid className="mt-3">
          {props.message && <Row>
            <Alert variant={props.message.type} onClose={() => props.setMessage('')} dismissible>{props.message.msg}</Alert>
          </Row> }
          <Outlet/>
        </Container>
    </>
  )
};

function LogoutButton(props) {
  return(
    <Button variant='outline-light' onClick={props.logout} >Logout</Button>
  )
}
export { LoginForm, LogoutButton };
