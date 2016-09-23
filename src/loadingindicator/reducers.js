

export function loadingIndicator(state = { count: 0 }, action) {
  if (action.type) {
    if (action.type.endsWith('_PENDING')) {
      return {
        count: state.count + 1,
      };
    }
    if (action.type.endsWith('_FULFILLED') || action.type.endsWith('_REJECTED')) {
      return {
        count: state.count - 1,
      };
    }
  }
  return state;
}
