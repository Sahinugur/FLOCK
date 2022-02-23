export const initialState = {
  user: {},
  rooms: [],
  projects: [],
  events: [],
};

export const reduce = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATED":
      return {
        ...state,
        user: action.payload,
        rooms: ["family-room", "travelling-room"],
        // projects: ["flock"], 
        // events: ["uix"], [""]
      };

    default:
      return state;
  }
};
