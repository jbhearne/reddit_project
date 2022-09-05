import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

/*test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});*/

describe('The Reddit app', () => {

  const { getByText } = render( //is this to create a "container" for the "Testing Library Query"? but i am not sure how yet.
    <Provider store={store}>
      <App />
    </Provider>
  );
  it('must must display the word "reddit"', () => {
    expect(getByText(/reddit/i)).toBeInTheDocument(); //regex to find the word reddit, (i)gnoring case, in the rendered webpage.
  }) 
  

})