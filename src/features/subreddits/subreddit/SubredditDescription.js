import React from 'react';
import showdown from 'showdown';

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
        <div className='description' role="dialog" aria-labelledby="dialogTitle" aria-describedby="dialogDesc">
            <div className='close' onClick={handleDescriptionClick} role='button'>×</div>
            <h3 id="dialogTitle">{name}</h3>
            <div id="dialogDesc">{placeDescription()}</div>
        </div>
    )
}