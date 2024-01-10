import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // todosApplications: [
  //    { id: 1, name: "Marmeladov Chakchabek", dob: "27.01.2002" },
  // ],
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
      if (action.payload.id) {
        const newArr = plaitiff.map((obj) => {
          if (obj.id === action.payload.id) {
            return action.payload;
          } else {
            return obj;
          }
        });
        state.todosApplications.plaitiff = newArr;
      } else {
        const id =
          plaitiff.length === 0 ? 1 : plaitiff[plaitiff.length - 1].id + 1;
        state.todosApplications.plaitiff = [
          ...plaitiff,
          { ...action.payload, id },
        ];
      }
    },
    addTodosPlaitiffResper: (state, action) => {
      const { plaitiffResper } = state.todosApplications;
      if (action.payload.id) {
        const newArr = plaitiffResper.map((obj) => {
          if (obj.id === action.payload.id) {
            return action.payload;
          } else {
            return obj;
          }
        });
        state.todosApplications.plaitiffResper = newArr;
      } else {
        const id =
          plaitiffResper.length === 0
            ? 1
            : plaitiffResper[plaitiffResper.length - 1].id + 1;
        state.todosApplications.plaitiffResper = [
          ...plaitiffResper,
          { ...action.payload, id },
        ];
      }
    },
    addTodosDefendant: (state, action) => {
      const { defendant } = state.todosApplications;
      if (action.payload.id) {
        const newArr = defendant.map((obj) => {
          if (obj.id === action.payload.id) {
            return action.payload;
          } else {
            return obj;
          }
        });
        state.todosApplications.defendant = newArr;
      } else {
        const id =
          defendant.length === 0 ? 1 : defendant[defendant.length - 1].id + 1;
        state.todosApplications.defendant = [
          ...defendant,
          { ...action.payload, id },
        ];
      }
    },
    addTodosDefendantResper: (state, action) => {
      const { defendantResper } = state.todosApplications;
      if (action.payload.id) {
        const newArr = defendantResper.map((obj) => {
          if (obj.id === action.payload.id) {
            return action.payload;
          } else {
            return obj;
          }
        });
        state.todosApplications.defendantResper = newArr;
      } else {
        const id =
          defendantResper.length === 0
            ? 1
            : defendantResper[defendantResper.length - 1].id + 1;
        state.todosApplications.defendantResper = [
          ...defendantResper,
          { ...action.payload, id },
        ];
      }
    },
  },
});
export const {
  addTodosPlaitiff,
  addTodosPlaitiffResper,
  addTodosDefendant,
  addTodosDefendantResper,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
