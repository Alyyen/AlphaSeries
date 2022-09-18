import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import './style.css'

// Components
import Home from "../Home";
import NavBar from "../../components/NavBar";
import UserProfile from "../UserProfile";
import Show from "../Show";
import Episode from "../Episode";
import Friends from "../Friends";
import FindFriends from "../FindFriends";

function Router() {

    const { loggedIn } = useContext(AuthContext);

	return (
		<div id='page-container'>
			<NavBar />
            <Routes>
                <Route exact path="/" element={<Home />} />
				<Route path="/show/:id" element={<Show />} />
				<Route path="/episode/:id" element={<Episode />} />
				{loggedIn === true && (
					<>
						<Route exact path="/profile" element={<UserProfile />} />
						<Route path="/friends" element={<Friends />} />
						<Route path="/add-friends" element={<FindFriends />} />
					</>
				)}
			</Routes>
		</div>
	);
}

export default Router;
