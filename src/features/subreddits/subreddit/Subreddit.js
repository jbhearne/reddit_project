import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SubredditDescription } from './SubredditDescription';
import { setPostsUrl, setPostsPath,selectPostsPath } from '../../posts/postsSlice';
import { NavLink } from 'react-router-dom';

export function Subreddit({ subreddit }) {
    
    const [isDescription, setIsDescription] = useState(false);
    const dispatch = useDispatch();

    const handleDescriptionClick = () => {
        setIsDescription(!isDescription);
    };

    const makePath = (subreddit) => {
        const noLastSlash = subreddit.url.slice(0, subreddit.url.length - 1);
        return noLastSlash + '.json';
    };
    
    const handleUrlClick = () => {
        dispatch(setPostsPath(makePath(subreddit)));
        dispatch(setPostsUrl()); // this seems awkward to have to call an action just to combine the prefix and the path. May fix at some point.
    };

    return (
        <div>
            <div onClick={handleUrlClick}>
            <NavLink 
                to={makePath(subreddit)} ///this is postsPath before the onclick takes effect 
                key={subreddit.id}
                className="nav-link"
                > {/*I do not really want the URL to display the same path as the fetch-with the .json extension, but it is for now while i am trying to get the routes to work*/}
                {/*activeClassName="nav-link-active" //not in router version 6. If I need to style this apply atribute function: className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}*/}
            <img className='subreddit_icon' src={subreddit.icon} alt={subreddit.name + ' icon'}></img>
            </NavLink>
            </div>
            <span className="subreddit_name" onClick={handleDescriptionClick}>{subreddit.name}</span>
            {isDescription && (<SubredditDescription name={subreddit.name} description={subreddit.description} handleDescriptionClick={handleDescriptionClick} />)}
        </div>
    )
};