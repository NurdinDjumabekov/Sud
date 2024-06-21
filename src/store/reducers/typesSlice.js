import { createSlice } from "@reduxjs/toolkit";
////// imgsBlack
import myIski from "../../asstes/icons/IconPage/me_iski.svg";
import notif from "../../asstes/icons/IconPage/notification.svg";
import create from "../../asstes/icons/IconPage/create.svg";

////imgsWhite
import myIskiWhite from "../../asstes/icons/IconPageWhite/me_iski.svg";
import notifWhite from "../../asstes/icons/IconPageWhite/notification.svg";
import createWhite from "../../asstes/icons/IconPageWhite/create.svg";

const initialState = {
  plaintiffType: 1, //// check check
  alertText: { text: "", backColor: "", state: false },

  pages: [
    {
      id: 1,
      name: "Все иски",
      path: "/main",
      bool: true,
      icon: myIski,
      iconWhite: myIskiWhite,
    },
    {
      id: 2,
      name: "Создать черновик",
      path: "/create_isk",
      bool: false,
      icon: create,
      iconWhite: createWhite,
    },
    {
      id: 3,
      name: "Уведомления",
      path: "/notif_user",
      bool: false,
      icon: notif,
      iconWhite: notifWhite,
      count: true,
    },
  ],
};

const typesSlice = createSlice({
  name: "typesSlice",
  initialState,
  reducers: {
    changePlaintiffType: (state, action) => {
      state.plaintiffType = action.payload;
    },

    changeAlertText: (state, action) => {
      state.alertText = action.payload;
    },

    changeActivePage: (state, action) => {
      const { path } = action.payload;
      state.pages = state.pages?.map((i) => ({ ...i, bool: path == i?.path }));
    },
  },
});
export const { changePlaintiffType, changeAlertText, changeActivePage } =
  typesSlice.actions;

export default typesSlice.reducer;
