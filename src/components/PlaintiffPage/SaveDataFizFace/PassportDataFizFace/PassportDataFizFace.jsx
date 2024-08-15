/// hooks
import React from "react";
import { useSelector } from "react-redux";

/// style
import "./style.scss";

//// componnets
import ChoiceNoneData from "../../ChoiceNoneData/ChoiceNoneData";
import Selects from "../../../Selects/Selects";
import DataInput from "../../DataInput/DataInput";

/////// helpers
import { selectArr } from "../../../../helpers/dataArr";

const PassportDataFizFace = (props) => {
  const { changeInput } = props;

  const { adff } = useSelector((state) => state.inputSlice);

  return (
    <>
      <div className="sixInputs">
        <div className="threeInputs">
          <ChoiceNoneData
            props={{
              title: `Неизвестна дата рождения`,
              typeKey: adff?.unknownDob,
              type: "unknownDob",
            }}
          />
          {adff?.unknownDob === 0 ? (
            <DataInput
              props={{
                title: `Дата вашего рождения`,
                nameInput: "dob",
                keyData: adff?.dob,
                typeChange: "adff",
                urgently: true,
              }}
            />
          ) : (
            <div>
              <p>Дата вашего рождения</p>
              <input
                placeholder="не обязательное поле"
                readOnly
                className={adff?.unknownDob === 1 ? "disableInput" : ""}
              />
            </div>
          )}
          <Selects
            arr={selectArr}
            initText={"Пол"}
            keys={{ typeKey: adff?.sex, type: "sex" }}
            type="adff"
            urgently={true}
          />
        </div>
        <div className="threeInputs">
          <ChoiceNoneData
            props={{
              title: "Не учитывайте срок действия паспорта",
              typeKey: adff?.unknownDataPassport,
              type: "unknownDataPassport",
            }}
          />
          {adff?.unknownDataPassport === 0 ? (
            <>
              <DataInput
                props={{
                  title: "Дата выдачи",
                  nameInput: "timePassportStart",
                  keyData: adff?.timePassportStart,
                  typeChange: "adff",
                  urgently: true,
                }}
              />
              <DataInput
                props={{
                  title: "Дата истечения срока",
                  nameInput: "timePassportEnd",
                  keyData: adff?.timePassportEnd,
                  typeChange: "adff",
                }}
              />
            </>
          ) : (
            <>
              <div>
                <p>Дата выдачи </p>
                <input
                  placeholder="не обязательное поле"
                  readOnly
                  className={
                    adff?.unknownDataPassport === 1 ? "disableInput" : ""
                  }
                />
              </div>
              <div>
                <p>Дата истечения срока</p>
                <input
                  placeholder="не обязательное поле"
                  readOnly
                  className={
                    adff?.unknownDataPassport === 1 ? "disableInput" : ""
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="sixInputs">
        <div className="threeInputs">
          <ChoiceNoneData
            props={{
              title: "Неизвестен паспорт",
              typeKey: adff?.unknownPassport,
              type: "unknownPassport",
            }}
          />
          <div>
            <p>
              Серия и номер паспорта
              {adff?.unknownPassport === 0 ? <b className="required">*</b> : ""}
            </p>
            <input
              type="text"
              placeholder="Серия и номер паспорта"
              name="passportSeries"
              onChange={changeInput}
              required
              value={adff?.unknownPassport === 1 ? "" : adff?.passportSeries}
              className={adff?.unknownPassport === 1 ? "disableInput" : ""}
              readOnly={adff?.unknownPassport === 1 ? true : false}
            />
          </div>
          <div>
            <p>
              Орган выдачи
              {adff?.unknownPassport === 0 ? <b className="required">*</b> : ""}
            </p>
            <input
              type="text"
              placeholder="Кем выдан*"
              name="organizationPassport"
              onChange={changeInput}
              required
              value={adff?.unknownPassport ? "" : adff?.organizationPassport}
              className={adff?.unknownPassport ? "disableInput" : ""}
              readOnly={adff?.unknownPassport ? true : false}
            />
          </div>
        </div>
        <div className="threeInputs">
          <ChoiceNoneData
            props={{
              title: "Неизвестен ИНН",
              typeKey: adff?.unknownInn,
              type: "unknownInn",
            }}
          />
          <div>
            <p>
              Ваш ИНН
              {adff?.unknownInn === 0 ? <b className="required">*</b> : ""}
            </p>
            <input
              type="text"
              placeholder="ИНН"
              name="inn"
              onChange={changeInput}
              value={adff?.unknownInn === 1 ? "" : adff?.inn}
              required
              className={adff?.unknownInn === 1 ? "disableInput" : ""}
              readOnly={adff?.unknownInn === 1 ? true : false}
            />
          </div>
          <div className="noneDataInputs"></div>
        </div>
      </div>
    </>
  );
};

export default PassportDataFizFace;
