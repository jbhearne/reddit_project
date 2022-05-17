import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export function SubredditDescription({ name, description }) {


    return (
        <div className='description'>
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    )
}