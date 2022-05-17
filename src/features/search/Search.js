import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearch, search } from './searchSlice';

export function Search() {

    const search = useSelector(selectSearch)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(search(e.target.value))
    }


    return (
        <form className='search'>
            <input type='text' placeholder='Search' name='search' value={search} onChange={handleChange}></input>
            <button><img className='search_img'></img></button>
        </form>
    )
}