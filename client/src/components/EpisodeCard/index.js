import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Components
import AddRemoveSeenBtn from '../EpisodeActions/AddRemoveSeenBtn'
import AddComment from "../EpisodeActions/AddComment";

let Buffer = require('buffer/').Buffer

function EpisodeCard({ episodeId, episode, nextEpisode, selectedSeason }) {

    const [episodeImg, setEpisodeImg] = useState('')

    const fetchEpisodeDetails = useCallback(() => {
        axios.get(`https://api.betaseries.com/pictures/episodes`,
            {
                responseType: 'arraybuffer',
                params: {
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    id: episodeId,
                    width: 250,
                    height: 141
                }
            })
            .then((res) => {
                setEpisodeImg('data:image/jpeg;base64,' + Buffer.from(res.data, 'binary').toString('base64'))
            })
            .catch((err) => {
                setEpisodeImg('http://www.luzzio.fr/img/image-not-found.png')
            })
    }, [episodeId])

    useEffect(() => {
        fetchEpisodeDetails()
    }, [fetchEpisodeDetails])

    return (
        <>
            <Link reloadDocument to={"/episode/" + episodeId} style={{ textDecoration: 'none', color: 'black' }}>
                {episodeImg !== '' && (
                    <div className="d-flex flex-column text-center me-3">
                        <div className="position-relative">
                            <div className="position-absolute px-2 py-1 hover" onClick={(e) => e.preventDefault()}>
                                <AddComment id={episode.id} infos={{show: episode.show.title, episode: episode.code}} />
                            </div>
                            <div className="position-absolute px-2 py-1 hover" onClick={(e) => e.preventDefault()} style={{ right: 0 }}>
                                <AddRemoveSeenBtn id={episode.id} seen={episode.user.seen} nextEpisode={nextEpisode} selectedSeason={selectedSeason} episode={episode.episode} season={episode.season} />
                            </div>
                            <img src={episodeImg} alt={episode.title + '_illustration'} style={{width:250, height: 141}} />
                        </div>
                        <p className="mt-2">{episode.code + '-' + episode.title}</p>
                        <small>{episode.date}</small>
                    </div>
                )}
            </Link>
        </>
    );
}

export default EpisodeCard;