import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Post } from './post/Post'
import postsSlice, { selectPosts, fetchPosts, selectPostsUrl, setPostsPath, setPostsUrl } from './postsSlice';
import './Posts.css'
import { Route, useParams } from 'react-router-dom';

export function Posts() {

    const posts = useSelector(selectPosts);
    const url = useSelector(selectPostsUrl);
    const dispatch = useDispatch();
    const { postsSelected } = useParams();

    useEffect(() => {
        dispatch(setPostsPath(postsSelected))
        dispatch(setPostsUrl())
        dispatch(fetchPosts(url))
    }, [postsSelected])

    return (
        <ul className='posts_container'>
            {posts.map(post => {
                return (
                    
                        <li className='post_box' key={post.id}>
                            
                                <Post post={post} />
                            </li>
                    
                )
            })}
        </ul>
    )
}