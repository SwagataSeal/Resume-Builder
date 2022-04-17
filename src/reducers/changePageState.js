const initialState = {
  currentPage: 0,
  profile: {},
  education: [],
  skill: [],
  project: [],
  social: [],
  showPreview: false,
};

const changePageState = (state = initialState, action) => {
  switch (action.type) {
    case "NEXT":
      if (state.currentPage === 4)
        return {
          ...state,
          currentPage: state.currentPage,
        };
      return {
        ...state,
        currentPage: state.currentPage + action.payload,
      };
    case "PREVIOUS":
      if (state.currentPage === 0)
        return {
          ...state,
          currentPage: state.currentPage,
        };
      return {
        ...state,
        currentPage: state.currentPage - action.payload,
      };
    case "SETPAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "SETPROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "SETEDUCATION":
      return {
        ...state,
        education: action.payload,
      };
    case "SETSKILL":
      return {
        ...state,
        skill: action.payload,
      };
    case "SETPROJECT":
      return {
        ...state,
        project: action.payload,
      };
    case "SETSOCIAL":
      return {
        ...state,
        social: action.payload,
      };
    case "SETSHOWPREVIEW":
      return {
        ...state,
        showPreview: action.payload,
      };
    default:
      return state;
  }
};

export default changePageState;
