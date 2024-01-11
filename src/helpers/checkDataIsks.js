export const checkDataIsks = (obj) => {
  if (
    obj.plaitiff?.length === 0 &&
    obj.plaitiffResper?.length === 0 &&
    obj.defendant?.length === 0 &&
    obj.defendantResper?.length === 0 &&
    obj.name === "" &&
    obj.description === "" &&
    obj.motivation === "" &&
    obj.obosnovanie === "" &&
    obj.finance_raschet === "" &&
    obj.law_links === "" &&
    obj.claim === "" &&
    obj.prim_pravo === "" &&
    obj.reglament === "" &&
    obj.haracter_spor === "" &&
    obj.arbitr_lang === ""
  ) {
    return false;
  } else {
    return true;
  }
};
