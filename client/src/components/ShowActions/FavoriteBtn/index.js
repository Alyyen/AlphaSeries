import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from 'axios';
import AuthContext from "../../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as heartOutline } from '@fortawesome/free-regular-svg-icons'

function FavoriteBtn({ id, favorited }) {

    const { accessToken } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false);

    const favoriteShow = useCallback(() => {
        if (clicked === true) {
            let params = {
                client_id: process.env.REACT_APP_CLIENT_ID,
                access_token: accessToken,
                id: id
            }
            if (favorited === true) {
                axios.delete('https://api.betaseries.com/shows/favorite',
                    {
                        params: params
                    })
                    .then((res) => {
                        alert('La série a bien été retirée des favoris.')
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
            else {
                axios.post('https://api.betaseries.com/shows/favorite', params)
                    .then((res) => {
                        alert('La série a bien été mise en favoris.')
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }, [accessToken, clicked, favorited, id])

    useEffect(() => {
        favoriteShow()
    }, [favoriteShow, clicked])

    return (
        <>
            {favorited === true ? (
                <div className="d-flex flex-column">
                    {clicked === false ? (
                        <>
                            <button className="btn btn-secondary" onClick={() => setClicked(true)}>
                                <FontAwesomeIcon icon={filledHeart} />
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
                    <small>Favoris</small>
                </div>
            ) : (
                <div className="d-flex flex-column">
                    {clicked === false ? (
                        <>
                            <button className="btn btn-secondary" onClick={() => setClicked(true)}>
                                <FontAwesomeIcon icon={heartOutline} />
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
                    <small>Favoris</small>
                </div>
            )}
        </>
    );
}

export default FavoriteBtn;
