import React from "react";
import Card from "react-bootstrap/Card";

// Components
import AddRemoveBtn from "../FriendsActions/AddRemoveBtn";
import BlockBtn from "../FriendsActions/BlockBtn";

function FriendCard({ friend, blocked, friends }) {

    return (
        <Card className="card border border-dark" style={{width: 250}}>
            <Card.Img
                variant="top"
                className="card_img rounded-top"
                style={{ height: '100px', width: '250px', objectFit: 'contain' }}
                src={friend.avatar !== null ? friend.avatar : "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"}
                alt=''
            />
            <Card.Body className="card_content p-4 bg-white border-top border-dark rounded-bottom">
                <Card.Title className="text-dark text-decoration-none mb-4">
                    {friend.login !== '' ? friend.login : "Cet utilisateur n'a pas de login"}
                </Card.Title>
                <div className="d-flex justify-content-between">
                    <AddRemoveBtn id={friend.id} friends={friends} />
                    <BlockBtn id={friend.id} blocked={blocked} />
                </div>
            </Card.Body>
        </Card>
    );
}

export default FriendCard;