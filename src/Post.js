import React, { useState, useEffect } from 'react';
import "./Post.css"
import { db } from './firebase';
import firebase from 'firebase';
import IconButton from '@material-ui/core/IconButton';
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ReactDOM from 'react-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';




function Post({ postId, user, caption, username, imageUrl , likes}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsubscribe();
        };

    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }



    

     
      

    return (
        <div className="post">
            <div className="post_avatar_info">

                <AccountCircleRoundedIcon className="avatar" fontSize="large" />

                <div className="info">
                    <h3><strong>{username}</strong></h3>
                </div>
            </div>

            {/* Posts */}
            <img className="post_import" src={imageUrl}></img>
<div className="likes_done">
            {liked ? (<FavoriteIcon className="fav"  fontSize="large" onClick={(e) => setLiked(false)} />
            ) : (<FavoriteBorderIcon className="borderfav" fontSize="large" onClick={(e) => setLiked(true)} />
            )}            
            <p className="like_count">{liked ? likes + 1 : likes}</p>
            </div>
            

            


            <h4 className="post_caption"><strong>{username}  </strong> : {caption}</h4>

            <div className="post_comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> - {comment.text}
                    </p>
                ))}
            </div>
            {user && (
                <form className="post_commentBox">
                    <input className="post_input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} />

                    <button
                        className="post_button"
                        type="submit"
                        disabled={!comment}
                        onClick={postComment} >Post</button>
                </form>
            )}

        </div>
    )
}

export default Post
