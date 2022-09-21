import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Search } from './features/search/Search'
import { Posts } from './features/posts/Posts'
import { Subreddits } from './features/subreddits/Subreddits'
import { useDispatch, useSelector } from 'react-redux'
import { setPostsUrl, selectPostsUrl, setPostsPath, selectPostsPath } from './features/posts/postsSlice'
import { setSubredditsUrl } from './features/subreddits/subredditsSlice'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

function App() {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useDispatch();
  const postsUrl = useSelector(selectPostsUrl);
  const postsPath= useSelector(selectPostsPath);

  useEffect(() => {
    //dispatch(setPostsPath('/r/popular.json'))
    //dispatch(setPostsUrl())
    dispatch(setSubredditsUrl('https://www.reddit.com/subreddits.json'))
  }, [])

  useEffect(() => {
    setIsNavOpen(false) // closes nav when a a new subreddit is clicked on and the posts url changes.
  }, [postsUrl])

  const handleNavClick = () => {
    setIsNavOpen(!isNavOpen)
  }



  return (
    <div className="App">
      <Router>
        
        <header className='search_header'>
        <span className='main' ><button id="menubutton" onClick={handleNavClick} aria-haspopup="true" aria-controls="menu">
            REDDIT...
          </button></span>
          <Search />
        </header>
        <div id="menu">
        {isNavOpen && (<nav   className='floating_nav'>
          <Subreddits />
        </nav>)}
        </div>
        
        <div className='posts'>
        <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/search.json' element={<Posts />} />
        <Route path='/:r/:postsSelected' element={<Posts />} /> {/* Params are separated by slash so a Param can only be what is between two slashes not everything after the slash. By not including the /r/ or a param in its place, :r, the urls, as they are currently structured, were not being reconised by Route. */}
        </Routes>
        </div>
        
      </Router>
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
