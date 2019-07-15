import Link from "next/link";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function AppNavbar({ user }) {
  return (
    <Navbar bg="light" expand="lg" style={{ marginBottom: "25px" }}>
      <Container>
        <Navbar.Brand>
          <Link href="/">
            <a>Thoughts!</a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/">
              <a className="nav-link">Home</a>
            </Link>
            {user && (
              <>
                <Link href="/write">
                  <a className="nav-link">New Article</a>
                </Link>
                <Link href="/logout">
                  <a className="nav-link">Log Out</a>
                </Link>
              </>
            )}
            {!user && (
              <Link href="/login">
                <a className="nav-link">Log In to Write</a>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

