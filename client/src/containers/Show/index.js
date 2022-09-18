import { useCallback, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from "../../context/AuthContext";
import ShowDetails from '../../components/ShowDetails';

function Show() {

    let { id } = useParams();
    const { accessToken } = useContext(AuthContext);
    const [show, setShow] = useState('');

    const getShow = useCallback(() => {
        if (id !== undefined && accessToken !== '') {
            axios.get(`https://api.betaseries.com/shows/display`,
                {
                    params: {
                        client_id: process.env.REACT_APP_CLIENT_ID,
                        access_token: accessToken,
                        id: id
                    }
                })
                .then((res) => {
                    setShow(res.data.show)
                })
        }
    }, [id, accessToken])

    useEffect(() => {
        getShow()
    }, [getShow])

    return (
        <div>
            {show !== '' ? (
                <ShowDetails show={show} accessToken={accessToken} />
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

export default Show;
