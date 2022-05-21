import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddits, selectUrl, fetchSubreddits } from './subredditsSlice';
import { Subreddit } from './subreddit/Subreddit';
import './Subreddits.css'

export function Subreddits() {

    const subreddits = useSelector(selectSubreddits);
    const url = useSelector(selectUrl);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSubreddits(url))
    }, [url])

    return (
        <div className='menu_container'>
            <div className='menu'>
                <h3>Subreddit</h3>
                <ul className='subreddits'>
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