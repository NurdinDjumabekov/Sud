///// hooks
import React from "react";
import { useSelector } from "react-redux";

//// components
import Selects from "../../../Selects/Selects";
import MyInput from "../../../../common/MyInput/MyInput";

///style
import "./style.scss";

const AddresFizFace = (props) => {
  const { changeInput } = props;

  const { adff } = useSelector((state) => state.inputSlice);
  const { selCountries, selDistrict, selTypeAddress, selRegions } = useSelector(
    (state) => state.selectsSlice
  );

  return (
    <section className="addresFizFace">
      <h4>Адрес</h4>
      <div className="mainAddres">
        <Selects
          arr={selCountries}
          initText={`Страна`}
          keys={{ typeKey: adff.country, type: "country" }}
          type="adff"
          urgently={true}
        />

        <Selects
          arr={selRegions}
          initText={"Область"}
          keys={{ typeKey: adff.region, type: "region" }}
          type="adff"
          urgently={true}
        />

        <Selects
          arr={selDistrict}
          initText={"Район"}
          keys={{ typeKey: adff.district, type: "district" }}
          type="adff"
        />

        <MyInput
          changeInput={changeInput}
          title={"Гoрoд"}
          value={adff?.city}
          name={"city"}
          placeholder={"Ваш гoрoд проживания"}
        />

        <Selects
          arr={selTypeAddress}
          initText={"Адресный элемент"}
          keys={{ typeKey: adff.adddreselement, type: "adddreselement" }}
          type="adff"
        />

        <MyInput
          changeInput={changeInput}
          title={"Улица"}
          value={adff?.street}
          name={"street"}
          placeholder={"Улица"}
          required={true}
        />
      </div>
      <div className="mainAddresMore">
        <MyInput
          changeInput={changeInput}
          title={" Номер объекта "}
          value={adff?.numObj}
          name={"numObj"}
          placeholder={"Номер объекта"}
          required={true}
        />

        <MyInput
          changeInput={changeInput}
          title={"Квартира "}
          value={adff?.apartament}
          name={"apartament"}
          placeholder={"Квартира"}
        />

        <MyInput
          changeInput={changeInput}
          title={"Почтовый индекс "}
          value={adff?.emailIndex}
          name={"emailIndex"}
          placeholder={"Почтовый индекс"}
        />

        <MyInput
          changeInput={changeInput}
          title={"Описание "}
          value={adff?.description}
          name={"description"}
          placeholder={"Описание"}
        />

        <div className="noneDataInputs"></div>
        <div className="noneDataInputs"></div>
      </div>
    </section>
  );
};

export default AddresFizFace;
