
export const initialState = {
    user: {},
    rooms: [],
    projects: []

};

export const reduce = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATED":
      return {
        ...state,
        user: action.payload.user,
        rooms: ["family-room", "travelling-room"],
        projects: action.payload.projects
      };

    default:
      return state;
  }
};
