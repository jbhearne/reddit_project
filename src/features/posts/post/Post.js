import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


export function Post({ post }) {


    const placeMedia = () => {
        if (post.media) {
            if (post.media.embed) {
                const createMarkup = () => {
                    return {__html: post.media.embed}
                }
                return <div dangerouslySetInnerHTML={createMarkup()}></div> // when I looked this up it said this was created to remind you that it was dangerous, so I am using it to remind my self not to use it.
            } else if (post.media.video) {
                return (
                    <video controls>
                        <source src={post.media.video}></source>
                    </video>
                )
            }
        } else {
            return ''
        }
    }

    return (
        <article className='post'>
            <h3 className='title'><a href={post.url} target='_blank'>{post.title}</a></h3>
            <h4 className='author'>{post.author}</h4>
            <h5 className='date_upvotes'>{post.date + ' - Upvotes: ' + post.upvotes}</h5>
            <p>{post.text}</p>
            {post.media && <div>{placeMedia()}</div>}
            <ul>
                {post.images.map((image, i) => {
                    return (
                        <li key={`${post.id}img${i}`}><img src={image} alt={`Image for ${post.author}'s post`}></img></li>
                    )
                })}
            </ul>
        </article>
    )
}

// There may be alt text that can be pulled from reddit json, but that would require adding another property to the posts object array in postSlice
// it may also be possible that there are smaller images available on reddit to improve performance.