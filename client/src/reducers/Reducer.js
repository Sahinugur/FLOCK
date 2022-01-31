export const initialState = {
    user: {},
    rooms: [],
    project: {}

    
};

export const reduce = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATED":
      return {
        ...state,
        user: action.payload,
        rooms: ["family-room", "travelling-room"],
        project: action.payload
      };

    default:
      return state;
  }
};
