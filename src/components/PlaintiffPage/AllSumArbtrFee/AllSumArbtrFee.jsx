import React, { useEffect } from "react";
import MyInput from "../../../common/MyInput/MyInput";
import { useSelector } from "react-redux";
import { roundedNumberFN } from "../../../helpers/roundedNumberFN";

const AllSumArbtrFee = () => {
  //// для подсчета суммы по всех сборов
  const { selCurrency } = useSelector((state) => state.selectsSlice);

  const { arbitr_fee, registr_fee, doplata_summ } = useSelector(
    (state) => state.applicationsSlice?.dataIsk
  );
  const { arbitr_curr, registr_curr, nadbavka_curr } = useSelector(
    (state) => state.applicationsSlice?.dataIsk
  );

  const newArbitr_curr = selCurrency?.find(
    (i) => i.codeid == arbitr_curr
  )?.rate;

  const newRegistr_curr = selCurrency?.find(
    (i) => i.codeid == registr_curr
  )?.rate;

  const newNadbavka_curr = selCurrency?.find(
    (i) => i.codeid == nadbavka_curr
  )?.rate;

  const arbitr_sum = +arbitr_fee * +newArbitr_curr || 0;

  const registr_sum = +registr_fee * +newRegistr_curr || 0;

  const doplata_sum = +doplata_summ * +newNadbavka_curr || 0;

  const allSumm = arbitr_sum + registr_sum + doplata_sum;

  //// вся сумма сборов
  return (
    <div className="twoInputs">
      <MyInput
        changeInput={() => {}}
        title={"Общая сумма"}
        value={`${roundedNumberFN(+allSumm)} сом`}
        name={""}
      />
    </div>
  );
};

export default AllSumArbtrFee;
