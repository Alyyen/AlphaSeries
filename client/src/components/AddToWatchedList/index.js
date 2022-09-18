import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function AddToWatchedList({ item }) {
    const { accessToken } = useContext(AuthContext);
    const [watched, setWatched] = useState('');

    const handleAddToWatchedList = (arg) => {
        let params = {
            client_id: process.env.REACT_APP_CLIENT_ID,
            access_token: accessToken,
            id: item.id
        }
        if (arg === false) {
            axios.delete('https://api.betaseries.com/shows/show',
                {
                    params: params
                })
                .then((res) => {
                    alert('La série a bien été retirée de votre liste.')
                    window.location.reload(false);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        else {
            axios.post('https://api.betaseries.com/shows/show', params)
                .then((res) => {
                    alert('La série a bien été ajoutée à votre liste.')
                    window.location.reload(false);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const getWatched = () => {
        if (accessToken !== '') {
            axios.get('https://api.betaseries.com/shows/member', {
                params: {
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    access_token: accessToken,
                }
            })
                .then((res) => {
                    setWatched(res.data.shows);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    useEffect(() => {
        getWatched();
        // eslint-disable-next-line
    }, [])

    if (accessToken){
    return (
        <div className='position-relative' onClick={(e) => e.preventDefault()}>
            <div className="position-absolute px-2 py-1 hover" style={{ right: 0, borderRadius: '0 .25rem 0 0' }} >
                {watched !== '' ? (
                    watched.some(e => e.id === item.id) === true ? (
                        <FontAwesomeIcon
                            style={{ fontSize: "20px" }}
                            icon={faMinus}
                            color="white"
                            onClick={() => handleAddToWatchedList(false)}
                        />
                    ) : (
                        <FontAwesomeIcon
                            style={{ fontSize: "20px" }}
                            icon={faPlus}
                            color="white"
                            onClick={() => handleAddToWatchedList(true)}
                        />
                    )
                ) : (
                    <div className="spinner-border spinner-border-sm text-light" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                )
                }
            </div>
        </div>
    ) }
}

export default AddToWatchedList;