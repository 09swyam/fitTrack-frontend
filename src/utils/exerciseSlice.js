import { createSlice } from "@reduxjs/toolkit";

const exerciseSlice = createSlice ({
    name: "exercise",
    initialState: [],
    reducers: {
        addExercise: ( state, action ) => {
            state.push(action.payload);
        },
        deleteExercises: () => {
            return [];
        }
    }
})

export const { addExercise, deleteExercises } = exerciseSlice.actions;

export default exerciseSlice.reducer;