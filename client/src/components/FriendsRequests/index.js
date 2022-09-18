import React, { useCallback, useEffect, useContext, useState, useRef } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell as bellEmpty } from '@fortawesome/free-regular-svg-icons'
import { faBell as bellFull } from '@fortawesome/free-solid-svg-icons'

// Bootstrap Components
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import ListGroup from 'react-bootstrap/ListGroup';

function FriendsRequests() {

    const { accessToken } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const fetchNotifications = useCallback(() => {
        if (accessToken !== '') {
            axios.get(`https://api.betaseries.com/friends/requests`,
                {
                    params: {
                        client_id: process.env.REACT_APP_CLIENT_ID,
                        access_token: accessToken,
                        received: true
                    }
                })
                .then((res) => {
                    setRequests(res.data.users)
                    axios.get('https://api.betaseries.com/members/notifications',
                        {
                            params: {
                                client_id: process.env.REACT_APP_CLIENT_ID,
                                access_token: accessToken,
                            }
                        })
                        .then((result) => {
                            setNotifications(result.data.notifications)
                        })
                })
        }
    }, [accessToken])

    const addFriend = (id) => {
        let params = {
            client_id: process.env.REACT_APP_CLIENT_ID,
            access_token: accessToken,
            id: id
        }
        axios.post('https://api.betaseries.com/friends/friend', params)
            .then((res) => {
                alert("Vous avez accepté la demande d'amitié.")
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteNotification = (id) => {
        let params = {
            client_id: process.env.REACT_APP_CLIENT_ID,
            access_token: accessToken,
            id: id
        }
        axios.delete('https://api.betaseries.com/members/notification',
            {
                params: params
            })
            .then((res) => {
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchNotifications()
    }, [fetchNotifications])

    return (

        <div ref={ref}>
            {requests.length > 0 || notifications.length > 0 ? (
                <>
                    <FontAwesomeIcon icon={bellFull}
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                            setShow(!show)
                            setTarget(e.target);
                            if (show === true) {
                                e.target.blur()
                            }
                        }}
                        onBlur={(e) => {
                            if (show === true) {
                                setShow(!show)
                                setTarget(e.target);
                            }
                        }} size="lg" />
                </>
            ) : (
                <>
                    <FontAwesomeIcon icon={bellEmpty}
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                            setShow(!show)
                            setTarget(e.target);
                            if (show === true) {
                                e.target.blur()
                            }
                        }}
                        onBlur={(e) => {
                            if (show === true) {
                                setShow(!show)
                                setTarget(e.target);
                            }
                        }} size="lg" />
                </>
            )}

            <Overlay
                show={show}
                target={target}
                placement="bottom-start"
                container={ref}
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    <ListGroup>
                        {requests.length > 0 || notifications.length > 0 ? (
                            <>
                                {requests.length > 0 && (
                                    requests.map((el) => (
                                        <ListGroup.Item key={el.id}>
                                            {el.login} veux rejoindre votre cercle d'amis.
                                            <p style={{ cursor: 'pointer', color: 'blue' }} onClick={() => addFriend(el.id)}>Accepter la demande</p>
                                        </ListGroup.Item>
                                    ))
                                )}
                                {notifications.length > 0 && (
                                    notifications.map((el) => (
                                        <ListGroup.Item key={el.id}>
                                            {el.text}
                                            {el.type === 'friend' ? (
                                                <>
                                                    <p style={{ cursor: 'pointer', color: 'blue' }} onClick={() => {
                                                        addFriend(el.ref_id)
                                                        deleteNotification(el.id)
                                                    }}>Ajouter en ami</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p style={{ cursor: 'pointer', color: 'blue' }} onClick={() => deleteNotification(el.id)}>Supprimer la notification</p>
                                                </>
                                            )}

                                        </ListGroup.Item>
                                    ))
                                )}
                            </>
                        ) : (
                            <>
                                <ListGroup.Item>
                                    Vous n'avez aucune requête en attente
                                </ListGroup.Item>
                            </>
                        )}
                    </ListGroup>
                </Popover>
            </Overlay>
        </div>
    );
}

export default FriendsRequests;