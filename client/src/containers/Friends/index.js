import { useCallback, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from "../../context/AuthContext";
import FriendCard from '../../components/FriendCard';

function Friends() {

    const { accessToken } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [blockedFriends, setBlockedFriends] = useState([]);


    const getFriends = useCallback(() => {
        if (accessToken !== '') {
            axios.get(`https://api.betaseries.com/friends/list`,
                {
                    params: {
                        client_id: process.env.REACT_APP_CLIENT_ID,
                        access_token: accessToken,
                    }
                })
                .then((res) => {
                    res.data.users.forEach((el) => {
                        axios.get('https://api.betaseries.com/members/infos',
                            {
                                params: {
                                    client_id: process.env.REACT_APP_CLIENT_ID,
                                    id: el.id
                                }
                            })
                            .then((result) => {
                                setFriends((arr) => [...arr, result.data.member]);
                            })
                    })
                })
            // Fetch Blocked friends
            axios.get(`https://api.betaseries.com/friends/list`,
                {
                    params: {
                        client_id: process.env.REACT_APP_CLIENT_ID,
                        access_token: accessToken,
                        blocked: true
                    }
                })
                .then((res) => {
                    if (res.data.users.length > 0) {
                        res.data.users.forEach((el) => {
                            axios.get('https://api.betaseries.com/members/infos',
                                {
                                    params: {
                                        client_id: process.env.REACT_APP_CLIENT_ID,
                                        id: el.id
                                    }
                                })
                                .then((result) => {
                                    setBlockedFriends((arr) => [...arr, result.data.member]);
                                })
                        })
                    }
                    else {
                        setFriends('');
                    }
                })
        }
    }, [accessToken])

    useEffect(() => {
        getFriends()
    }, [getFriends])

    return (
        <div>
            {friends.length > 0 ? (
                <>
                    <h5 className='text-center'>Vos amis</h5>
                    <div className='d-flex flex-wrap justify-content-center'>
                        {friends.map((el, i) => (
                            <div key={el.id}>
                                <FriendCard friend={el} friends={true} blocked={false} />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    {friends === '' ? (
                        <div className="text-center mt-5">
                            <h5>Aucun Résultat</h5>
                        </div>
                    ) : (
                        <div className="text-center mt-3">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                </>
            )}
            {blockedFriends.length > 0 && (
                <>
                    <h5 className='text-center'>Membres Bloqués</h5>
                    <div className='d-flex flex-wrap justify-content-center'>
                        {blockedFriends.map((el, i) => (
                            <div key={el.id}>
                                <FriendCard friend={el} friends={true} blocked={true}/>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Friends;
