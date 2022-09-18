import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import AuthContext from "../../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faSquare } from '@fortawesome/free-regular-svg-icons'

function AddRemoveSeenBtn({ id, seen, nextEpisode, selectedSeason, episode, season }) {

    const { accessToken } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false);

    const addRemoveSeen = useCallback(() => {
        if (clicked === true) {
            let params = {
                client_id: process.env.REACT_APP_CLIENT_ID,
                access_token: accessToken,
                bulk: false,
                id: id
            }
            if (seen === true) {
                axios.delete('https://api.betaseries.com/episodes/watched',
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
                if(episode > nextEpisode && season >= selectedSeason){
                    let confirm = window.confirm('Voulez-vous noter comme vu les épisodes précédents à celui-ci ?')
                    if(confirm){
                        params.bulk = true;
                    }
                }
                axios.post('https://api.betaseries.com/episodes/watched', params)
                    .then((res) => {
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }, [accessToken, seen, clicked, id, nextEpisode, episode, season, selectedSeason])

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
