import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearch, setSearch } from './searchSlice';
import { selectPostsPrefix, setPostsUrl, setPostsPath } from '../posts/postsSlice';
import './Search.css'
import { useNavigate, useSearchParams } from 'react-router-dom';

export function Search() {

    const search = useSelector(selectSearch);
    //const postsPrefix = useSelector(selectPostsPrefix); //When I added path as a state I changed the reducer so that combining the prefix and path is done in postsSlice.
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
   

    const handleChange = (e) => {
        dispatch(setSearch(e.target.value));
    }

    const handleSearchClick = (e) => {
        e.preventDefault()
        //dispatch(setPostsPath('/search.json?q=' + search));  //need to use .json extension for api to work
        //dispatch(setPostsUrl()); // this seems awkward to have to call an action just to combine the prefix and the path. May fix at some point.
        navigate('/search.json?q=' + search)
        //setSearchParams({q: search}) //not sure which is preferable navigate or useSearchParams
        dispatch(setSearch(''))
    }


    return (
        <form className='search' onSubmit={handleSearchClick} role='search'>  {/*onSubmit goes on <form> not <button> this caused some frustration*/}
            <input className='field' type='text' placeholder='  Search' name='search' onChange={handleChange} value={search}></input>
            <button><img className='search_img'></img></button>
        </form>
    )
}