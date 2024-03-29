import React from "react";
import "./NotificationPage.scss";
import { useNavigate } from "react-router-dom";
import {
  notificationCount,
  notificationRead,
  toTakeNotification,
} from "../../store/reducers/notificationSlice";
import { useDispatch, useSelector } from "react-redux";

const NotificationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { listNotifs } = useSelector((state) => state.notificationSlice);

  React.useEffect(() => {
    dispatch(toTakeNotification({ tokenA }));
    const newData = listNotifs?.map((i) => i?.codeid);
    return () => {
      dispatch(notificationRead({ tokenA, notifs: newData }));
    };
  }, []);

  const sortNotif = (arr) => {
    const lookList = arr?.filter((i) => (+i?.is_read === 1 ? i : ""));
    const lookNoList = arr?.filter((i) => (+i?.is_read === 0 ? i : ""));
    // console.log(lookList, lookNoList);
    return {
      lookList,
      lookNoList,
    };
  };

  return (
    <div className="mainTables notifMain">
      <div className="notification">
        <h4>Уведомления</h4>
        {/* <div className="notification__titles">
          <h3>Дата и время</h3>
          <h3>Номер иска</h3>
          <h3>Статус</h3>
        </div> */}
        {sortNotif(listNotifs)?.lookNoList?.length === 0 ? (
          <></>
        ) : (
          <>
            {sortNotif(listNotifs)?.lookNoList?.map((notif) => (
              <div
                className="notification__every"
                key={notif?.codeid}
                style={{
                  background: "rgba(159, 217, 151, 0.24)",
                  border: "none",
                  borderRadius: "5px",
                  padding: "3px 12px",
                }}
              >
                <div>
                  <p>
                    № {notif?.isk_number},
                    <span style={{ margin: "0px 10px" }}>{notif?.date}, </span>
                    {notif?.time}
                  </p>
                </div>
                <div className="notification__every__inner">
                  <p style={{ color: "green" }}>
                    {notif?.fio
                      ? `${notif?.fio} : ${notif?.comment?.toLocaleLowerCase()}`
                      : `${notif?.comment}`}
                  </p>
                  {/* <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam laborum impedit minus veritatis necessitatibus,
                    asperiores quo! Quo eveniet id voluptatibus labore officiis
                    nulla impedit dolore?
                  </p> */}
                </div>
              </div>
            ))}
            <div className="line"></div>
          </>
        )}
        {sortNotif(listNotifs)?.lookList?.map((notif) => (
          <>
            <div className="notification__every" key={notif?.codeid}>
              <div>
                <p>
                  № {notif?.isk_number},
                  <span style={{ margin: "0px 10px" }}>{notif?.date}, </span>
                  {notif?.time}
                </p>
              </div>
              <div className="notification__every__inner">
                <p>
                  {notif?.fio
                    ? `${notif?.fio} : ${notif?.comment?.toLocaleLowerCase()}`
                    : `${notif?.comment}`}
                </p>
                {/* <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam laborum impedit minus veritatis necessitatibus,
                  asperiores quo! Quo eveniet id voluptatibus labore officiis
                  nulla impedit dolore?
                </p> */}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
///  и еще небольшое описание....
export default NotificationPage;

// import React from "react";
// import "./NotificationPage.scss";
// import { useNavigate } from "react-router-dom";
// import {
//   notificationCount,
//   notificationRead,
//   toTakeNotification,
// } from "../../store/reducers/notificationSlice";
// import { useDispatch, useSelector } from "react-redux";

// const NotificationPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { tokenA } = useSelector((state) => state.saveDataSlice);
//   const { listNotifs } = useSelector((state) => state.notificationSlice);

//   React.useEffect(() => {
//     dispatch(toTakeNotification({ tokenA }));
//     const newData = listNotifs?.map((i) => i?.codeid);
//     return () => {
//       dispatch(notificationRead({ tokenA, notifs: newData }));
//     };
//   }, []);

//   const sortNotif = (arr) => {
//     const lookList = arr?.filter((i) => (+i?.is_read === 1 ? i : ""));
//     const lookNoList = arr?.filter((i) => (+i?.is_read === 0 ? i : ""));
//     console.log(lookList, lookNoList);
//     return {
//       lookList,
//       lookNoList,
//     };
//   };

//   return (
//     <div className="mainTables">
//       <div className="notification">
//         <div className="notification__titles">
//           <h3>Дата и время</h3>
//           <h3>Номер иска</h3>
//           <h3>Статус</h3>
//         </div>
//         {sortNotif(listNotifs)?.lookNoList?.length === 0 ? (
//           <></>
//         ) : (
//           <>
//             <h4>Новые уведомления</h4>
//             {sortNotif(listNotifs)?.lookNoList?.map((notif) => (
//               <div
//                 className="notification__every"
//                 key={notif?.codeid}
//                 style={
//                   notif?.comment?.includes("Отклонён")
//                     ? { color: "red", background: "rgba(242, 195, 195, 0.43)" }
//                     : notif?.comment?.includes("уведомлен")
//                     ? {
//                         color: "#000",
//                         background: "rgb(210, 218 ,92 , 0.29)",
//                       }
//                     : notif?.comment?.includes("подтверждён")
//                     ? {
//                         color: "green",
//                         background: "rgba(159, 217, 151, 0.24)",
//                       }
//                     : {
//                         color: "green",
//                         background: "rgba(159, 217, 151, 0.24)",
//                       }
//                 }
//               >
//                 <p>
//                   {notif?.date}
//                   <span style={{ marginLeft: "10px" }}>{notif?.time}</span>
//                 </p>
//                 <p>{notif?.isk_number}</p>
//                 <p>{notif?.comment}</p>
//               </div>
//             ))}
//             <div className="line"></div>
//           </>
//         )}
//         {sortNotif(listNotifs)?.lookList?.map((notif) => (
//           <div
//             className="notification__every"
//             key={notif?.codeid}
//             style={
//               notif?.comment?.includes("Отклонён")
//                 ? { color: "red" }
//                 : { color: "green" }
//             }
//           >
//             <p>
//               {notif?.date}
//               <span style={{ marginLeft: "10px" }}>{notif?.time}</span>
//             </p>
//             <p>{notif?.isk_number}</p>
//             <p>{notif?.comment}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NotificationPage;
