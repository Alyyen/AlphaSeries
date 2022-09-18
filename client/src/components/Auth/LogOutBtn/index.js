import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthContext from "../../../context/AuthContext";

function LogOutBtn() {
    const { getLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const logOut = () => {
        axios.get('http://localhost:4242/logout', { withCredentials: true })
            .then(async (res) => {
                await getLoggedIn();
                navigate("/", { replace: true });
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <button className="btn btn-danger" onClick={logOut}>
            Se déconnecter
        </button>
    );
}

export default LogOutBtn;
