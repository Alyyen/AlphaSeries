import { useCallback, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from "../../context/AuthContext";
import EpisodeDetails from "../../components/EpisodeDetails";

function Episode() {

    let { id } = useParams();
    const { accessToken } = useContext(AuthContext);
    const [data, setData] = useState('');

    const getData = useCallback(() => {
        if (id !== undefined && accessToken !== '') {
            axios.get(`https://api.betaseries.com/episodes/display`,
                {
                    params: {
                        client_id: process.env.REACT_APP_CLIENT_ID,
                        access_token: accessToken,
                        id: id
                    }
                })
                .then((res) => {
                    setData(res.data.episode);
                })
        }
    }, [id, accessToken])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div>
            {data !== '' ? (
                <EpisodeDetails episode={data} accessToken={accessToken} />
            ) : (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Episode;