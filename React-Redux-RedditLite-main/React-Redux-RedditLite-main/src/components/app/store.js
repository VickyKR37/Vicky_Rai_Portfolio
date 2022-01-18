import { configureStore } from "@reduxjs/toolkit";
import searchBarandButtonSlice from "../searchBarAndButton/searchBarandButtonSlice";
import commentsSlice from "../comments/commentsSlice";


export default configureStore({
  reducer: {
    commentsSlice: commentsSlice,
    vicky: searchBarandButtonSlice,
}});
