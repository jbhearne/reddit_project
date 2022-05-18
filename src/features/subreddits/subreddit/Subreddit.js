import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SubredditDescription } from './SubredditDescription';
import { setPostsUrl, selectPostsPrefix } from '../../posts/postsSlice'

export function Subreddit({ subreddit }) {
    
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const postsPrefix = useSelector(selectPostsPrefix);

    const onMouseOverHandler = () => {
        setIsHovered(true);
    };

    const onMouseOutHandler = () => {
        setIsHovered(false);
    };

    const handleUrlClick = () => {
        const noLastSlash = subreddit.url.slice(0, subreddit.url.length - 1);
        const url = postsPrefix + noLastSlash + '.json';
        dispatch(setPostsUrl(url));
    }

    return (
        <li className='subreddit' onMouseOver={onMouseOverHandler} onMouseOut={onMouseOutHandler}>
            <a onClick={handleUrlClick}> {/*need to change this to link*/}
            <img className='subreddit_icon' src={subreddit.icon}></img>
            <p className="subreddit_name">{subreddit.name}</p>
            </a>
            {isHovered && (<SubredditDescription name={subreddit.name} description={subreddit.description} />)}
        </li>
    )
}