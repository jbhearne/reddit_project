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

    const makePath = (subreddit) => {
        const noLastSlash = subreddit.url.slice(0, subreddit.url.length - 1);
        return noLastSlash + '.json'
    }
    
    const handleUrlClick = () => {
        //const noLastSlash = subreddit.url.slice(0, subreddit.url.length - 1); // changed this to a separate function so it can be used in NavLink below.
        //const url = postsPrefix + noLastSlash + '.json'; // changed to add path to slice
        dispatch(setPostsPath(makePath(subreddit)))
        dispatch(setPostsUrl()); // this seems awkward to have to call an action just to combine the prefix and the path. May fix at some point.
    }

    return (
        <div>
            <div onClick={handleUrlClick}>
            <NavLink 
                
                to={makePath(subreddit)} ///this is postsPath before the onclick takes effect 
                key={subreddit.id}
                className="nav-link"
                activeClassName="nav-link-active"
                
                > {/*I do not really want the URL to diplay the same path as the fetch, but it is for now while i am trying to get the routes to work*/}   
            <img className='subreddit_icon' src={subreddit.icon} ></img>
            </NavLink>
            </div>
            <span className="subreddit_name" onClick={handleDescriptionClick}>{subreddit.name}</span>
            {isDescription && (<SubredditDescription name={subreddit.name} description={subreddit.description} handleDescriptionClick={handleDescriptionClick} />)}
        </div>
    )
}