import React, { useState } from 'react';
import showdown from 'showdown';
import { useSelector, useDispatch } from 'react-redux';

export function SubredditDescription({ name, description, handleDescriptionClick }) {

    const placeDescription = () => {
        const createMarkup = () => {
            const converter = new showdown.Converter();
            const html = converter.makeHtml(description)
            return {__html: html}
        }
        return <div dangerouslySetInnerHTML={createMarkup()}></div> // when I looked this up it said this was created to remind you that it was dangerous, so I am using it to remind my self not to use it.
    }

    return (
        <div className='description'>
            <div className='close' onClick={handleDescriptionClick}>×</div>
            <h3>{name}</h3>
            <div>{placeDescription()}</div>
        </div>
    )
}