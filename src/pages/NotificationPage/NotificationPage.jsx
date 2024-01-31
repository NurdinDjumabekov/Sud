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
    setTimeout(() => {
      dispatch(notificationRead({ tokenA, notifs: newData }));
    }, 2000);
  }, []);

  console.log(listNotifs, "listNotifs");

  return (
    <div className="mainTables">
      <div className="notification">
        <div className="notification__titles">
          <h3>Дата</h3>
          <h3>Номер иска</h3>
          <h3>Статус</h3>
        </div>
        {listNotifs?.map((notif) => (
          <div
            className="notification__every"
            key={notif?.codeid}
            style={
              notif?.comment?.includes("Принят")
                ? { color: "green" }
                : { color: "red" }
            }
          >
            <p>{notif?.date}</p>
            <p>{notif?.isk_number}</p>
            <p>{notif?.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
