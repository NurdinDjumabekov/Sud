import React from "react";
import "./DocsListInner.scss";

const DocsListInner = ({ arr, arr2 }) => {
  console.log(arr, "arr");
  return (
    <div className="listDocs">
      {arr?.length === 0 && arr?.length === 0 ? (
        <p className="emptyData" style={{ height: "70vh" }}>
          список исков пока что отсутствует...
        </p>
      ) : (
        <>
          <div>
            {arr?.map((i) => (
              <div key={i.id} className="everyCard">
                <div>
                  <div className="everyCard__date">
                    <h5>Февраль</h5>
                    <p>25</p>
                  </div>
                </div>
                <div className="everyCard__data">
                  <h5>ФИО: {i.name ? i.name : "не указано"}</h5>
                  <p>Лицо: юридическое</p>
                  <p>
                    Адрес:
                    {i.country && i.city ? (
                      <>
                        {i.country},{i.city}
                      </>
                    ) : (
                      " не указан"
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div>
            {arr2?.map((i) => (
              <div key={i.id} className="everyCard">
                <div>
                  <div className="everyCard__date">
                    <h5>Февраль</h5>
                    <p>25</p>
                  </div>
                </div>
                <div className="everyCard__data">
                  <h5>ФИО: {i.name ? i.name : "не указано"}</h5>
                  <p>Лицо: юридическое</p>
                  <p>
                    Адрес:
                    {i.country && i.city ? (
                      <>
                        {i.country},{i.city}
                      </>
                    ) : (
                      " не указан"
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DocsListInner;

// <div>
//         {todosApplications?.length === 0 ? (
//           <p className="emptyData"></p>
//         ) : (
//           <>
//             {todosApplications?.map((i) => (
//               <div key={i.id} className="everyCard">
//                 <div>
//                   <div className="everyCard__date">
//                     <h5>Февраль</h5>
//                     <p>25</p>
//                   </div>
//                   {/* <div className="everyCard__btns">
//                     <button>
//                       <img src={editBtn} alt="edit" />
//                     </button>
//                     <button>
//                       <img src={deleteBtn} alt="delete" />
//                     </button>
//                   </div> */}
//                 </div>
//                 <div className="everyCard__data">
//                   <h5>ФИО: {i.name ? i.name : "не указано"}</h5>
//                   <p>Лицо: юридическое</p>
//                   <p>
//                     Адрес:
//                     {i.country && i.city ? (
//                       <>
//                         {i.country},{i.city}
//                       </>
//                     ) : (
//                       " не указан"
//                     )}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </>
//         )}
//       </div>

// <div>
// {todosApplications?.map((i) => (
//   <div key={i.id} className="everyCard">
//     <div>
//       <div className="everyCard__date">
//         <h5>Февраль</h5>
//         <p>25</p>
//       </div>
//       <div className="everyCard__btns">
//         <button>
//           <img src={deleteBtn} alt="delete" />
//         </button>
//         <button>
//           <img src={editBtn} alt="edit" />
//         </button>
//       </div>
//     </div>
//     <div className="everyCard__data">
//       <h5>ФИО: {i.name ? i.name : "не указано"}</h5>
//       <p>Лицо: юридическое</p>
//       <p>Лицssо: sadasdasdasdasdasas</p>
//       <p>
//         Адрес:
//         {i.country && i.city ? (
//           <>
//             {i.country},{i.city}
//           </>
//         ) : (
//           " не указан"
//         )}
//       </p>
//     </div>
//   </div>
// ))}
// </div>
