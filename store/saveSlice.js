import { createSlice } from "@reduxjs/toolkit";

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
    }
})

export const {addSaves, removeSaves, initSaves} = saveSlice.actions
export default saveSlice.reducer