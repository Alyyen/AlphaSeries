import Card from "react-bootstrap/Card";
import React from "react";
import {Link} from "react-router-dom";
import AddToWatchedList from "../AddToWatchedList";

import "./style.css";

function ShowsCard({shows}) {
    return (
        <Card className="card">
            <AddToWatchedList item={shows}/>
            <Link reloadDocument to={"/show/" + shows.id}>
                <Card.Img
                    variant="top"
                    className="card_img rounded-top"
                    style={{height: '100px', width: '250px', objectFit: 'cover'}}
                    src={shows.images.show}
                    alt={shows.images.show}
                />
                <Card.Body className="card_content p-4 bg-dark rounded-bottom">
                    <Card.Title className="text-white text-decoration-none">{shows.title.length > 20 ? shows.title.substring(0, 17) + "..." : shows.title}
                    </Card.Title>
                </Card.Body>
            </Link>
        </Card>
    );
}

export default ShowsCard;