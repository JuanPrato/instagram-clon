import React from 'react'
import Post from '../post/Post'
import './main.css'

function Main({ posts, user }) {

    return (
        <div className='main'>
            {/* POST */}
            <div className="main__posts">
            {
                posts.map(({ id, post }) => (
                <Post 
                    key = {id}
                    postId = {id}
                    username = {post.username} 
                    caption = {post.caption} 
                    imgUrl = {post.imgUrl}
                    user = {user}
                />
                ))
            }
            </div>
        </div>
    )
}

export default Main