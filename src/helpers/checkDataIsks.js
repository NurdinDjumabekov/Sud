export const checkDataIsks = (obj) => {
  if (
    // obj.plaintiff?.length !== 0 &&
    obj.plaintiffResper?.length === 0 &&
    // obj.defendant?.length === 0 &&
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
    obj.arbitr_lang === "" &&
    obj.summ === 0 &&
    obj.summ_curr === "" &&
    obj.arbitr_fee === 0 &&
    obj.arbitr_curr === "" &&
    obj.registr_fee === 0 &&
    obj.registr_curr === "" &&
    obj.doplata_summ === 0 &&
    obj.nadbavka_curr === "" &&
    obj.arbitr_pay_end_date === "" &&
    obj.arbitr_doplata_end_date === ""
  ) {
    return false;
  } else {
    return true;
  }
};
