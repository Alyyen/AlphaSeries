import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import AuthContext from "../../../context/AuthContext";

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash, faUserPlus } from '@fortawesome/free-solid-svg-icons'

function AddRemoveBtn({ id, friends }) {

    const { accessToken } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false);

    const removeFriend = useCallback(() => {
        if (clicked === true) {
            let params = {
                client_id: process.env.REACT_APP_CLIENT_ID,
                access_token: accessToken,
                id: id
            }
            if (friends === true) {
                axios.delete('https://api.betaseries.com/friends/friend',
                    {
                        params: params
                    })
                    .then((res) => {
                        alert("Cet ami a été retiré.")
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
            else {
                axios.post('https://api.betaseries.com/friends/friend', params)
                    .then((res) => {
                        alert("Votre demande d'ami a été transmise !")
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }, [accessToken, id, clicked, friends])

    useEffect(() => {
        removeFriend()
    }, [removeFriend, clicked])

    return (
        <>
            {friends === true ? (
                <div className="d-flex flex-column" style={{ width: 90 }}>
                    {clicked === false ? (
                        <>
                            <button className="btn btn-warning" onClick={() => setClicked(true)}>
                                <FontAwesomeIcon icon={faUserSlash} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-warning">
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </button>
                        </>
                    )}
                    <small>Retirer</small>
                </div>
            ) : (
                <div className="d-flex flex-column" style={{ width: 90 }}>
                    {clicked === false ? (
                        <>
                            <button className="btn btn-primary" onClick={() => setClicked(true)}>
                                <FontAwesomeIcon icon={faUserPlus} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-primary">
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </button>
                        </>
                    )}
                    <small>Ajouter</small>
                </div>
            )}
        </>
    );
}

export default AddRemoveBtn;
