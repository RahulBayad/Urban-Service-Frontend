import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './redux/SearchSlice'

export const store = configureStore({
    reducer :{
        search : searchReducer
    },
})
