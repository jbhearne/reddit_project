import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Post } from './post/Post';
import { selectPosts, fetchPosts, selectPostsUrl, setPostsPath, setPostsUrl } from './postsSlice';
import './Posts.css';
import { useParams, useSearchParams } from 'react-router-dom';

export function Posts() {

    const posts = useSelector(selectPosts);
    const url = useSelector(selectPostsUrl);
    const dispatch = useDispatch();
    const { postsSelected } = useParams();
    const [searchParams, setSearchParams]  = useSearchParams();
    
    let pathName = '';
    if (postsSelected) {
        pathName = '/r/' + postsSelected;  //if there is a value passed from the route in App.js constructs a new path to fetch posts from reddit
    } else if (searchParams.get('q')) {
        pathName = '/search.json?q=' + searchParams.get('q'); // if there is a query, constructs a path to fetch from
    } else {
        pathName = '/r/popular.json'; //if no params are passed from the route then deafault to this.
    };

    useEffect(() => {
        dispatch(setPostsPath(pathName)); //send the newly constucted path to the store
        dispatch(setPostsUrl()); //updates the full URL to include the new path
    }, [pathName]);

    useEffect(() => {
        dispatch(fetchPosts(url)); // get new posts everytime the URL changes.
    }, [url]);
    
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
    );
};