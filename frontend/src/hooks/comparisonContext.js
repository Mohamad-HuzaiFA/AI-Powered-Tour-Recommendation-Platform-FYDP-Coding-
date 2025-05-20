// src/context/comparisonContext.js
"use client";
import { createContext, useReducer, useContext } from 'react';

// Initial state for the comparison feature
const initialState = {
  comparedTours: [], // Array to store IDs of tours selected for comparison
  maxCompareLimit: 3, // Set a reasonable limit
};

// Actions for the reducer
const ADD_TO_COMPARE = 'ADD_TO_COMPARE';
const REMOVE_FROM_COMPARE = 'REMOVE_FROM_COMPARE';
const CLEAR_COMPARE = 'CLEAR_COMPARE';

// Reducer function
const comparisonReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_COMPARE:
      if (state.comparedTours.length < state.maxCompareLimit && !state.comparedTours.includes(action.payload)) {
        return { ...state, comparedTours: [...state.comparedTours, action.payload] };
      }
      return state; // Don't add if limit reached or already in
    case REMOVE_FROM_COMPARE:
      return { ...state, comparedTours: state.comparedTours.filter(id => id !== action.payload) };
    case CLEAR_COMPARE:
      return { ...state, comparedTours: [] };
    default:
      return state;
  }
};

// Create the context
const ComparisonContext = createContext(initialState);

// Create a provider component
export const ComparisonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(comparisonReducer, initialState);

  // Action creators (for cleaner dispatching)
  const addToCompare = (tourId) => {
    dispatch({ type: ADD_TO_COMPARE, payload: tourId });
  };

  const removeFromCompare = (tourId) => {
    dispatch({ type: REMOVE_FROM_COMPARE, payload: tourId });
  };

  const clearCompare = () => {
    dispatch({ type: CLEAR_COMPARE });
  };

  return (
    <ComparisonContext.Provider value={{ ...state, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </ComparisonContext.Provider>
  );
};

// Custom hook to use the comparison context
export const useComparison = () => {
  return useContext(ComparisonContext);
};