import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Post } from './post/Post'
import { selectPosts } from './postsSlice';

export function Posts() {

    const posts = useSelector(selectPosts)

    return (
        {posts.map(post => {
            return (
                <Post post={post} />
            )
        })}
    )
}