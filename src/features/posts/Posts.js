import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Post } from './post/Post'
import { selectPosts, fetchPosts, selectUrl } from './postsSlice';

export function Posts() {

    const posts = useSelector(selectPosts);
    const url = useSelector(selectUrl);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(url))
    }, [url])

    return (
        <div>
            {posts.map(post => {
                return (
                    <Post post={post} />
                )
            })}
        </div>
    )
}