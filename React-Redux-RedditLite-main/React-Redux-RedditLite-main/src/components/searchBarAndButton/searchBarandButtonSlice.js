import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchForArticles = createAsyncThunk("articles/searchForArticles", async(keywords) => {
    console.log(keywords);
        const response = await fetch(`https://www.reddit.com/search.json?q=${keywords}`, { 
            method: 'GET'
        });
        const json = await response.json();
        return json;
    }
);


const searchBarandButtonSlice = createSlice({
    name: 'searchBarandButtonSlice',
    initialState: {
        keywords: '',
        articles: [],
        isLoadingArticles: false,
        failedToLoadArtciles: false,
        postArtcilesIsPending: false,
        failedToPostArticles: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchForArticles.pending, (state) => {
                state.isLoadingArticles = true;
                state.failedToLoadArtciles = false;
            })
            .addCase(searchForArticles.fulfilled, (state, action) => {
                console.log(action.payload.data.children);
                state.isLoadingArticles = false;
                state.failedToLoadArtciles = false;
                state.articles = action.payload.data.children;
            })
            .addCase(searchForArticles.rejected, (state, action) => {
                state.isLoadingArticles = false;
                state.failedToLoadArtciles = true;
            })
    },

    reducers: {
        setKeyword: (state, action) => { 
            return {
                ...state, keywords: action.payload
            }
        }
    }
});
console.log(searchBarandButtonSlice.actions);
export default searchBarandButtonSlice.reducer;
export const selectArticles = (state) => {console.log(state); return state.vicky.articles};
export const selectPostArticles = (state) => state.vicky.articles;
export const isLoading = (state) => state.vicky.isLoadingArticles;
export const isPosting = (state) => state.vicky.postArtcilesIsPending;
export const {setKeyword} = searchBarandButtonSlice.actions;
