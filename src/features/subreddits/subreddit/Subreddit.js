import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SubredditDescription } from './SubredditDescription';
import { setPostsUrl, selectPostsPrefix, setPostsPath,selectPostsPath } from '../../posts/postsSlice'
import { NavLink } from 'react-router-dom';

export function Subreddit({ subreddit }) {
    
    //const [isHovered, setIsHovered] = useState(false);
    const [isDescription, setIsDescription] = useState(false);
    const dispatch = useDispatch();
    const postsPath = useSelector(selectPostsPath)
    //const postsPrefix = useSelector(selectPostsPrefix);  // //When I added path as a state I changed the reducer so that combining the prefix and path is done in postsSlice.

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
        //const url = postsPrefix + noLastSlash + '.json'; // changed to add path to slice
        dispatch(setPostsPath(noLastSlash + '.json'))
        dispatch(setPostsUrl()); // this seems awkward to have to call an action just to combine the prefix and the path. May fix at some point.
    }

    return (
        <div>
            <NavLink 
                to={postsPath}
                key={subreddit.id}
                className="nav-link"
                activeClassName="nav-link-active"
                > {/*I do not really want the URL to diplay the same path as the fetch, but it is for now while i am trying to get the routes to work*/}   
            <img className='subreddit_icon' src={subreddit.icon} onClick={handleUrlClick}></img>
            </NavLink>
            <span className="subreddit_name" onClick={handleDescriptionClick}>{subreddit.name}</span>
            {isDescription && (<SubredditDescription name={subreddit.name} description={subreddit.description} handleDescriptionClick={handleDescriptionClick} />)}
        </div>
    )
}