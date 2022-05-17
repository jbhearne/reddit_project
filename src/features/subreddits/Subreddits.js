import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddits } from './subredditsSlice';
import { Subreddit } from './subreddit/Subreddit';

export function Subreddits() {

    const subreddits = useSelector(selectSubreddits)

    return (
        <div>
            <h3>Subreddit</h3>
            <ul>
                {subreddits.map(subreddit => {
                    return (
                        <Subreddit subreddit={subreddit} />
                    )
                })}
            </ul>
        </div>
    )
}