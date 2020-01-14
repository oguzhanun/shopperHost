import React, { useReducer } from "react";

const LanguageContext = React.createContext();

const languageReducer = (state, action) => {
  switch (action.type) {
    case "change_language":
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export const LanguageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, {
    language: "english"
  });

  const changeLanguage = language => {
    console.log("this is context : ", state.language);
    dispatch({ type: "change_language", payload: language });
  };

  return (
    <LanguageContext.Provider value={{ state, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
