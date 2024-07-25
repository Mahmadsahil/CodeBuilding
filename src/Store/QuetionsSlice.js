import { createSlice } from "@reduxjs/toolkit";

const QuestionsSlice = createSlice({
    name: "Question",
    initialState: {
        questions: [],
        QuestionDetails: []
    },
    reducers: {
        addQuestions: (state, action) => {
            state.questions = action.payload;
        },
        addQuestion: (state, action) => {
            state.QuestionDetails = action.payload;
        },
    }
});

export const { addQuestions,addQuestion } = QuestionsSlice.actions;
export default QuestionsSlice.reducer;
