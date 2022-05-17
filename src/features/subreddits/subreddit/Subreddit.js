import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SubredditDescription } from './SubredditDescription';

export function Subreddit({ subreddit }) {
    
    const {isHovered, setIsHovered} = useState(false)

    const onMouseOverHandler = () => {
        setIsHovered(true)
    };

    const onMouseOutHandler = () => {
        setIsHovered(false)
    };

    return (
        <li className='subreddit' onMouseOver={onMouseOverHandler} onMouseOut={onMouseOutHandler}>
            <a src={subreddit.url}>
            <img className='subreddit_icon' src={subreddit.icon}></img>
            <p className="subreddit_name">{subreddit.name}</p>
            </a>
            {isHovered && (<SubredditDescription name={subreddit.name} description={subreddit.description} />)}
        </li>
    )
}