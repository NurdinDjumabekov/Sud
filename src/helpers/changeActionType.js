export const changeActionType = (objs,codeid) => {
  return {
    codeid: codeid, 
    plaintiff: objs?.plaintiff.map((obj) => ({
      ...obj,
      codeid: obj.codeid,
      action_type: obj.codeid === 0 ? 1 : 2,
    })),
    plaintiffResper: objs?.plaintiffResper.map((obj) => ({
      ...obj,
      codeid: obj.codeid,
      action_type: obj.codeid === 0 ? 1 : 2,
    })),
    defendant: objs?.defendant.map((obj) => ({
      ...obj,
      codeid: obj.codeid,
      action_type: obj.codeid === 0 ? 1 : 2,
    })),
    defendantResper: objs?.defendantResper.map((obj) => ({
      ...obj,
      codeid: obj.codeid,
      action_type: obj.codeid === 0 ? 1 : 2,
    })),
  };
};
