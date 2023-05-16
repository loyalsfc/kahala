import { createSlice } from "@reduxjs/toolkit";
import { fetchSaves } from "../lib/fetchCart";

const initialState = {
    saves: []
}

const saveSlice = createSlice({
    name: 'saves',
    initialState,
    reducers: {
        initSaves: (state, action) => {
            state.saves = action.payload
        },
        addSaves: (state, action) => {
            state.saves = [...state.saves, action.payload]
        },
        removeSaves: (state, action) => {
            state.saves = state.saves.filter(save => save.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSaves.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSaves.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.saves = action.payload;
            })
            .addCase(fetchSaves.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

    }
})

export const {addSaves, removeSaves, initSaves} = saveSlice.actions
export default saveSlice.reducer