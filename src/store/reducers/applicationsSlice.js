import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   todosApplications: [
  //     { id: 1, name: "Marmeladov Chakchabek", dob: "27.01.2002" },
  //   ],
  todosApplications: [],
};

const applicationsSlice = createSlice({
  name: "applicationsSlice",
  initialState,
  reducers: {
    addTodosApplications: (state, action) => {
      if (state.todosApplications.length === 0) {
        state.todosApplications = [{ ...action.payload, id: 1 }];
      } else {
        state.todosApplications = [
          ...state.todosApplications,
          {
            ...action.payload,
            id:
              state.todosApplications?.[state.todosApplications.length - 1]
                ?.id + 1,
          },
        ];
      }
    },
    chnageTodosApplications: (state, action) => {
      state.todosApplications = action.payload;
    },
  },
});
export const { addTodosApplications, chnageTodosApplications } =
  applicationsSlice.actions;

export default applicationsSlice.reducer;
