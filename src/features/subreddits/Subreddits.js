import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddits, selectUrl, fetchSubreddits } from './subredditsSlice';
import { Subreddit } from './subreddit/Subreddit';

export function Subreddits() {

    const subreddits = useSelector(selectSubreddits);
    const url = useSelector(selectUrl);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSubreddits(url))
    }, [url])

    return (
        <div>
            <h3>Subreddit</h3>
            <ul>
                {subreddits.map(subreddit => {
                    return (
                        <li key={subreddit.id}><Subreddit subreddit={subreddit} /></li>
                    )
                })}
            </ul>
        </div>
    )
}