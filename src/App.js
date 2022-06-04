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
import { Route } from 'react-router-dom';

function App() {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useDispatch();
  const postsUrl = useSelector(selectPostsUrl);
  const postsPath= useSelector(selectPostsPath);

  useEffect(() => {
    dispatch(setPostsPath('/r/popular.json'))
    dispatch(setPostsUrl())
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
        <Route path=''>
        <header className='search_header'>
          <h1 className='main' onClick={handleNavClick}>REDDIT...</h1>
          <Search />
        </header>
        {isNavOpen && (<nav className='floating_nav'>
          <Subreddits />
        </nav>)}
        </Route>
        <Route path='/:postsSelected'>
        <div className='posts'>
        
          <Posts />
        
        </div>
        </Route>
        
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
