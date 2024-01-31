import React from "react";
import "./NotificationPage.scss";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const navigate = useNavigate();

  const rowsData = [
    {
      id: "1",
      number: "№ 1326",
      date: "19.12.2023",
      description:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit.Unde cupiditate rerum expedita veniam repellendusperferendis dicta voluptatem iusto! Nemo aut quasi commodidolorem corporis fugit et esse quod iure necessitatibus,quis pariatur veritatis quia porro id enim quidem facere exrerum. Iste nemo magni doloremque aut accusamus etdoloribus, rerum molestiae quaerat iusto at ipsampraesentium voluptatem facere autem porro accusantium nonculpa tempore voluptatum quam deserunt dicta fugit? Totamaut libero esse similique fugit quidem quod oditconsequuntur quas magnam praesentium beatae dignissimos,dolores consequatur modi repudiandae labore. Suntconsequuntur voluptates culpa aspernatur odit nostrum idmagni, aliquid maxime, pariatur beatae ducimus liberorepudiandae eveniet corporis. ",
      status: "Принять заявку",
    },
    {
      id: "2",
      number: "№ 1326",
      date: "19.12.2023",
      description: "Джумабеков Нурдин Арленович",
      status: "Уведомление",
    },
    // {
    //   id: "3",
    //   number: "№ 1326",
    //   date: "19.12.2023",
    //   description:
    //     " Lorem, ipsum dolor sit amet consectetur adipisicing elit.Unde cupiditate rerum expedita veniam repellendusperferendis dicta voluptatem iusto! Nemo aut quasi commodidolorem corporis fugit et esse quod iure necessitatibus,quis pariatur veritatis quia porro id enim quidem facere exrerum. Iste nemo magni doloremque aut accusamus etdoloribus, rerum molestiae quaerat iusto at ipsampraesentium voluptatem facere autem porro accusantium nonculpa tempore voluptatum quam deserunt dicta fugit? Totamaut libero esse similique fugit quidem quod oditconsequuntur quas magnam praesentium beatae dignissimos,dolores consequatur modi repudiandae labore. Suntconsequuntur voluptates culpa aspernatur odit nostrum idmagni, aliquid maxime, pariatur beatae ducimus liberorepudiandae eveniet corporis. ",
    //   status: "Известить стороны	",
    // },
    // {
    //   id: "4",
    //   number: "№ 1326",
    //   date: "19.12.2023",
    //   description: "Джумабеков Нурдин Арленович",
    //   status: "Принять заявку",
    // },
  ];

  return (
    <div className="mainTables">
      <div className="notification">
        {rowsData?.length === 0 ? (
          // <p>Уведомлений пока что нету</p>
          <></>
        ) : (
          <>
            <div className="main_tabla_isk">
              <table className="table_isk">
                <thead>
                  <tr>
                    <th className="table_isk_th">Дата</th>
                    <th className="table_isk_th">Номер</th>
                    <th className="table_isk_th">Уведомления</th>
                    <th className="table_isk_th">Статус</th>
                  </tr>
                </thead>
                <tbody className="tbody_isk">
                  {rowsData.map((row, index) => (
                    <tr
                      key={index}
                      style={
                        +index % 2 === 0
                          ? { background: "#fff" }
                          : { background: "#f9fafd" }
                      }
                    >
                      <td className="table_isk_td">
                        <div>
                          <span>{row.date}</span>
                        </div>
                      </td>
                      <td className="table_isk_td">
                        <span>{row.number}</span>
                      </td>
                      <td className="table_isk_td">
                        <span>{row.status}</span>
                      </td>
                      <td className="table_isk_td">
                        <span>{row.description}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
