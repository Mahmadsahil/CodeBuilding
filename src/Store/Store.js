import { configureStore } from "@reduxjs/toolkit";
import QuestionsSlice from "../Store/QuetionsSlice"
export const Store = configureStore({
    reducer: {
        Questions: QuestionsSlice,
    }
})