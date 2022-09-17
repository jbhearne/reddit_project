# Reddit App

This takes posts from reddit presents them in a custom interface. I created it as part of the Full-Stack Engineer path on [codecademy.com](https://www.codecademy.com/).

## Features

### Search bar

Uses Reddit's search functionality `search.json` to query reddit for posts with the user's input.

### Hidden navigation menu

Click the REDDIT logo to to reveal the subreddit menu. A section of subreddit catagories are provided. Click on the icon to bring up those posts.

#### Hidden Subreddit descriptions

Click the name of the subreddit to open an information box to learn more about the topic and then close the information box to hide it again.

### Tiled Reddit posts

Individual posts are tiled based on user's screen size. 3 wide for large screens and 1 wide for small screens. Posts display the title, most forms of media, author, the date posted, the number of upvotes and any Reddit based text body.

#### Data handing for multiple types of media

Reddit displays media in many different ways and this parses multiple types of media so that it can be displayed within the interface.

## Technologies used

- React
- Redux
- CSS (using CSS modules)
- React Router
- Jest
- Testing Library
- Git
- GitHub

## Wireframes

Initial hand drawn sketch:

![First wireframe sketch](./Wireframe1.png)

________________________________________________________

Second wireframe made on [draw.io](http://www.draw.io):

![Second Wireframe](./Wireframe2.png)


## Future Work

- Not all content displays. Needs a deeper dive into Reddit's JSON files to parse out and display more content.
- Needs more roles and accessibility improvements.
- Possible addition of POST requests such as upvote/downvote. I would need to see if there is even a way to do that using the the unofficial JSON API.
- Add a way to display posts and subreddits that go beyond the first 25 that populate naturally.