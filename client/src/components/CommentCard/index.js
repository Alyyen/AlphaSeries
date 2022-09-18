import React from "react";

function CommentCard({ comment }) {

    return (
        <>
            <div className="d-flex flex-column text-justify me-3 py-2 ">
                <div className="mb-3 p-1 border border-dark rounded-1" style={{ width: 250, height: 100, overflowY: 'scroll' }}>
                    <p>{comment.text}</p>
                </div>
                <div>
                    <img src={comment.avatar !== null ? comment.avatar : "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"} alt={comment.login + '_avatar_' + comment.id} style={{ width: 40, height: 40 }} />
                    <small className="ms-3">{comment.login}</small>
                </div>
            </div>
        </>
    );
}

export default CommentCard;