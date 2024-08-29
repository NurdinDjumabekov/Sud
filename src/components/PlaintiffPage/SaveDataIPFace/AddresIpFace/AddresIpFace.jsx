/// hooks
import React from "react";
import { useSelector } from "react-redux";

/// components
import MyInput from "../../../../common/MyInput/MyInput";
import Selects from "../../../Selects/Selects";

/// style
import "./style.scss";

const AddresIpFace = (props) => {
  const { changeInput } = props;

  const { adif } = useSelector((state) => state.inputSlice);

  console.log(adif, "adif");

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
          keys={{ typeKey: adif.country, type: "country" }}
          type="adif"
          urgently={true}
        />

        <Selects
          arr={selRegions}
          initText={"Область"}
          keys={{ typeKey: adif.region, type: "region" }}
          type="adif"
          urgently={true}
        />

        <Selects
          arr={selDistrict}
          initText={"Район"}
          keys={{ typeKey: adif.district, type: "district" }}
          type="adif"
        />

        <MyInput
          changeInput={changeInput}
          title={"Гoрoд"}
          value={adif?.city}
          name={"city"}
          placeholder={"Ваш гoрoд проживания"}
        />

        <Selects
          arr={selTypeAddress}
          initText={"Адресный элемент"}
          keys={{ typeKey: adif.adddreselement, type: "adddreselement" }}
          type="adif"
        />
      </div>

      <div className="threeInputs">
        <MyInput
          changeInput={changeInput}
          title={"Улица"}
          value={adif?.street}
          name={"street"}
          placeholder={"Улица"}
          required={true}
        />

        <MyInput
          changeInput={changeInput}
          title={"Номер объекта"}
          value={adif?.numObj}
          name={"numObj"}
          placeholder={"Номер объекта"}
          required={true}
        />

        <MyInput
          changeInput={changeInput}
          title={"Квартира"}
          value={adif?.apartament}
          name={"apartament"}
          placeholder={"Квартира"}
        />

        <MyInput
          changeInput={changeInput}
          title={"Почтовый индекс"}
          value={adif?.emailIndex}
          name={"emailIndex"}
          placeholder={"Почтовый индекс"}
        />

        <MyInput
          changeInput={changeInput}
          title={"Описание"}
          value={adif?.description}
          name={"description"}
          placeholder={"Описание"}
        />
      </div>

      <div className="threeInputs"></div>
    </>
  );
};

export default AddresIpFace;
