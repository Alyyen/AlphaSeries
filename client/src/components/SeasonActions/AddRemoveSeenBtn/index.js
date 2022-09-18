import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import AuthContext from "../../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faSquare } from '@fortawesome/free-regular-svg-icons'

function AddRemoveSeenBtn({ id, season, seen }) {

    const { accessToken } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false);

    const addRemoveSeen = useCallback(() => {
        if (clicked === true) {
            let params = {
                client_id: process.env.REACT_APP_CLIENT_ID,
                access_token: accessToken,
                id: id,
                season: season
            }
            if (seen === true) {
                axios.delete('https://api.betaseries.com/seasons/watched',
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
            else {
                axios.post('https://api.betaseries.com/seasons/watched', params)
                    .then((res) => {
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }, [accessToken, seen, clicked, id, season])

    useEffect(() => {
        addRemoveSeen()
    }, [addRemoveSeen, clicked])

    return (
        <>
            {seen === true ? (
                <>
                    {clicked === false ? (
                        <FontAwesomeIcon icon={faSquareCheck} onClick={() => setClicked(true)} size="2x" color="white" />
                    ) : (
                        <div className="spinner-border text-light" style={{width:'1.75rem', height:'1.75rem'}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {clicked === false ? (
                        <FontAwesomeIcon icon={faSquare} onClick={() => setClicked(true)} size="2x" color="white" />
                    ) : (
                        <div className="spinner-border text-light" style={{width:'1.75rem', height:'1.75rem'}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default AddRemoveSeenBtn;
