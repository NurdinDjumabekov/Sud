const { Router } = require("express");
const router = Router();
const db = require("../db.js");
const request = require("request");

router.post("/send_sms", async function (req, res) {
  const data = req.body;
  const code_isk = data.id;

  try {
    let files = await db.query_await(
      `SELECT * FROM view_files WHERE code_isk = ${code_isk} AND code_file_type = 23 AND isk_status = 1`
    );

    let fiz_face = await db.query_await(
      `SELECT * FROM view_face_fiz WHERE code_isk = ${code_isk} AND status != -1`
    );
    let ur_face = await db.query_await(
      `SELECT * FROM view_face_ur WHERE code_isk = ${code_isk} AND status != -1`
    );
    let ip_face = await db.query_await(
      `SELECT * FROM view_face_ip WHERE code_isk = ${code_isk} AND status != -1`
    );
    let isk_files = await db.query_await(
      `SELECT * FROM view_files WHERE code_isk = ${code_isk}`
    );

    const list_isk_files = isk_files.recordset; // список всех файлов

    const list_fiz_face = fiz_face.recordsets[0];
    const list_ur_face = ur_face.recordsets[0];
    const list_ip_face = ip_face.recordsets[0];
    const list_all_face = [...list_fiz_face, ...list_ur_face, ...list_ip_face];

    const filteredEmails = list_all_face.filter(
      (item) =>
        item.fiz_face_type == 1 ||
        item.ur_face_type == 1 ||
        item.ip_face_type == 1
    );

    const file_name = JSON.parse(files.recordsets[0][0].file_name).path;
    const mainFileUrl = `http://mttp-renaissance.333.kg/${file_name}`;

    const emailPromises = [];

    for (var i = 0; filteredEmails.length > i; i++) {
      let email = filteredEmails[i].email;
      let email2 = filteredEmails[i].email2;
      let name = filteredEmails[i].name;

      if (!!email || !!email2) {
        let additionalFilesLinks = list_isk_files
          .map((doc) => {
            const docFileName = JSON.parse(doc.file_name).path;
            const docName = doc.document_name || "Без названия";
            return `<a href="http://mttp-renaissance.333.kg/${docFileName}">${docName}</a>`;
          })
          .join("<br/>");

        const fullContent = `<html><head></head>
            <body>
              <p><strong>Здравствуйте, ${name}</strong>, вам поступило исковое заявление.</p>
              <p><br/> <a href="${mainFileUrl}">Уведомление</a></p>
              <p><br/> Дополнительные документы:<br/>${additionalFilesLinks}</p>
            </body></html>`;

        let options = {
          method: "POST",
          url: "http://217.29.18.149:6110/register_mail",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          form: {
            key: "mttpSud",
            header: `Исковое заявление`,
            content: fullContent,
            receiver: email,
          },
        };

        const promise = new Promise((resolve, reject) => {
          request(options, (error, response) => {
            if (error) {
              console.error("Ошибка отправки почты:", error);
              return reject(error);
            }
            console.log("Ответ от почтового сервиса:", response.body);
            resolve(response);
          });
        });

        emailPromises.push(promise);
      }
    }

    await Promise.all(emailPromises);

    res.send({ filteredEmails, mainFileUrl, list_isk_files });
  } catch (error) {
    console.error("Ошибка:", error.message || error); // Логируем ошибку
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
      error: error.message || error,
    });
  }
});

module.exports = router;
