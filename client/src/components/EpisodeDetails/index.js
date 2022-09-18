import React, { useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom';
import axios from "axios";

// Components
import OptionsBtn from "../ShowActions/OptionsBtn";
import AddComment from "../EpisodeActions/AddComment";
import AddRemoveSeenBtn from "../EpisodeActions/AddRemoveSeenBtn";
import CommentCard from "../CommentCard";

let Buffer = require('buffer/').Buffer

function EpisodeDetails({ episode, accessToken }) {

    const [img, setImg] = useState('');
    const [nextEpisode, setNextEpisode] = useState(0);
    const [comments, setComments] = useState([]);

    const fetchImg = () => {
        axios.get(`https://api.betaseries.com/pictures/episodes`,
            {
                responseType: 'arraybuffer',
                params: {
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    id: episode.id,
                    width: 250,
                    height: 141
                }
            })
            .then((res) => {
                setImg('data:image/jpeg;base64,' + Buffer.from(res.data, 'binary').toString('base64'))
            })
            .catch((err) => {
                console.log(err);
                setImg('http://www.luzzio.fr/img/image-not-found.png')
            })
    }

    const fetchShow = () => {
        if (accessToken !== '') {
            axios.get(`https://api.betaseries.com/shows/display`,
                {
                    params: {
                        client_id: process.env.REACT_APP_CLIENT_ID,
                        access_token: accessToken,
                        id: episode.show.id
                    }
                })
                .then((res) => {
                    let episode = res.data.show.user.next.code;
                    episode = episode.slice(5)
                    setNextEpisode(parseInt(episode))
                })
        }
    }

    const fetchComments = () => {
        if (accessToken !== '') {
            axios.get(`https://api.betaseries.com/comments/comments`,
                {
                    params: {
                        client_id: process.env.REACT_APP_CLIENT_ID,
                        type: 'episode',
                        id: episode.id,
                        nbpp: episode.comments
                    }
                })
                .then((res) => {
                    setComments(res.data.comments)
                })
        }
    }

    useEffect(() => {
        fetchImg()
        fetchShow()
        fetchComments()
        // eslint-disable-next-line
    }, [])

    if (img) {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-3 text-end" style={{ width: '20%' }}>
                        <h5>Date de sortie</h5>
                        <p>{episode.date}</p>
                        <h5>Numéro</h5>
                        <p>{episode.code}</p>

                    </div>
                    <div className="col mx-5" style={{ width: '250px' }}>
                        <Link reloadDocument to={"/show/" + episode.show.id}>{episode.show.title}</Link>
                        <p>Saison {episode.season}, Épisode {episode.episode}</p>
                        <h3>{episode.title}</h3>
                        <Rating initialValue={episode.note.mean} readonly={true} allowHalfIcon={true} />
                        <p>{episode.description}</p>
                        <div className="d-flex">
                            <div className="d-flex flex-column align-items-center"  >
                                <button className="btn btn-secondary" style={{ width: 49, height: 38, paddingTop: 2, paddingLeft: 9.2 }}>
                                    <AddRemoveSeenBtn id={episode.id} seen={episode.user.seen} nextEpisode={nextEpisode}
                                        selectedSeason={episode.season} episode={episode.episode}
                                        season={episode.season} />
                                </button>
                                <small>Vu</small>
                            </div>
                            &nbsp;&nbsp;&nbsp;
                            <OptionsBtn id={episode.id} added={false} url={episode.resource_url} />
                        </div>
                        <hr />
                        <div className="d-flex mb-3">
                            <label className="align-self-center">Ajouter un commentaire : </label>
                            <div className=" px-2 py-1 p-2 m-1 hover" style={{ cursor: 'pointer' }} onClick={(e) => e.preventDefault()}>
                                <AddComment id={episode.id} infos={{ show: episode.show.title, episode: episode.code }} />
                            </div>
                        </div>

                    </div>
                    <div className="col-3">
                        <img src={img} alt='' style={{ width: '250px', height: '141px' }} />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="d-flex">
                        <p>{episode.comments > 1 ? (episode.comments + " commentaires") : (episode.comments + " commentaire")}</p>
                    </div>
                    <div className="d-flex" style={{ overflowX: 'scroll' }}>
                        {comments.map((el) => (
                            <div key={el.id}>
                                <CommentCard comment={el} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default EpisodeDetails;