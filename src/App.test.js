


import React from 'react';
import { cleanup, getDefaultNormalizer, render, waitFor } from '@testing-library/react';
//import { userEvent } from '@testing-library/user-event'
import userEvent from '@testing-library/user-event' //the testing library reference website frusteratingly did not have the import statement so, after numerous guesses, I found it elsewhere. I learned that it is a default export, no brackets,  which seems inconsistent with everything else. 
import {screen, getAllByRole, getByRole, getByPlaceholderText  } from '@testing-library/dom'
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

/*test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});*/

describe('The Reddit app', () => {

  /*const appCon = render( //is this to create a "container" for the "Testing Library Query"? but i am not sure how yet.
    <Provider store={store}>
      <App />
    </Provider>

  );*/

  

  const rApp = () => {  // shortcut to setup render app
    render( 
      <Provider store={store}>
        <App />
      </Provider>
    )
  } 
  
  afterEach(() => { // should also ass before each to render App, but right now the render is called separately, and sometimes differently, in each test.
    cleanup();
  });

  

  it('should render', () => {
    const appCon = render( 
      <Provider store={store}>
        <App />
      </Provider>
    )
    let tree = appCon
    expect(tree).toMatchSnapshot();
  })

  it('must must display the word "reddit"', () => {
    const { getByText } = render( //is this to create a "container" for the "Testing Library Query"? but i am not sure how yet.
      <Provider store={store}>
        <App />
      </Provider>

    );
    
    expect(getByText('REDDIT...')).toBeInTheDocument(); //regex to find the word reddit, (i)gnoring case, in the rendered webpage.
  }) 
  
  it('must must display the word "Search" in the search bar', () => {
    const { getByPlaceholderText } = render( 
      <Provider store={store}>
        <App />
      </Provider>

    );
    
    expect(getByPlaceholderText('Search', { exact: false })).toBeInTheDocument(); // optional object argument takes exact and normalize properties. turns exact string matches off, probably simpler to use regex. 
  })

  it('should have multiple posts containing the text "upvotes"', async () => {
    /*const upvotes = async () => {
      return await screen.findByText(/upvotes/i)
    };*/

    render( 
      <Provider store={store}>
        <App />
      </Provider>

    )
    //expect(screen.getByText(/reddit/i)).toBeInTheDocument()
    await waitFor(() => expect(screen.getAllByText(/upvotes/i).length).toBeGreaterThan(1))
  })

  it('should open subreddits menu when "REDDIT..." is clicked', async () => {  // the async function  needs to be defined before the 'it' callback anytime asychronous actions are taken inside the test.
   /*render( 
      <Provider store={store}>
        <App />
      </Provider>
    )  // must use testing library render for every test. 
    */
    rApp();

    const redditClick = screen.getByText('REDDIT...'); //I now know that using this to text nodes to identify a specific Element is a bad idea on a page with dynamically loaded content, since there is no way to guarantee that this text wont be present elsewhere in the document, but using exact matches makes it less likely at least.
    //const user = userEvent.setup()
    const user = userEvent.setup()
    
    await userEvent.click(redditClick)
    expect(screen.getByText(/subreddit/i)).toBeInTheDocument()
    //await waitFor(() => expect(screen.getAllByAltText(/ icon/i).length).toBeGreaterThan(1))
    //const firstSubreddit = screen.getAllByAltText(/ icon/i)[0]
    //await userEvent.click(firstSubreddit)
    
  });

  it('should navigate to new url and close subreddits menu when an icon is clicked', async () => {  
     rApp();
     const redditClick = screen.getByText('REDDIT...')
     const user = userEvent.setup()
     const startUrl = global.window.location.href
     await userEvent.click(redditClick)
     const subredditH2 = screen.getByRole('heading', {level: 2}) //must define variable for later logic. You can't sellect elements that are not there.
     await waitFor(() => expect(screen.getAllByAltText(/ icon/i).length).toBeGreaterThan(1))
     const firstSubreddit = screen.getAllByAltText(/ icon/i)[0]
     //await userEvent.click(firstSubreddit)
     await userEvent.pointer({keys: '[MouseLeft]', target: firstSubreddit})
     await waitFor(() => expect(global.window.location.href).not.toEqual(startUrl))
     await waitFor(() => expect(subredditH2).not.toBeInTheDocument()) // use variable, not query. you can't select elements that are not there.
   })

   it('should open up a description box when a subreddit title is clicked and close when the "X" is clicked', async () => {
    rApp();
    const redditClick = screen.getByRole('heading', {level: 1})
    const user = userEvent.setup()
    await user.click(redditClick)
    await waitFor(() => expect(screen.getAllByAltText(/ icon/i).length).toBeGreaterThan(1))
    const subredditNav = screen.getByRole('navigation') // I just realized that by sellecting ellements progressively down the hierarchy that you could produce much more preditctable results. Duh.
    const subredditTermArr = getAllByRole(subredditNav, 'term'); // when using the queries directly without the screen object they must be imported from '@testing-library/dom'
    await user.click(subredditTermArr[0])
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    const descriptionDiv = screen.getByRole('dialog');
    const closeButton = getByRole(descriptionDiv, 'button') // attempted to use screen object with this syntax, placing the container inside the funtion parameters, to avoid having to import lots of queries at the top of the file, but this did not work. The screen queries function differently.
    await user.click(closeButton);
    await waitFor(() => expect(descriptionDiv).not.toBeInTheDocument())
   })

   it('should receive input in the search bar, use that to change the url and change the posts displayed.', async () => {
     rApp();
     const searchForm = screen.getByRole('search')
     const searchBar = getByPlaceholderText(searchForm, /search/i)
     const searchButton = getByRole(searchForm, 'button')
     //expect(searchButton).toEqual('h')
     const startUrl = global.window.location.href
     const user = userEvent.setup()
     await user.pointer({keys: '[MouseLeft]', target: searchBar})
     await user.keyboard('taco')
     //const displayVal = 
     expect(screen.getByDisplayValue('taco')).toBeInTheDocument()
     //await user.pointer({keys: '[MouseLeft]', target: searchButton})
     await user.keyboard('{Enter}')
     await waitFor(() => expect(global.window.location.href).not.toEqual(startUrl))
     await waitFor(() => expect(screen.getAllByText(/taco/i).length).toBeGreaterThan(0))
     expect(global.window.location.href).toContain('taco')

   })

})