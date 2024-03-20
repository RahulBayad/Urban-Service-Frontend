import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    services: [],
};

const searchSlice = createSlice({
    name : "search",
    initialState,
    reducers:{
        searchServices(state,action){
            state.services = [];
            state.services.push(action.payload)
        },
    }
})
export const { searchServices } = searchSlice.actions;
export default searchSlice.reducer;