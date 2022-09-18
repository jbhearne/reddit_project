import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddits, selectSubredditsUrl, fetchSubreddits } from './subredditsSlice';
import { Subreddit } from './subreddit/Subreddit';
import './Subreddits.css'

export function Subreddits() {

    const subreddits = useSelector(selectSubreddits);
    const url = useSelector(selectSubredditsUrl);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSubreddits(url))
    }, [url])

    return (
        <div className='menu_container'>
            <div className='menu'>
                <h2>Subreddit</h2> {/*changed to h2 to better align the role*/}
                <ul className='subreddits' role='menu'>
                    {subreddits.map(subreddit => {
                        return (
                            <li className='subreddit' key={subreddit.id}><Subreddit subreddit={subreddit} /></li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}