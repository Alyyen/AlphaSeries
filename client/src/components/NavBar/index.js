import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Searchbar from "../Search/Searchbar";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Components
import LogInBtn from "../Auth/LogInBtn";
import LogOutBtn from "../Auth/LogOutBtn";
import FriendsRequests from "../FriendsRequests";

function NavBar() {
    const { loggedIn } = useContext(AuthContext);

    return (
        <Navbar bg="light" expand="lg" className="mb-3 sticky-top">
            <Container fluid>
                <Navbar.Brand href="/">AlphaSeries</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0 text-center" style={{ maxHeight: "100px" }} navbarScroll>

                    </Nav>
                    <Searchbar className="d-flex me-auto" />
                    <Nav className="ms-auto my-2 my-lg-0 text-center align-items-center" style={{ maxHeight: "100px" }} navbarScroll>
                        {loggedIn === true && (
                            <>
                                <FriendsRequests />
                                &nbsp;&nbsp;
                                <Link reloadDocument to={"/profile"}><span className="btn btn-outline-primary m-1">Profil</span></Link>
                                <LogOutBtn />
                            </>
                        )}
                        {loggedIn === false && (
                            <>
                                <LogInBtn />
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
