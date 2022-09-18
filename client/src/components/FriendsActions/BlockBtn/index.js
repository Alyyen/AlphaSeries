import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import AuthContext from "../../../context/AuthContext";

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

function BlockBtn({ id, blocked }) {

    const { accessToken } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false);

    const blockFriend = useCallback(() => {
        if (clicked === true) {
            let params = {
                client_id: process.env.REACT_APP_CLIENT_ID,
                access_token: accessToken,
                id: id
            }
            if (blocked === true) {
                axios.delete('https://api.betaseries.com/friends/block',
                    {
                        params: params
                    })
                    .then((res) => {
                        alert('Le membre a bien été débloqué !')
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
            else {
                axios.post('https://api.betaseries.com/friends/block', params)
                    .then((res) => {
                        alert('Le membre a bien été bloqué.')
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }, [accessToken, id, blocked, clicked])

    useEffect(() => {
        blockFriend()
    }, [blockFriend, clicked])

    return (
        <>
            {blocked === true ? (
                <div className="d-flex flex-column" style={{width: 90}}>
                    {clicked === false ? (
                        <>
                            <button className="btn btn-success" onClick={() => setClicked(true)}>
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-success">
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </button>
                        </>
                    )}
                    <small>Débloquer</small>
                </div>
            ) : (
                <div className="d-flex flex-column" style={{width: 90}}>
                    {clicked === false ? (
                        <>
                            <button className="btn btn-danger" onClick={() => setClicked(true)}>
                                <FontAwesomeIcon icon={faBan} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-danger">
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </button>
                        </>
                    )}
                    <small>Bloquer</small>
                </div>
            )}
        </>
    );
}

export default BlockBtn;
