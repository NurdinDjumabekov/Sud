export const transformCreateData = (props, role, faceData) => {
  if (role == 1) {
    return {
      ...props?.todosApplications,
      plaintiff: [{ ...faceData, typeFace: props?.typeFace }],
      defendant: [],
      plaintiffResper: [],
      defendantResper: [],
    };
  } else if (role == 2) {
    return {
      ...props?.todosApplications,
      defendant: [{ ...faceData, typeFace: props?.typeFace }],
      plaintiff: [],
      plaintiffResper: [],
      defendantResper: [],
    };
  } else if (role == 3) {
    return {
      ...props?.todosApplications,
      plaintiffResper: [{ ...faceData, typeFace: props?.typeFace }],
      plaintiff: [],
      defendant: [],
      defendantResper: [],
    };
  } else if (role == 4) {
    return {
      ...props?.todosApplications,
      defendantResper: [{ ...faceData, typeFace: props?.typeFace }],
      plaintiff: [],
      defendant: [],
      plaintiffResper: [],
    };
  }
};

export const transformDataSort = (state, payload) => {
  return [
    {
      id: 0,
      name: "Все иски",
      bool: state.mainBtnList[0]?.bool,
      count: payload?.isk_count || 0,
    },
    {
      id: 1,
      name: "Принятые отв. секретарём",
      bool: state.mainBtnList[1]?.bool,
      count: payload?.prinat_sec_total || 0,
    },
    {
      id: 2,
      name: "Отклонённые отв. секретарём",
      bool: state.mainBtnList[2]?.bool,
      count: payload?.otclon_sec_total || 0,
    },
    {
      id: 3,
      name: "Принятые председателем",
      bool: state.mainBtnList[3]?.bool,
      count: payload?.prinat_pred_total || 0,
    },
    {
      id: 4,
      name: "Отклонённые председателем",
      bool: state.mainBtnList[4]?.bool,
      count: payload?.otclon_pred_total || 0,
    },
    {
      id: 9,
      name: "На доработке",
      bool: state.mainBtnList[5]?.bool,
      count: payload?.na_dorabotke || 0,
    },
    {
      id: 5,
      name: "Все иски",
      bool: state.mainBtnList[6]?.bool,
      count: payload?.isk_draft_total || 0,
    },
    {
      id: 6,
      name: "Поданные",
      bool: state.mainBtnList[7]?.bool,
      count: payload?.isk_count || 0,
    },
    {
      id: 7,
      name: "Принятые",
      bool: state.mainBtnList[8]?.bool,
      count: payload?.prinat_total || 0,
    },
    {
      id: 8,
      name: "Отказанные",
      bool: state.mainBtnList[9]?.bool,
      count: payload?.otclon_total || 0,
    },
    {
      id: 9,
      name: "На доработке",
      bool: state.mainBtnList[10]?.bool,
      count: payload?.na_dorabotke || 0,
    },
    {
      id: 0,
      name: "Все иски",
      bool: state.mainBtnList[11]?.bool,
      count: payload?.isk_count || 0,
    },
    {
      id: 9,
      name: "На доработке",
      bool: state.mainBtnList[12]?.bool,
      count: payload?.na_dorabotke || 0,
    },
    {
      id: 10,
      name: "Назначенные председателем",
      bool: state.mainBtnList[13]?.bool,
      count: payload?.secretar_isk || 0,
    },
  ];
};
