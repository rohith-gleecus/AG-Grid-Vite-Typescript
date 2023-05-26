import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './header.css';

function BasicExample(): JSX.Element {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">AG Grid</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
