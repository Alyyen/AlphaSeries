import React, { useContext, useState, useRef } from "react";
// eslint-disable-next-line
import axios from 'axios';
import AuthContext from "../../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

// Bootstrap Components
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import ListGroup from 'react-bootstrap/ListGroup';

function OptionsBtn({ id, added, url }) {

    // eslint-disable-next-line
    const { accessToken } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const deleteFromShows = () => {

        let params = {
            client_id: process.env.REACT_APP_CLIENT_ID,
            access_token: accessToken,
            id: id
        }

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
    };


    return (
        <div ref={ref}>
            <div className="d-flex flex-column">
                <button
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
                    }}
                    className="btn btn-secondary">
                    <FontAwesomeIcon icon={faEllipsis} />
                </button>
                <small>Options</small>
            </div>


            <Overlay
                show={show}
                target={target}
                placement="bottom-start"
                container={ref}
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    <ListGroup>
                        <ListGroup.Item action target="_blank" href={url}>
                            Voir sur Betaseries
                        </ListGroup.Item>
                        {added === true && (
                            <ListGroup.Item action onClick={() => deleteFromShows()}>
                                Supprimer de mes séries
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Popover>
            </Overlay>
        </div>
    );
}

export default OptionsBtn;
