export const initialState = {
    user: {},
    rooms: [],
    
};

export const reduce = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATED":
      return {
        ...state,
        user: action.payload,
        rooms: ["family-room", "travelling-room"],
      };

    default:
      return state;
  }
};
