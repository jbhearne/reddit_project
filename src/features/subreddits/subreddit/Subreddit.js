import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SubredditDescription } from './SubredditDescription';
import { setPostsUrl, selectPostsPrefix } from '../../posts/postsSlice'
import { NavLink } from 'react-router-dom';

export function Subreddit({ subreddit }) {
    
    //const [isHovered, setIsHovered] = useState(false);
    const [isDescription, setIsDescription] = useState(false);
    const dispatch = useDispatch();
    const postsPrefix = useSelector(selectPostsPrefix);

    /*const onMouseOverHandler = () => {
        setIsHovered(true);
    };

    const onMouseOutHandler = () => {
        setIsHovered(false);
    };*/

    const handleDescriptionClick = () => {
        setIsDescription(!isDescription)
    }

    const handleUrlClick = () => {
        const noLastSlash = subreddit.url.slice(0, subreddit.url.length - 1);
        const url = postsPrefix + noLastSlash + '.json';
        dispatch(setPostsUrl(url));
    }

    return (
        <div>
            <NavLink 
                to={`/${subreddit.name}`}
                key={subreddit.id}
                className="nav-link"
                activeClassName="nav-link-active"
                > {/*need to change this to link*/}   
            <img className='subreddit_icon' src={subreddit.icon} onClick={handleUrlClick}></img>
            </NavLink>
            <span className="subreddit_name" onClick={handleDescriptionClick}>{subreddit.name}</span>
            {isDescription && (<SubredditDescription name={subreddit.name} description={subreddit.description} handleDescriptionClick={handleDescriptionClick} />)}
        </div>
    )
}