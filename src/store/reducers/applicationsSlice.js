import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todosApplications: [
    // { id: 1, name: "Marmeladov Chakchabek", dob: "27.01.2002" },
  ],
  todosApplications: {
    plaitiff: [], //1
    plaitiffResper: [], //2
    defendant: [], //3
    defendantResper: [], //4
  },
};

const applicationsSlice = createSlice({
  name: "applicationsSlice",
  initialState,
  reducers: {
    addTodosPlaitiff: (state, action) => {
      const { plaitiff } = state.todosApplications;
      const id = plaitiff.length === 0 ? 1 : plaitiff[plaitiff.length - 1].id + 1;
      state.todosApplications.plaitiff = [...plaitiff, { ...action.payload, id }];
    },
    addTodosPlaitiffResper: (state, action) => {
      const { plaitiffResper } = state.todosApplications;
      const id = plaitiffResper.length === 0 ? 1 : plaitiffResper[plaitiffResper.length - 1].id + 1;
      state.todosApplications.plaitiffResper = [...plaitiffResper, { ...action.payload, id }];
    },
    addTodosDefendant: (state, action) => {
      const { defendant } = state.todosApplications;
      const id = defendant.length === 0 ? 1 : defendant[defendant.length - 1].id + 1;
      state.todosApplications.defendant = [...defendant, { ...action.payload, id }];
    },
    addTodosDefendantResper: (state, action) => {
      const { defendantResper } = state.todosApplications;
      const id = defendantResper.length === 0 ? 1 : defendantResper[defendantResper.length - 1].id + 1;
      state.todosApplications.defendantResper = [...defendantResper, { ...action.payload, id }];
    },
    chnageTodosApplications: (state, action) => {
      state.todosApplications = action.payload;
    },
  },
});
export const { addTodosPlaitiff, addTodosPlaitiffResper, addTodosDefendant, addTodosDefendantResper } =
  applicationsSlice.actions;

export default applicationsSlice.reducer;
