import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
};


const loadingSlice = createSlice({
    name: "openCloseBody",
    initialState,
    reducers: {
        handleLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
});

export const { handleLoading } = loadingSlice.actions;
export default loadingSlice.reducer;