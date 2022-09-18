import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import AddToWatchedList from "../../components/AddToWatchedList";

function Home() {

    const navigate = useNavigate();
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const code = query.get('code');
    const [posters, setPosters] = useState('');
    const [shows, setShows] = useState('');

    const nextLogin = useCallback(() => {
        if (code !== null) {
            let info = {
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                redirect_uri: "http://localhost:3000/",
                code: code
            }

            axios.post('https://api.betaseries.com/oauth/access_token', info)
                .then((res) => {
                    let data = {
                        access_token: res.data.access_token
                    }
                    axios.post('http://localhost:4242/login', data, { withCredentials: true })
                        .then((res) => {
                            alert("Bienvenue !")
                            navigate("/", { replace: true });
                            window.location.reload(false);
                        })
                        .catch((err) => {
                            alert('Une erreur est survenue')
                        })
                })
        }
    }, [code, navigate])

    useEffect(() => {
        nextLogin();
        getPosters();
        getShows();
    }, [nextLogin])

    const getPosters = async () => {
        try {
            const res = await axios('https://api.betaseries.com/shows/posters', {
                params: {
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    client_secret: '2e3bce7fdc7e19ef329ae83d6767380d'
                }
            });
            return setPosters(res.data.posters);
        } catch (err) {
            console.error(err);
        }
    };

    const getShows = async () => {
        try {
            const res = await axios('https://api.betaseries.com/shows/discover', {
                params: {
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    client_secret: '2e3bce7fdc7e19ef329ae83d6767380d',
                    limit: 4,
                }
            });
            return setShows(res.data.shows);
        } catch (err) {
            console.error(err);
        }
    };

    if (shows && posters) {
        return (
            <Container>
                <Row className="col">
                    <Col className="profile_shows">
                        <h2>Recommendation</h2>
                        {shows.map((items, index) => (
                            <Col className="d-cards" key={items.id}>
                                <Card className="card">
                                    <Link reloadDocument to={"/show/" + items.id}>
                                        <AddToWatchedList item={items} />
                                        <Card.Img
                                            variant="top"
                                            className="card_img rounded-top"
                                            style={{ height: '100px', width: '250px', objectFit: 'cover'}}
                                            src={items.images.show !== null ? (items.images.show) : ('http://www.luzzio.fr/img/image-not-found.png')}
                                            alt="Image not found"
                                        />
                                        <Card.Body className="card_content p-4 bg-dark rounded-bottom">
                                            <Card.Title
                                                className="text-white text-decoration-none">{items.title.length > 20 ? items.title.substring(0, 17) + "..." : items.title}
                                            </Card.Title>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}

                    </Col>
                </Row>
                <Row className="col">
                    <Col className="profile_shows">
                        <h2>Les plus populaires</h2>
                        {posters.map((items, i) => (
                            <Col className="d-cards" key={i}>
                                <img src={items} alt='' />
                            </Col>
                        ))}

                    </Col>
                </Row>
            </Container>
        )
    } else {
        return (
            <><span>Chargement...</span></>
        )
    }
}

export default Home;
