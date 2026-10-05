import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_FORGETTING_SPAN } from "../constants";

const initialState = {
  words: [],
};

const wordsLearningSlice = createSlice({
  name: "wordsLearning",
  initialState,
  reducers: {
    addWord: (state, action) => {
      const wordInfo = action.payload;
      if (state.words.some((word) => word.word === wordInfo.word)) {
        return;
      }

      const now = new Date().getTime();
      state.words.push({
        ...wordInfo,
        status: 0,
        forgettingSpan: INITIAL_FORGETTING_SPAN,
        dateForgets: now - INITIAL_FORGETTING_SPAN,
        dateTotallyForgets: now,
      });
    },
    updateWord: (state, action) => {
      const updatedWord = action.payload;
      const index = state.words.findIndex((word) => word.word === updatedWord.word);
      if (index === -1) {
        return;
      }

      state.words[index] = {
        ...state.words[index],
        ...updatedWord,
      };
    },
    removeWord: (state, action) => {
      const wordToRemove = action.payload;
      state.words = state.words.filter((word) => word.word !== wordToRemove);
    },
    updateWordLearnInfo: (state, action) => {
      const wordToUpdate = action.payload;
      const index = state.words.findIndex((word) => word.word === wordToUpdate);
      if (index === -1) {
        return;
      }

      const currentWord = state.words[index];
      const now = new Date().getTime();
      const previousForgettingSpan = currentWord.forgettingSpan || INITIAL_FORGETTING_SPAN;

      currentWord.dateForgets = now + previousForgettingSpan;
      currentWord.dateTotallyForgets = now + previousForgettingSpan * 2;
      currentWord.forgettingSpan = previousForgettingSpan * 2;
      currentWord.status = 2;
    },
    updateStatuses: (state) => {
      const now = new Date().getTime();

      state.words = state.words.map((word) => {
        if (now > word.dateTotallyForgets) {
          return { ...word, status: 0 };
        }

        if (now > word.dateForgets) {
          return { ...word, status: 1 };
        }

        return { ...word, status: 2 };
      });
    },
  },
});

// For correct passing of the tests please, leave these exports as they are
export const wordsLearningActions = wordsLearningSlice.actions;

export default wordsLearningSlice;
