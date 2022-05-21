import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearch, setSearch } from './searchSlice';
import { selectPostsPrefix, setPostsUrl } from '../posts/postsSlice';

export function Search() {

    const search = useSelector(selectSearch);
    const postsPrefix = useSelector(selectPostsPrefix);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setSearch(e.target.value));
    }

    const handleSearchClick = (e) => {
        e.preventDefault()
        const url = postsPrefix + '/search.json?q=' + search;  //need to use .json extension for api to work
        dispatch(setPostsUrl(url));
        dispatch(setSearch(''))
    }


    return (
        <form className='search' onSubmit={handleSearchClick}>  {/*onSubmit goes on <form> not <button> this caused some frustration*/}
            <input type='text' placeholder='Search' name='search' onChange={handleChange}  value={search}></input>
            <button><img className='search_img'></img></button>
        </form>
    )
}