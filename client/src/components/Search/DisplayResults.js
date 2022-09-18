import React from 'react';
import {Link} from 'react-router-dom';
import Card from "react-bootstrap/Card";
import AddToWatchedList from "../AddToWatchedList";

export default function DisplayResults(props) {
    const display = (props) => {
        const {results} = props;

        if (Object.keys(results).length > 0) {
            return (
                results.map((data) => {
                    return (
                    <Card className="card" key={data.id}>
                        <AddToWatchedList item={data} />
                        <Link reloadDocument to={"/show/" + data.id}>
                            <Card.Body className="card_content p-2 bg-dark rounded">
                                <Card.Title className="text-white">{data.title.length > 20 ? data.title.substring(0, 17) + "..." : data.title}
                                </Card.Title>
                            </Card.Body>
                        </Link>
                    </Card>
                    )
                })
            )
        } else {
            return (
                <h3>Chargement...</h3>
            )
        }
    }

    return (
        <>
            {display(props)}
        </>
    )
}