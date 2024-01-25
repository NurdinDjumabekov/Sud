import React, { useState } from "react";
import "./GeneralInfo.scss";
import Selects from "../../Selects/Selects";
import { useDispatch, useSelector } from "react-redux";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";
// import { selectUserStatus } from "../../../helpers/dataArr";

const GeneralInfo = () => {
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { selHarSpora, selPrimPravo, selReglament, selLangArbitr } =
    useSelector((state) => state.selectsSlice);
  const dispatch = useDispatch();

  // console.log(todosApplications, "todosApplications");
  return (
    <div className="plaintiFilling__container">
      <div className="generalInfo">
        <form>
          <div className="blockSelects">
            <Selects
              arr={selPrimPravo}
              initText={"Применимое право"}
              keys={{
                typeKey: todosApplications.prim_pravo,
                type: "prim_pravo",
              }}
              type="todos"
            />
            <Selects
              arr={selReglament}
              initText={"Регламент"}
              keys={{
                typeKey: todosApplications.reglament,
                type: "reglament",
              }}
              type="todos"
            />
          </div>
          <div className="blockSelects">
            <Selects
              arr={selHarSpora}
              initText={"Характер спора"}
              keys={{
                typeKey: todosApplications.haracter_spor,
                type: "haracter_spor",
              }}
              type="todos"
            />
            <Selects
              arr={selLangArbitr}
              initText={"Язык арбитража"}
              keys={{
                typeKey: todosApplications.arbitr_lang,
                type: "arbitr_lang",
              }}
              type="todos"
            />
          </div>
          <div className="blockCheckBox">
            <input
              type="checkbox"
              id="lab"
              name="is_arbitr_po_dogovor"
              onChange={(e) =>
                dispatch(
                  changeTodosApplications({
                    ...todosApplications,
                    is_arbitr_po_dogovor: e.target.checked ? 1 : 0,
                  })
                )
              }
              checked={todosApplications.is_arbitr_po_dogovor === 1}
            />
            <label htmlFor="lab">Выбрать арбитра по договору</label>
          </div>
          {/* <button className="saveBtn">Сохранить</button> */}
        </form>
      </div>
    </div>
  );
};

export default GeneralInfo;

// ///////////////////////////////////////////////////////////
// $(document).on("click", "#count_sbor", function (e) {
//   var isk_sum = $("#count_sum").val();
//   var isk_type = $("#count_type").val();
//   var isk_reglament = $("#count_reglament").val();
//   var isk_arbitr = $("#count_arbitr").val();
//   var reg_sbor = 0.0;
//   var reg_sbor1 = 0.0;
//   var arbitr_sbor = 0.0;
//   var arbitr_sbor1 = 0.0;
//   var arbitr_sbor3 = 0.0;
//   if (isk_sum != "" && isk_sum != "NULL") {
//     if (isk_sum > 0 && isk_sum <= 500) {
//       reg_sbor = 10;
//     } else if (isk_sum >= 501 && isk_sum <= 1000) {
//       reg_sbor = 25;
//     } else if (isk_sum >= 1001 && isk_sum <= 5000) {
//       reg_sbor = 150;
//     } else if (isk_sum >= 5001 && isk_sum <= 10000) {
//       reg_sbor = 300;
//     } else if (isk_sum > 10000) {
//       reg_sbor = 503;
//     }
//     reg_sbor1 =
//       parseFloat(reg_sbor) +
//       (parseFloat(reg_sbor) * 12) / 100 +
//       (parseFloat(reg_sbor) * 2) / 100;
//     //console.log(parseFloat(reg_sbor1))

