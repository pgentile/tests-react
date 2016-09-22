// Actions

export const SUBREDDIT_PROMISE = 'SUBREDDIT';
export const CHANGE_TOPIC = 'CHANGE_TOPIC';


// Actions creator

export function loadSubreddit(subreddit) {
  let promise = fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => {
      if (!response.ok) {
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

export function changeTopic(topic) {
  return {
    type: CHANGE_TOPIC,
    topic,
  };
}
