export const fetchReddit = async url => {
    const resolve = await fetch(url);
  const resolve_1 = await resolve.json();
  return resolve_1.data;
  }