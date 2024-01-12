import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todosApplications: {
    plaintiff: [], //1 plaintiff
    plaintiffResper: [], //2
    defendant: [], //3
    defendantResper: [], //4

    name: "",
    description: "",
    motivation: "",
    obosnovanie: "",
    finance_raschet: "",
    law_links: "",
    claim: "",
    ///////////////////////////////
    summ: 0,
    summ_curr: "", /// select должен быть по id
    arbitr_fee: 0,
    arbitr_curr: "", /// select должен быть по id
    registr_fee: 0,
    registr_curr: "", /// select должен быть по id
    doplata_summ: 0,

    nadbavka_curr: "", //
    arbitr_pay_end_date: "", //
    arbitr_doplata_end_date: "", //
    ///////////////////////////////
    prim_pravo: "",
    reglament: "",
    haracter_spor: "",
    arbitr_lang: "",
    arbitr_po_dogovor: false, // заменить на 1 и 0
    //// временно, потом удалю!
    number: 1,
  },
  //// массив дел
  listTodos: [
    // {
    //   codeid: "5",
    //   plaintiff: [
    //     {
    //       codeid: "2",
    //       name: "Djumabekov Nurdin",
    //       fiz_face_type: 2,
    //     },
    //   ],
    //   defendant: [
    //     {
    //       codeid: "2",
    //       name: "John Elnsssura",
    //       fiz_face_type: 2,
    //     },
    //     {
    //       codeid: "3",
    //       name: "John Elnsssura",
    //       fiz_face_type: 2,
    //     },
    //   ],
    //   name: "Your Name",
    //   arbitr_fee: 1000,
    //   arbitr_curr: 1,
    //   isk_status: null, ///// 1 - 4
    //   isk_status_name: null,
    //   reglament: "",
    //   arbitrs: [],
    //   files: [],
    // },
  ],
};

const applicationsSlice = createSlice({
  name: "applicationsSlice",
  initialState,
  reducers: {
    addTodosPlaintiff: (state, action) => {
      const { plaintiff } = state.todosApplications;
      if (action.payload.id) {
        const newArr = plaintiff.map((obj) => {
          if (obj.id === action.payload.id) {
            return action.payload;
          } else {
            return obj;
          }
        });
        state.todosApplications.plaintiff = newArr;
      } else {
        const id =
          plaintiff.length === 0 ? 1 : plaintiff[plaintiff.length - 1].id + 1;
        state.todosApplications.plaintiff = [
          ...plaintiff,
          { ...action.payload, id },
        ];
      }
    },
    addTodosPlaintiffResper: (state, action) => {
      const { plaintiffResper } = state.todosApplications;
      if (action.payload.id) {
        const newArr = plaintiffResper.map((obj) => {
          if (obj.id === action.payload.id) {
            return action.payload;
          } else {
            return obj;
          }
        });
        state.todosApplications.plaintiffResper = newArr;
      } else {
        const id =
          plaintiffResper.length === 0
            ? 1
            : plaintiffResper[plaintiffResper.length - 1].id + 1;
        state.todosApplications.plaintiffResper = [
          ...plaintiffResper,
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
    changeTodosApplications: (state, action) => {
      state.todosApplications = action.payload;
    },
    clearTodosApplications: (state, action) => {
      state.todosApplications = {
        plaintiff: [],
        plaintiffResper: [],
        defendant: [],
        defendantResper: [],
        name: "",
        description: "",
        motivation: "",
        obosnovanie: "",
        finance_raschet: "",
        law_links: "",
        claim: "",
        summ: 0,
        summ_curr: "",
        arbitr_fee: 0,
        arbitr_curr: "",
        registr_fee: 0,
        registr_curr: "",
        doplata_summ: 0,
        nadbavka_curr: "",
        arbitr_pay_end_date: "",
        arbitr_doplata_end_date: "",
        prim_pravo: "",
        reglament: "",
        haracter_spor: "",
        arbitr_lang: "",
        arbitr_po_dogovor: false,
      };
    },
    changeListTodos: (state, action) => {
      state.listTodos = action.payload;
    },
    addListTodos: (state, action) => {
      /// добавлени нового обьекта!
      state.listTodos = [
        ...state.listTodos,
        {
          ...action.payload,
          codeid: "5",
          isk_status: null,
          isk_status_name: null,
          arbitrs: [],
          files: [],
        },
      ];
    },
  },
});
export const {
  addTodosPlaintiff,
  addTodosPlaintiffResper,
  addTodosDefendant,
  addTodosDefendantResper,
  changeTodosApplications,
  clearTodosApplications,
  changeListTodos,
  addListTodos,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
