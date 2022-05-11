export const fetchReddit = url => {
    return fetch(url).then(resolve => resolve.json()).then(resolve => resolve);
  }