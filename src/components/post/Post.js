import React from 'react'
import './post.css'
import Avatar from '@material-ui/core/Avatar'
import Comments from '../comment/Comments'

function Post({ postId, username, caption, imgUrl, user}) {
    return (
        <div className='post'>
            {/* header -> avatar + username */}
            <div className="post__header">
                <Avatar
                    className="header__avatar"
                    alt={username}
                    src = ''
                />

                <h2 className = 'header__username'>{username}</h2>
            </div>
            {/* image */}

            <img
                className = 'post__img'
                src={imgUrl}
                alt="imagen post"
            />

            {/* username + caption */}

            <h4 className='post__text'><strong>{username}:</strong> {caption}</h4>

            {/* comments */}

            <Comments 
                postId = {postId} 
                user = {user}
            />

        </div>
    )
}

export default Post
