import React, { useState, useEffect } from 'react'
import './comments.css'
import { db } from '../../assets/static/firebase';
import firebase from 'firebase'

function Comments({ postId , user }) {
    
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const postComment = e => {
        e.preventDefault();
        
        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setComment('');
    }

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => (
                        {
                        id: doc.id,
                        comment: doc.data()
                        }
                    )));
                });
        }

        return () => {
            unsubscribe();
        }
    }, [postId]);
    
    const deleteComment = commentId => {
        
        db.collection('posts').doc(postId).collection('comments').doc(commentId).delete()

    }

    return (
        <div className = 'comments'>

            <div className="comments__text">
                {
                    comments.map(({ id, comment }) => (
                        <div className="comment" key = {id}>
                            <p className = 'text__comment'>
                                <strong>{comment.username}</strong> {comment.text}
                            </p>
                            {
                                user?.displayName === comment.username ? (
                                    <button className='comment__delete' onTouchEnd = {() => deleteComment(id)}>X</button>
                                ) : (
                                    <p></p>
                                )
                            }
                            
                        </div>
                    ))
                }
            </div>
            {
                user && (
                    <form className = 'comments__form'>
                        <input
                            className = 'form__input'
                            type='text'
                            placeholder = 'Escribe tu comentario...'
                            value = {comment}
                            onChange = {e => setComment(e.target.value)}
                        />
                        <button
                            className = 'form__button'
                            disabled = {!comment}
                            type = 'submit'
                            onClick = {postComment}
                        >
                            Comentar
                        </button>
                    </form>
                )
            }
            
        </div>
    )
}

export default Comments