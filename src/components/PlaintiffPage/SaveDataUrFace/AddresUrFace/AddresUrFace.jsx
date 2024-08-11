/// hooks
import React from "react";
import { useSelector } from "react-redux";

/// components
import MyInput from "../../../../common/MyInput/MyInput";
import Selects from "../../../Selects/Selects";

/// style
import "./style.scss";

const AddresUrFace = (props) => {
  const { changeInput } = props;

  const { aduf } = useSelector((state) => state.inputSlice);

  const { selDistrict } = useSelector((state) => state.selectsSlice);
  const { selCountries } = useSelector((state) => state.selectsSlice);
  const { selRegions } = useSelector((state) => state.selectsSlice);
  const { selTypeAddress } = useSelector((state) => state.selectsSlice);

  return (
    <>
      <div className="threeInputs">
        <Selects
          arr={selCountries}
          initText={"Страна"}
          keys={{ typeKey: aduf.country, type: "country" }}
          type="aduf"
          urgently={true}
        />

        <Selects
          arr={selRegions}
          initText={"Область"}
          keys={{ typeKey: aduf.region, type: "region" }}
          type="aduf"
          urgently={true}
        />

        <Selects
          arr={selDistrict}
          initText={"Район"}
          keys={{ typeKey: aduf.district, type: "district" }}
          type="aduf"
          urgently={true}
        />

        <MyInput
          changeInput={changeInput}
          title={"Город"}
          value={aduf?.city}
          name={"city"}
          placeholder={"Ваш город проживания"}
        />

        <Selects
          arr={selTypeAddress}
          initText={"Адресный элемент"}
          keys={{ typeKey: aduf.adddreselement, type: "adddreselement" }}
          type="aduf"
        />
      </div>

      <div className="threeInputs">
        <MyInput
          changeInput={changeInput}
          title={"Улица"}
          value={aduf?.street}
          name={"street"}
          placeholder={"Улица"}
          required={true}
        />

        <MyInput
          changeInput={changeInput}
          title={"Номер объекта"}
          value={aduf?.numObj}
          name={"numObj"}
          placeholder={"Номер объекта"}
          required={true}
        />

        <MyInput
          changeInput={changeInput}
          title={"Квартира"}
          value={aduf?.apartament}
          name={"apartament"}
          placeholder={"Квартира"}
        />

        <MyInput
          changeInput={changeInput}
          title={"Почтовый индекс"}
          value={aduf?.emailIndex}
          name={"emailIndex"}
          placeholder={"Почтовый индекс"}
        />

        <MyInput
          changeInput={changeInput}
          title={"Описание"}
          value={aduf?.description}
          name={"description"}
          placeholder={"Описание"}
        />
      </div>

      <div className="threeInputs"></div>
    </>
  );
};

export default AddresUrFace;
