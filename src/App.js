import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Search } from './features/search/Search'
import { Posts } from './features/posts/Posts'
import { Subreddits } from './features/subreddits/Subreddits'
import { useDispatch } from 'react-redux'
import { setPostsUrl } from './features/posts/postsSlice'

function App() {

  const {isNavOpen, setIsNavOpen} = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPostsUrl('https://www.reddit.com/r/popular.json'))
  }, [])

  const handleNavClick = () => {
    setIsNavOpen(true)
  }



  return (
    <div className="App">
      <header className='search_header'>
        <h1 className='main' onClick={handleNavClick}>REDDIT</h1>
        <Search />
      </header>
      {isNavOpen && (<nav className='floating_nav'>
        <Subreddits />
      </nav>)}
      <div className='posts'>
        <Posts />
      </div>
      
      {
      /*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
  </header>*/}
    </div>
  );
}

export default App;
