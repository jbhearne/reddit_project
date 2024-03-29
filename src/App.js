import React, { useState, useEffect } from 'react';
import './App.css';
import { Search } from './features/search/Search'
import { Posts } from './features/posts/Posts'
import { Subreddits } from './features/subreddits/Subreddits'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostsUrl } from './features/posts/postsSlice'
import { setSubredditsUrl } from './features/subreddits/subredditsSlice'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

function App() {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useDispatch();
  const postsUrl = useSelector(selectPostsUrl);

  useEffect(() => {
    dispatch(setSubredditsUrl('https://www.reddit.com/subreddits.json'));
  }, []);

  useEffect(() => {
    setIsNavOpen(false); // closes nav when a a new subreddit is clicked on and the posts url changes.
  }, [postsUrl]);

  const handleNavClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="App">
      <Router>
        
        <header className='search_header'>
          <button id="menubutton" onClick={handleNavClick}>
           <h1 className='main' >REDDIT...</h1>
          </button>
          <Search />
        </header>
        
        {isNavOpen && (<nav   className='floating_nav'>
          <Subreddits />
        </nav>)}
        
        <div className='posts'>
        <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/search.json' element={<Posts />} />
        <Route path='/:r/:postsSelected' element={<Posts />} /> {/* Params are separated by slash so a Param can only be what is between two slashes not everything after the slash. By not including the /r/ or a param in its place, :r, the urls, as they are currently structured, were not being reconised by Route. */}
        </Routes>
        </div>
        
      </Router>
      
    </div>
  );
}

export default App;