//     var per = 0;
//     if (isk_type == 2) {
//       if (isk_sum <= 5000) {
//         arbitr_sbor = 250 + (250 * 14) / 100;
//       } else if (isk_sum >= 5001 && isk_sum <= 7500) {
//         arbitr_sbor = 350 + (350 * 14) / 100;
//       } else if (isk_sum >= 7501 && isk_sum <= 10000) {
//         arbitr_sbor = 500 + (500 * 14) / 100;
//       } else if (isk_sum >= 10001 && isk_sum <= 50000) {
//         arbitr_sbor = 1000 + (1000 * 14) / 100;
//       } else if (isk_sum >= 50001 && isk_sum <= 100000) {
//         arbitr_sbor = 1500 + (1500 * 14) / 100;
//       } else if (isk_sum >= 100001) {
//         arbitr_sbor = 2000 + (2000 * 14) / 100;
//       }
//     } else {
//       if (isk_sum > 0 && isk_sum <= 250) {
//         if (isk_sum > 10) {
//           per = ((isk_sum - 10) * 5) / 100;
//         }
//         arbitr_sbor1 = 10 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       } else if (isk_sum >= 251 && isk_sum <= 500) {
//         if (isk_sum > 15) {
//           per = ((isk_sum - 15) * 10) / 100;
//         }
//         arbitr_sbor1 = 15 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       } else if (isk_sum >= 501 && isk_sum <= 750) {
//         if (isk_sum > 25) {
//           per = ((isk_sum - 25) * 10) / 100;
//         }
//         arbitr_sbor1 = 25 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       } else if (isk_sum >= 751 && isk_sum <= 1000) {
//         if (isk_sum > 35) {
//           per = ((isk_sum - 35) * 10) / 100;
//         }
//         arbitr_sbor1 = 35 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       } else if (isk_sum >= 1001 && isk_sum <= 5000) {
//         if (isk_sum > 1000) {
//           per = ((isk_sum - 1000) * 4) / 100;
//         }
//         arbitr_sbor1 = 150 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       } else if (isk_sum >= 5001 && isk_sum <= 10000) {
//         if (isk_sum > 5000) {
//           per = ((isk_sum - 5000) * 3) / 100;
//         }
//         arbitr_sbor1 = 310 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       } else if (isk_sum >= 10001 && isk_sum <= 50000) {
//         if (isk_sum > 10000) {
//           per = ((isk_sum - 10000) * 2) / 100;
//         }
//         arbitr_sbor1 = 500 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       } else if (isk_sum >= 50001 && isk_sum <= 100000) {
//         if (isk_sum > 50000) {
//           per = ((isk_sum - 50000) * 1.5) / 100;
//         }
//         arbitr_sbor1 = 1300 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       } else if (isk_sum >= 100001 && isk_sum <= 200000) {
//         if (isk_sum > 100000) {
//           per = ((isk_sum - 100000) * 1) / 100;
//         }
//         arbitr_sbor1 = 2050 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       } else if (isk_sum >= 200001 && isk_sum <= 500000) {
//         if (isk_sum > 200000) {
//           per = ((isk_sum - 200000) * 0.9) / 100;
//         }
//         arbitr_sbor1 = 3050 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       } else if (isk_sum >= 500001 && isk_sum <= 1000000) {
//         if (isk_sum > 500000) {
//           per = ((isk_sum - 500000) * 0.8) / 100;
//         }
//         arbitr_sbor1 = 5750 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       } else if (isk_sum >= 1000001 && isk_sum <= 2000000) {
//         if (isk_sum > 1000000) {
//           per = ((isk_sum - 1000000) * 0.7) / 100;
//         }
//         arbitr_sbor1 = 9750 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       } else if (isk_sum >= 2000001 && isk_sum <= 5000000) {
//         if (isk_sum > 2000000) {
//           per = ((isk_sum - 2000000) * 0.6) / 100;
//         }
//         arbitr_sbor1 = 16750 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       } else if (isk_sum > 5000000) {
//         if (isk_sum > 5000000) {
//           per = ((isk_sum - 5000000) * 0.5) / 100;
//         }
//         arbitr_sbor1 = 34750 + per;
//         arbitr_sbor = arbitr_sbor1 + (arbitr_sbor1 * 14) / 100;
//       }
//     }
//     arbitr_sbor3 = arbitr_sbor - (arbitr_sbor * 30) / 100;
//   }
//   $("#reg_sbor").html(`<table>
//                       <thead>
//                         <tr style="color: #679dcb;">
//                           <th>Cбор</th>
//                           <th>Сумма</th>
//                           <th>Обычный регламент<p>единоличный арбитр (-30%)</p></th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>Регистрационный (c НДС 12% и налогом с продаж 2%)</td>
//                           <td>$${Math.floor(reg_sbor * 100) / 100}</td>
//                           <td>$${Math.floor(reg_sbor * 100) / 100}</td>
//                         </tr>
//                         <tr>
//                           <td>Арбитражный (c НДС 12% и налогом с продаж 2%)</td>
//                           <td>$${Math.floor(arbitr_sbor * 100) / 100}</td>
//                           <td>$${Math.floor(arbitr_sbor3 * 100) / 100}</td>
//                         </tr>
//                       </tbody>
//                     </table>`);
//   if (isk_type == null) {
//     $("#count_type").val("1");
//   }
// });
