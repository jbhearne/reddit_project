import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearch, setSearch } from './searchSlice';
import './Search.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function Search() {

    const search = useSelector(selectSearch);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        dispatch(setSearch(e.target.value));
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
        navigate('/search.json?q=' + search); //need to use .json extension for api to work -- rather than dispatch a new url to postsSlice we set the URL in the browser which triggers a dispatch in Posts.js
        dispatch(setSearch('')); //clears search bar
    }

    return (
        <form className='search' onSubmit={handleSearchClick} role='search'>  {/*onSubmit goes on <form> not <button> this caused some frustration*/}
            <input aria-label="Search" className='field' type='text' placeholder='  Search' name='search' onChange={handleChange} value={search}></input>
            <button aria-label="Search"><img className='search_img' alt=''></img></button>
        </form>
    )
}