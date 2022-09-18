import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import AuthContext from "../../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

function ArchiveBtn({ id, archived }) {

    const { accessToken } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false);

    const archiveShow = useCallback(() => {
        if (clicked === true) {
            let params = {
                client_id: process.env.REACT_APP_CLIENT_ID,
                access_token: accessToken,
                id: id
            }
            if (archived === true) {
                axios.delete('https://api.betaseries.com/shows/archive',
                    {
                        params: params
                    })
                    .then((res) => {
                        alert('La série a bien été désarchivée.')
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
            else {
                axios.post('https://api.betaseries.com/shows/archive', params)
                    .then((res) => {
                        alert('La série a bien été archivée.')
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }, [accessToken, archived, clicked, id])

    useEffect(() => {
        archiveShow()
    }, [archiveShow, clicked])

    return (
        <>
            {archived === true ? (
                <div className="d-flex flex-column">
                    {clicked === false ? (
                        <>
                            <button className="btn btn-secondary" onClick={() => setClicked(true)}>
                                <FontAwesomeIcon icon={faArrowUp} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-secondary">
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </button>
                        </>
                    )}
                    <small>Désarchiver</small>
                </div>
            ) : (
                <div className="d-flex flex-column">
                    {clicked === false ? (
                        <>
                            <button className="btn btn-secondary" onClick={() => setClicked(true)}>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-secondary">
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </button>
                        </>
                    )}
                    <small>Archiver</small>
                </div>
            )}
        </>
    );
}

export default ArchiveBtn;
