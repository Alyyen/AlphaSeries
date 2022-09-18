import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import AuthContext from "../../../context/AuthContext";

// Bootstrap Components
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'

function AddComment({ id, infos }) {

    const { accessToken } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState('');

    const postComment = useCallback(() => {
        if (clicked === true && comment !== '') {
            let params = {
                client_id: process.env.REACT_APP_CLIENT_ID,
                type: 'episode',
                id: id,
                text: comment,
                access_token: accessToken
            }

            axios.post('https://api.betaseries.com/comments/comment', params)
                .then((res) => {
                    alert('Votre commentaire a bien été ajouté.')
                    window.location.reload(false);
                })
                .catch((error) => {
                    alert("Une erreur est survenue.\nVotre mail est-il bien validé ?")
                })
        }
        else {
            setClicked(false);
        }
    }, [accessToken, clicked, id, comment])

    useEffect(() => {
        postComment()
    }, [postComment, clicked])

    return (
        <>
            <FontAwesomeIcon icon={faComment} onClick={() => setShowModal(true)} size="2x" color="white" />

            <Modal show={showModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{infos.show + ' - ' + infos.episode}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Ajouter un commentaire</Form.Label>
                        <Form.Group className="mb-3" controlId="ControlTextarea1">
                            <Form.Control as="textarea" rows={3} autoFocus onChange={e => setComment(e.target.value)} value={comment} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                        Annuler
                    </button>
                    {clicked === false ? (
                        <button className="btn btn-primary" onClick={() => setClicked(true)}>
                            Envoyer commentaire
                        </button>
                    ) : (
                        <button className="btn btn-primary">
                            <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddComment;
