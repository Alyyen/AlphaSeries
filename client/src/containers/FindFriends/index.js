import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from "../../context/AuthContext";
import FriendCard from '../../components/FriendCard';

function FindFriends() {

    const { accessToken } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [search, setSearch] = useState('');
    const [research, setResearch] = useState(false);
    const [firstPass, setFirstPass] = useState(true);
    const [blockedFriends, setBlockedFriends] = useState([]);

    const getFriends = () => {
        if (accessToken !== '') {

            let params = {
                client_id: process.env.REACT_APP_CLIENT_ID,
                access_token: accessToken
            }

            if (research === true && search !== '') {
                params.login = search
                axios.get(`https://api.betaseries.com/members/search`,
                    {
                        params: params
                    })
                    .then((res) => {
                        if (res.data.users.length > 0) {
                            setFriends([]);
                            res.data.users.forEach((el) => {
                                axios.get('https://api.betaseries.com/members/infos',
                                    {
                                        params: {
                                            client_id: process.env.REACT_APP_CLIENT_ID,
                                            id: el.id
                                        }
                                    })
                                    .then((result) => {
                                        setFriends((arr) => [...arr, { 
                                            member: result.data.member, 
                                            friends: el.in_account,
                                            blocked: blockedFriends.some(e => e.id === el.id) === true ? true : false 
                                        }]);
                                    })
                            })
                        }
                        else {
                            setFriends('');
                        }
                    })
            } else if (research === false && search === '') {
                axios.get(`https://api.betaseries.com/friends/find`,
                    {
                        params: params
                    })
                    .then((res) => {
                        if (res.data.users.length > 0) {
                            setFriends([]);
                            if (firstPass === true) {
                                setFirstPass(false)
                                axios.get(`https://api.betaseries.com/friends/list`,
                                    {
                                        params: {
                                            client_id: process.env.REACT_APP_CLIENT_ID,
                                            access_token: accessToken,
                                            blocked: true
                                        }
                                    })
                                    .then((blocked) => {
                                        setBlockedFriends(blocked.data.users)
                                        res.data.users.forEach((el) => {
                                            axios.get('https://api.betaseries.com/members/infos',
                                                {
                                                    params: {
                                                        client_id: process.env.REACT_APP_CLIENT_ID,
                                                        id: el.id
                                                    }
                                                })
                                                .then((result) => {
                                                    setFriends((arr) => [...arr, { 
                                                        member: result.data.member, 
                                                        friends: el.in_account, 
                                                        blocked: blocked.data.users.some(e => e.id === el.id) === true ? true : false
                                                    }]);
                                                })
                                        })
                                    })
                            }
                            else {
                                res.data.users.forEach((el) => {
                                    axios.get('https://api.betaseries.com/members/infos',
                                        {
                                            params: {
                                                client_id: process.env.REACT_APP_CLIENT_ID,
                                                id: el.id
                                            }
                                        })
                                        .then((result) => {
                                            setFriends((arr) => [...arr, { 
                                                member: result.data.member, 
                                                friends: el.in_account,
                                                blocked: blockedFriends.some(e => e.id === el.id) === true ? true : false 
                                            }]);
                                        })
                                })
                            }
                        }
                        else {
                            setFriends('');
                        }
                    })
            }
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (search !== '') {
            if (research === true) {
                getFriends()
            }
            else {
                setResearch(true)
            }
        }
        else {
            setResearch(false)
        }
    }

    useEffect(() => {
        getFriends()
        // eslint-disable-next-line
    }, [research])

    return (
        <div>
            <form onSubmit={(e) => handleSearch(e)} className='d-flex flex-column m-auto text-center' style={{ width: 250 }}>
                <label>Rechercher par pseudo : </label>
                <input type='text' className='my-2' onChange={(e) => setSearch(e.target.value)} value={search} />
                <input type='submit' className='btn btn-primary m-auto' value="Rechercher" style={{ width: 100 }} />
            </form>
            {friends.length > 0 ? (
                <>
                    {research === true ? (
                        <h5 className='text-center my-3'>Résultat de votre recherche</h5>
                    ) : (
                        <h5 className='text-center my-3'>Suggestions d'amis</h5>
                    )}
                    <div className='d-flex flex-wrap justify-content-center'>
                        {friends.map((el, i) => (
                            <div key={el.member.id}>
                                <FriendCard friend={el.member} friends={el.friends} blocked={el.blocked} />
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
                                <span className="visually-hidden">Chargement...</span>
                            </div>
                        </div>
                    )}
                </>

            )}
        </div>
    );
}

export default FindFriends;
