import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import './style.css';

// Bootstrap Components
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ShowsCard from "../../components/ShowsCard";

function UserProfile() {
    const { accessToken } = useContext(AuthContext);
    const [datas, setDatas] = useState('');
    const [shows, setShows] = useState('');

    useEffect(() => {
        getDatas();
        getShows();
        // eslint-disable-next-line
    }, [accessToken]);

    const getDatas = async () => {
        if (accessToken !== '') {
            try {
                const res = await axios('https://api.betaseries.com/members/infos', {
                    params: {
                        client_id: process.env.REACT_APP_CLIENT_ID,
                        access_token: accessToken,
                    }
                });
                return setDatas(res.data);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const getShows = () => {
        if (accessToken !== '') {
            axios.get('https://api.betaseries.com/shows/member', {
                params: {
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    access_token: accessToken,
                }
            })
                .then((res) => {
                    setShows(res.data.shows);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    };

    if (datas !== '' && shows !== '') {
        return (
            <Container>
                <Row className="banner">
                </Row>
                <Row className="profile_datas">
                    <Col className="col-6 col-md-4 col-lg-3">
                        <img
                            src={datas.member.avatar ? datas.member.avatar : "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"}
                            alt="Banner" className="avatar" />
                    </Col>
                    <Col className="col-12 col-md-6 title">
                        <h1>{datas.member.login}</h1>
                        <Link className="profile_friends btn btn-outline-primary" reloadDocument
                            to={"/friends"}>{datas.member.stats.friends > 1 ? datas.member.stats.friends + ' amis' : datas.member.stats.friends + ' ami'}
                        </Link>
                        <Link className="profile_friends btn btn-outline-primary" reloadDocument
                            to={"/add-friends"}>Trouver des amis
                        </Link>
                    </Col>

                </Row>
                <Row className="col">
                    <Col className="profile_shows">
                        {shows.some(e => e.user.favorited === true) === true && (
                            <>
                                <h2 className="mt-3">Liste de vos séries favorites</h2>
                                {shows.map((items, index) => (
                                    items.user.favorited === true && items.user.archived === false &&
                                    <Col className="d-cards" key={index}>
                                        <ShowsCard shows={items} />
                                    </Col>
                                ))}
                            </>
                        )}
                        <h2 className="mt-3">Liste de vos séries</h2>
                        {shows.map((items, index) => (
                            items.user.archived === false && items.user.favorited === false &&
                            <Col className="d-cards" key={index}>
                                <ShowsCard shows={items} />
                            </Col>
                        ))}
                        {shows.some(e => e.user.archived === true) === true && (
                            <>
                                <h2 className="mt-3">Liste de vos séries archivées</h2>
                                {shows.map((items, index) => (
                                    items.user.archived === true && items.user.favorited === false &&
                                    <Col className="d-cards" key={index}>
                                        <ShowsCard shows={items} />
                                    </Col>
                                ))}
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        )
    }
}

export default UserProfile;
