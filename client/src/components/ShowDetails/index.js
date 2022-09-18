import React, { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from 'react-simple-star-rating'

// Components
import ArchiveBtn from "../ShowActions/ArchiveBtn";
import FavoriteBtn from "../ShowActions/FavoriteBtn";
import OptionsBtn from "../ShowActions/OptionsBtn";
import SeasonCard from "../SeasonCard";
import EpisodeCard from "../EpisodeCard";
import AddToProfileBtn from "../ShowActions/AddToProfileBtn";

function ShowDetails({ show, accessToken }) {

    const [genres, setGenres] = useState('');
    const [seasons, setSeasons] = useState('');
    const [episodes, setEpisodes] = useState('');
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [nextEpisode, setNextEpisode] = useState(0);
    const [showNotSeen, setShowNotSeen] = useState(false);

    const fetchSeasons = () => {
        axios.get(`https://api.betaseries.com/shows/seasons`,
            {
                params: {
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    access_token: accessToken,
                    id: show.id
                }
            })
            .then((res) => {
                setSeasons(res.data.seasons)
            })
    }

    const fetchEpisodes = () => {
        axios.get(`https://api.betaseries.com/shows/episodes`,
            {
                params: {
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    access_token: accessToken,
                    id: show.id
                }
            })
            .then((res) => {
                setEpisodes(res.data.episodes)
            })
    }

    useEffect(() => {
        let genresStr = '';
        Object.keys(show.genres).forEach(el => {
            genresStr += el + ', '
        });
        genresStr = genresStr.substring(0, genresStr.length - 2);
        setGenres(genresStr);
        let season = show.user.last;
        season = season.substring(0, season.length - 3);
        season = season.slice(2)
        if (parseInt(season) !== 0 && parseInt(season) !== 1) {
            setSelectedSeason(parseInt(season));
        }
        let episode = show.user.next.code;
        episode = episode.slice(5)
        setNextEpisode(parseInt(episode))
        fetchSeasons()
        fetchEpisodes()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-3 text-end" style={{ width: '20%' }}>
                    <h5>Pays</h5>
                    <p>{show.country}</p>
                    <h5>Genre</h5>
                    <p>{genres}</p>
                    <h5>Durée d'un épisode</h5>
                    <p>{show.length} minutes</p>
                    <h5>Nombre de saison</h5>
                    <p>{show.seasons}</p>
                    <h5>Nombre d'épisodes</h5>
                    <p>{show.episodes}</p>
                </div>
                <div className="col mx-5" style={{ width: '250px' }}>
                    <h3>{show.title}</h3>
                    <Rating initialValue={show.notes.mean} readonly={true} allowHalfIcon={true} />
                    <p>{show.description}</p>
                    {show.user.next.id !== null || show.user.status > 0 ? (
                        <div className="d-flex">
                            <ArchiveBtn id={show.id} archived={show.user.archived} />
                            &nbsp;&nbsp;&nbsp;
                            <FavoriteBtn id={show.id} favorited={show.user.favorited} />
                            &nbsp;&nbsp;&nbsp;
                            <OptionsBtn id={show.id} added={true} url={show.resource_url} />
                        </div>
                    ) : (
                        <div className="d-flex">
                            <AddToProfileBtn id={show.id} />
                            &nbsp;&nbsp;&nbsp;
                            <OptionsBtn id={show.id} added={false} url={show.resource_url} />
                        </div>
                    )}
                </div>
                <div className="col-3">
                    <img src={show.images.poster !== null ? (show.images.poster) : ('http://www.luzzio.fr/img/image-not-found.png')} alt='' style={{ width: '300px' }} />
                </div>
            </div>
            {seasons !== '' && (
                <div className="row my-3">
                    <h5 className="mb-3">Saisons ({seasons.length})</h5>
                    <div className="d-flex">
                        {seasons.map((el, i) => (
                            <div key={el.number + i} className='me-5 d-flex flex-column text-center justify-content-between' style={{ cursor: 'pointer' }} onClick={() => setSelectedSeason(el.number)}>
                                <SeasonCard showId={show.id} season={el} selectedSeason={selectedSeason} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {episodes !== '' && seasons !== '' && (
                <div className="row mb-5">
                    <div className="d-flex align-items-center my-4">
                        <h5 className="m-0 me-5">Episodes ({seasons.find(key => key.number === selectedSeason).episodes})</h5>
                        <div className="d-flex align-items-center">
                            <label>Montrer uniquement les episodes non vus : &nbsp;</label>
                            <input type="checkbox" name="showNotSeen" onChange={e => setShowNotSeen(current => !current)} value={showNotSeen} />
                        </div>
                    </div>
                    <div className="d-flex" style={{ overflowX: 'scroll' }}>
                        {episodes.map((el) => (
                            el.season === selectedSeason && showNotSeen === false ? (
                                <div key={el.id}>
                                    <EpisodeCard episodeId={el.id} episode={el} nextEpisode={nextEpisode} selectedSeason={selectedSeason} />
                                </div>
                            ) : (
                                el.season === selectedSeason && showNotSeen === true && el.user.seen === false &&
                                <div key={el.id}>
                                    <EpisodeCard episodeId={el.id} episode={el} nextEpisode={nextEpisode} selectedSeason={selectedSeason} />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowDetails;