import React from "react";
import AddRemoveSeenBtn from "../SeasonActions/AddRemoveSeenBtn";

function SeasonCard({ showId, season, selectedSeason }) {

    return (
        <>
            {season.number === selectedSeason ? (
                <>
                    <div className="position-relative border border-dark">
                        <div className="position-absolute p-2 hover" onClick={(e) => e.preventDefault()} style={{ right: 0 }}>
                            <AddRemoveSeenBtn id={showId} season={season.number} seen={season.seen} />
                        </div>
                        <img src={season.image !== null ? (season.image) : ('http://www.luzzio.fr/img/image-not-found.png')} style={{ width: 160 }} alt={'season ' + season.number} />
                    </div>
                    <div className="d-flex flex-column">
                        <small className="mt-2">Saison {season.number}</small>
                        <small>{season.episodes} épisodes</small>
                    </div>
                </>
            ) : (
                <>
                    <div className="position-relative my-auto">
                        <div className="position-absolute p-2 hover" onClick={(e) => e.preventDefault()} style={{ right: 0 }}>
                            <AddRemoveSeenBtn id={showId} season={season.number} seen={season.seen} />
                        </div>
                        <img src={season.image} style={{ width: 150 }} alt={'season ' + season.number} />
                    </div>
                    <div className="d-flex flex-column">
                        <small className="mt-2">Saison {season.number}</small>
                        <small>{season.episodes} épisodes</small>
                    </div>
                </>
            )}
        </>
    );
}

export default SeasonCard;