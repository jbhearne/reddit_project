import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Post } from './post/Post'
import postsSlice, { selectPosts, fetchPosts, selectPostsUrl, setPostsPath, setPostsUrl } from './postsSlice';
import './Posts.css'
import { Route, useParams, useSearchParams } from 'react-router-dom';

export function Posts() {

    const posts = useSelector(selectPosts);
    const url = useSelector(selectPostsUrl);
    const dispatch = useDispatch();
    const { postsSelected } = useParams();
    const [searchParams, setSearchParams]  = useSearchParams();
    //let pathName = postsSelected ? postsSelected : 'popular.json'
    //console.log('hi' + postsSelected)
    let pathName = '';
    //console.log('po' + searchParams.get('q'))
    if (postsSelected) {
        pathName = '/r/' + postsSelected;
    } else if (searchParams.get('q')) {
        pathName = '/search.json?q=' + searchParams.get('q');
    } else {
        pathName = '/r/popular.json'
    }


    useEffect(() => {
        dispatch(setPostsPath(pathName))
        dispatch(setPostsUrl())
        //console.log('ho' + url)
        //dispatch(fetchPosts(url))
    }, [pathName])

    useEffect(() => {
        /*const d = (thunk) => {
            return thunk;
        }
        const g = () => {
            return {
                posts: {
                    prefix: 'https://www.reddit.com',
                    path: '',
                    url: '',
                    posts: [],
                    isLoading: false,
                    hasError: false
                }
            }
        }
        const what = d(fetchPosts(url))
        const huh = what(d, g)
        console.log(what)
        console.log(huh)*/
        //const initPromise = fetchPosts(url);
        //console.log(initPromise(d, g))
        dispatch(fetchPosts(url))
    }, [url])
    

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