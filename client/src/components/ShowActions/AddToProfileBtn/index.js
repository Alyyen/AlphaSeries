import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddToProfileBtn({ id }) {
    const { accessToken } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false);

    const addToProfile = useCallback(() => {
        if (clicked === true) {
            let params = {
                client_id: process.env.REACT_APP_CLIENT_ID,
                access_token: accessToken,
                id: id
            }

            axios.post('https://api.betaseries.com/shows/show', params)
                .then((res) => {
                    alert('La série a bien été ajoutée à votre liste.')
                    window.location.reload(false);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [accessToken, clicked, id])

    useEffect(() => {
        addToProfile()
    }, [addToProfile, clicked])

    return (
        <div className="d-flex flex-column">
            {clicked === false ? (
                <>
                    <button className="btn btn-secondary" onClick={() => setClicked(true)}>
                        <FontAwesomeIcon icon={faPlus} />
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
            <small>Ajouter</small>
        </div>
    )
}

export default AddToProfileBtn;