// Actions

export const SUBREDDIT_PROMISE = 'SUBREDDIT';
export const UNLOAD_SUBREDDIT = 'UNLOAD_SUBREDDIT';


// Actions creator

export function loadSubreddit(subreddit) {
  const url = `https://www.reddit.com/r/${subreddit}.json`;
  const promise = fetch(url)
    .then(response => {
      if (!response.ok) {
        if (response.status) {
          throw new Error(`Got HTTP error ${response.status} calling ${url}`);
        }
        throw new Error(`Failed response: ${response}`);
      }
      return response.json();
    })
    .then(root => root.data.children.map(child => child.data));

  return {
    type: SUBREDDIT_PROMISE,
    payload: promise,
  };
}

export function unloadSubreddit() {
  return {
    type: UNLOAD_SUBREDDIT,
  };
}
