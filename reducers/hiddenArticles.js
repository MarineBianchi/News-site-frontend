import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

// Création des fonctions permettant d'afficher ou de cacher les articles

export const hiddenArticlesSlice = createSlice({
  name: 'hiddenArticles',
  initialState,
  reducers: {
    hideArticle: (state, action) => {
      state.value.push(action.payload);
    },
    unhideArticles: (state) => {
      state.value = [];
    }
  },
});

export const { hideArticle, unhideArticles } = hiddenArticlesSlice.actions;
export default hiddenArticlesSlice.reducer;
