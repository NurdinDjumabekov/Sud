const { Router } = require("express");
const router = Router();
const moment = require("moment");
const db = require("../db.js");
const { delete_file, files_path_name, upload, makeid } = require("./utils.js");
const { verifyToken } = require("./jwt.js");
const {
  create_isk_plaintiff_defendant,
  create_isk_represantetive,
  get_isk_defendant,
  get_isk_defendant_repr,
  get_isk_plaintiff,
  get_isk_plaintiff_repr,
  get_data_sides, /// на потом
} = require("./fiz_ur_face.js");
const { create_edit_todo } = require("./todo.js");
const request = require("request");
const pdf = require("pdf-creator-node");

router.post("/crud", async function (req, res) {
  const data = req.body;
  const user = verifyToken(req.headers["authorization"]);

  const formatDate = (date) =>
    date && date !== "null"
      ? moment(date, "DD.MM.YYYY").format("YYYY-MM-DD")
      : "";

  const arbitr_pay_end_date = formatDate(data.arbitr_pay_end_date);
  const arbitr_doplata_end_date = formatDate(data.arbitr_doplata_end_date);

  if (user && [1, 2, 4].includes(user.type_user)) {
    try {
      let code_user = user.codeid;
      let codeid = data.codeid ?? 0;
      const { action_type, name, description, motivation } = data;
      const { obosnovanie, finance_raschet, law_links, claim, summ } = data;
      const { summ_curr, arbitr_fee, arbitr_curr, registr_fee } = data;
      const { registr_curr, doplata_summ, nadbavka_curr, prim_pravo } = data;
      const { reglament, haracter_spor, arbitr_lang, place_arbitration } = data;

      let arbitr_po_dogovor = data.is_arbitr_po_dogovor;
      let isk_summ = data.isk_summ === "" ? 0 : data.isk_summ;
      let isk_summ_curr = data.isk_summ_curr ?? 0;
      let is_imush_isk = data.non_proprietary;

      let code_sec_create =
        user.type_user === 1 || user.type_user === 2 ? user.codeid : 0;
      let code_sec_create_type =
        user.type_user === 1 || user.type_user === 2 ? user.type_user : 0;

      const executeQuery = async (query) => {
        return await db.query_await(query);
      };

      if (action_type === 1) {
        var db_result = await executeQuery(
          `exec [create_edit_isk] ${action_type}, 0, ${code_user}, '', '', '', '', '',
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, ''`
        );
        codeid = 0;
      } else if (action_type === 3 && codeid !== 0) {
        var db_result = await executeQuery(
          `exec [create_edit_isk] ${action_type}, ${codeid}, '', '', '', '', '', '',
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', -1, 0, 0, 0, ''`
        );

        var isk_files = await executeQuery(
          `SELECT file_name FROM isk_file WHERE code_isk = ${codeid}`
        );
        await Promise.all(
          isk_files.recordset.map(async (file) => {
            var file_name = JSON.parse(file.file_name).name;
            await delete_file(file_name);
          })
        );
      } else if (action_type === 4 && codeid !== 0) {
        var db_result = await executeQuery(
          `exec [create_edit_isk] ${action_type}, ${codeid}, '', '', '', '', '', '',
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 1, 0, ''`
        );
      } else {
        var db_result = await executeQuery(
          `exec [create_edit_isk] ${action_type}, ${codeid}, ${code_user}, '${name}', '${description}', '${motivation}', '${obosnovanie}', '${finance_raschet}',
            '${law_links}', '${claim}', '${summ}', ${summ_curr}, '${arbitr_fee}', ${arbitr_curr}, '${registr_fee}', ${registr_curr}, '${doplata_summ}', ${nadbavka_curr}, '${arbitr_pay_end_date}', 
            '${arbitr_doplata_end_date}', ${prim_pravo}, ${reglament}, ${haracter_spor}, ${arbitr_lang}, ${arbitr_po_dogovor}, 0, ${isk_summ}, ${isk_summ_curr}, ${is_imush_isk}, ${code_sec_create}, ${code_sec_create_type}, '${place_arbitration}'`
        );

        ///// создание и редактирование всех лиц и сторон
        if (data.defendant) {
          await create_isk_plaintiff_defendant(data.defendant, code_user, 2);
        }
        if (data.plaintiff) {
          await create_isk_plaintiff_defendant(data.plaintiff, code_user, 1);
        }
        if (data.plaintiffResper) {
          await create_isk_represantetive(data.plaintiffResper, code_user, 3);
        }
        if (data.defendantResper) {
          await create_isk_represantetive(data.defendantResper, code_user, 4);
        }
        if (data.claim) {
          await create_edit_todo(data.claim, codeid);
        }
      }

      if (codeid !== 0) {
        const [plaintiff, defendant, plaintiffResper, defendantResper] =
          await Promise.all([
            get_isk_plaintiff(codeid),
            get_isk_defendant(codeid),
            get_isk_plaintiff_repr(codeid),
            get_isk_defendant_repr(codeid),
          ]);

        const { result, codeid: newCodeid } = db_result.recordset[0];
        const sendObj = { result, codeid: newCodeid };
        const sides = { plaintiff, defendant, plaintiffResper };

        res.send({ ...sendObj, ...sides, defendantResper });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.send({ result: 0, error: "Auth failed" });
  }
});

// api/isks/get
router.get("/get", async function (req, res) {
  const user = verifyToken(req.headers["authorization"]);
  if (user) {
    try {
      var code_user = user.codeid;
      var type_user = user.type_user;
      var status = req.query.status; ///  1 принят секратарем, 2 отклонен секретарем, 3 Принятые председателем, 4 Отклонённые председателем, (5 все иски, 6 поданные, 7 принятые, 8 отказанные) для истца, 9 = на доработке
      let isk_count = 0,
        prinat_pred_total = 0,
        otclon_pred_total = 0,
        prinat_sec_total = 0,
        otclon_sec_total = 0,
        prinat_total = 0,
        otclon_total = 0,
        isk_draft_total = 0,
        na_dorabotke = 0,
        secretar_isk = 0;
      var isk_status = "",
        codefile = "",
        sec_create_isks = "";

      if (type_user == 2 || type_user == 3) {
        // Отв секретарь, Председатель
        codefile = ", 17";
        var isk_counts = await db.query_await(`
                    SELECT
                        COUNT(CASE WHEN isk_status = 1 THEN codeid END) AS prinat_sec,
                        COUNT(CASE WHEN isk_status = 2 THEN codeid END) AS otclon_sec,
                        COUNT(CASE WHEN isk_status = 3 or isk_status = 5 THEN codeid END) AS prinat_pred,
                        COUNT(CASE WHEN isk_status = 4 THEN codeid END) AS otclon_pred,
                        COUNT(CASE WHEN  status = 1 THEN codeid END) AS isk_no_status_total,
                        COUNT(CASE WHEN isk_status = 6  and status = 1 THEN codeid END) AS na_dorabotke
                    FROM view_isk;`);
        isk_count = isk_counts.recordset[0].isk_no_status_total;
        prinat_pred_total = isk_counts.recordset[0].prinat_pred;
        otclon_pred_total = isk_counts.recordset[0].otclon_pred;
        prinat_sec_total = isk_counts.recordset[0].prinat_sec;
        otclon_sec_total = isk_counts.recordset[0].otclon_sec;
        na_dorabotke = isk_counts.recordset[0].na_dorabotke;

        // сортировка исков по статусу для секретаря и председателя
        if (status == 0) {
          isk_status = `status = 1`; // status 1 - подан 0 - нет in 0, 1
        } else if (status == 1) {
          isk_status = `isk_status = 1 and status = 1`;
        } else if (status == 2) {
          isk_status = `isk_status = 2 and status = 1`;
        } else if (status == 3) {
          isk_status = `isk_status = 3 and status = 1`;
        } else if (status == 4) {
          isk_status = `isk_status = 4 and status = 1`;
        } else if (status == 9) {
          isk_status = `isk_status = 6 and status = 1`;
        }

        if (type_user == 2) {
          // sec_create_isks = `or ((code_sec_create = ${code_user} and code_sec_create_type = 2 and status in (1, 0)) or (code_sec_create_type = 1 and status = 1) and ${isk_status})`;
        } else if (type_user == 3) {
          sec_create_isks = "and status = 1";
        }
      } else if (type_user == 4 || type_user == 5) {
        // type_user = 4 истец type_user = 5 ответчик
        var db_result = await db.query_await(
          `select code_isk from isk_users where code_user = ${code_user}`
        );
        var code_isks = db_result.recordset.map((row) => row.code_isk);
        var code_isk_where = "";
        if (code_isks.length > 0) {
          code_isk_where = `codeid in (${code_isks}) or`;
        }
        var isk_counts = await db.query_await(`
                    SELECT
                        COUNT(CASE WHEN (${code_isk_where} code_user = ${code_user}) AND (isk_status = 1 OR isk_status = 3 or isk_status = 5) THEN codeid END) AS prinat_total,
                        COUNT(CASE WHEN (${code_isk_where} code_user = ${code_user}) AND (isk_status = 2 OR isk_status = 4) THEN codeid END) AS otclon_total,
                        COUNT(CASE WHEN (${code_isk_where} code_user = ${code_user}) AND status = 1 and isk_status = 0 THEN codeid END) AS isk_total,
                        COUNT(CASE WHEN (${code_isk_where} code_user = ${code_user}) THEN codeid END) AS isk_draft_total,
                        COUNT(CASE WHEN (${code_isk_where} code_user = ${code_user}) AND (isk_status = 6) THEN codeid END) AS na_dorabotke
                    FROM view_isk;`);

        isk_count = isk_counts.recordset[0].isk_total;
        prinat_total = isk_counts.recordset[0].prinat_total;
        otclon_total = isk_counts.recordset[0].otclon_total;
        isk_draft_total = isk_counts.recordset[0].isk_draft_total;
        na_dorabotke = isk_counts.recordset[0].na_dorabotke;

        // сортировка исков для истца
        if (status == 6) {
          isk_status = `(${code_isk_where} code_user = ${code_user}) and status = 1 and isk_status = 0`;
        } else if (status == 7) {
          isk_status = `(${code_isk_where} code_user = ${code_user}) and (isk_status = 1 or isk_status = 3 or isk_status = 5)`;
        } else if (status == 8) {
          isk_status = `(${code_isk_where} code_user = ${code_user}) and (isk_status = 2 or isk_status = 4)`;
        } else if (status == 9) {
          isk_status = `(${code_isk_where} code_user = ${code_user})  and (isk_status = 6)`;
        } else {
          isk_status = `(${code_isk_where} code_user = ${code_user})`;
        }
      } else if ((type_user = 1)) {
        // обычный секретарь
        //isk_status = `code_secretar =  ${code_user}` // все дела которые привязаны к этому секретарю
        codefile = ", 17";
        var isk_counts = await db.query_await(`
                SELECT
                COUNT(CASE WHEN isk_status != 6 and status = 1 or (code_sec_create = ${code_user} and code_sec_create_type = 1 and isk_status != 6) THEN codeid END) AS isk_no_status_total,
                COUNT(CASE WHEN isk_status = 6 THEN codeid END) AS na_dorabotke,
                COUNT(CASE WHEN code_secretar = ${code_user} THEN codeid END) AS secretar_isk
                FROM view_isk;`);
        isk_count = isk_counts.recordset[0].isk_no_status_total;
        na_dorabotke = isk_counts.recordset[0].na_dorabotke;
        secretar_isk = isk_counts.recordset[0].secretar_isk;

        // сортировка исков по статусу для секретаря
        if (status == 0) {
          sec_create_isks = `or (code_sec_create = ${code_user} and code_sec_create_type = 1 and isk_status != 6)`;
          isk_status = `isk_status != 6 and status = 1 `;
        } else if (status == 9) {
          isk_status = `isk_status = 6 and status = 1`;
          sec_create_isks = "";
        } else if (status == 10) {
          // иски конкретного секретаря, назначенные председателем
          isk_status = `code_secretar = ${code_user}`;
          sec_create_isks = "";
        }
        console.log(isk_status, "isk_status");
      }
      console.log(
        `SELECT * FROM view_isk WHERE ${isk_status} ${sec_create_isks} order by codeid DESC`
      );
      var isks = await db.query_await(
        `SELECT * FROM view_isk WHERE ${isk_status} ${sec_create_isks} order by codeid DESC`
      );

      for (var i = 0; isks.recordset.length > i; i++) {
        const isk = isks.recordset[i];
        var codefile_pred_prinat = "";

        if (isk.status == 1) {
          var files = await db.query_await(
            `SELECT * FROM view_files WHERE code_isk = ${isk.codeid} and code_file_type in (${codefile_pred_prinat} 12, 13, 14, 15, 18, 22, 23 ${codefile}) and isk_status = 1`
          ); // Определение о принятий и об отказе от председателя, исковое заявление (принятых исков)
        } else if (isk.status == 0) {
          var files = { recordset: [] };
        } else if (isk.isk_status == 3 || isk.isk_status == 5) {
          codefile_pred_prinat = "12,";
        }

        var fiz_face = await db.query_await(
          `SELECT codeid, name, fiz_face_type, status FROM view_face_fiz WHERE code_user = ${isk.code_user} and status != -1 and code_isk = ${isk.codeid}`
        );

        var ur_face = await db.query_await(
          `SELECT codeid, name, ur_face_type, status FROM view_face_ur WHERE code_user = ${isk.code_user} and status != -1 and code_isk = ${isk.codeid}`
        );

        var ip_face = await db.query_await(
          `SELECT codeid, name, ip_face_type, status FROM face_ip WHERE code_user = ${isk.code_user} and status != -1 and code_isk = ${isk.codeid}`
        );

        var listArbitrs = await db.query_await(
          `select * from view_arbitrs where code_dela = ${isk.codeid}`
        );

        var plaintiff = [];
        var defendant = [];
        var arbitrs = [];

        for (var e = 0; fiz_face.recordset.length > e; e++) {
          const element = fiz_face.recordset[e];
          if (element.fiz_face_type == 1) {
            plaintiff.push(element);
          } else if (element.fiz_face_type == 2) {
            defendant.push(element);
          }
        }

        for (var e = 0; ur_face.recordset.length > e; e++) {
          const element = ur_face.recordset[e];
          if (element.ur_face_type == 1) {
            plaintiff.push(element);
          } else if (element.ur_face_type == 2) {
            defendant.push(element);
          }
        }

        for (var e = 0; ip_face.recordset.length > e; e++) {
          const element = ip_face.recordset[e];
          if (element.ip_face_type == 1) {
            plaintiff.push(element);
          } else if (element.ip_face_type == 2) {
            defendant.push(element);
          }
        }

        for (var c = 0; listArbitrs.recordset.length > c; c++) {
          const element = listArbitrs.recordset[c];
          arbitrs.push(element);
        }

        isks.recordset[i].files = await files_path_name(files);
        isks.recordset[i].plaintiff = plaintiff;
        isks.recordset[i].defendant = defendant;
        isks.recordset[i].arbitrs = arbitrs;
      }
      res.send({
        recordset: isks.recordset,
        isk_count: isk_count,
        prinat_pred_total: prinat_pred_total,
        otclon_pred_total: otclon_pred_total,
        prinat_sec_total: prinat_sec_total,
        otclon_sec_total: otclon_sec_total,
        prinat_total: prinat_total,
        otclon_total: otclon_total,
        isk_draft_total: isk_draft_total,
        na_dorabotke: na_dorabotke,
        secretar_isk: secretar_isk,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Что-то пошло не так, попробуйте снова",
        error: error,
      });
    }
  } else {
    res.send({ result: 0, error: "Auth Failed" });
  }
});

// api/isks/get
router.get("/get/:id", async function (req, res) {
  const user = verifyToken(req.headers["authorization"]);
  if (user) {
    try {
      var code_user = user.codeid;
      var type_user = user.type_user;
      var codeid = req.params.id;
      var isk_proccess_status = "";

      if (type_user == 3 || type_user == 1 || type_user == 2) {
        isk_proccess_status = "status = 1 and"; // список всех исков если это пред. или же секр.
        if (type_user == 1 || type_user == 2) {
          isk_proccess_status = "";
        }
      } else {
        // type_user = 4 истец type_user = 5 ответчик
        isk_proccess_status = `code_user = ${code_user} and  `; // список черновиков для конкретного юзера
      }
      console.log(
        `SELECT * FROM view_isk WHERE ${isk_proccess_status} codeid = ${codeid}`,
        "isk_proccess_status"
      );
      //SELECT * FROM view_isk WHERE (code_sec_create = 3 and code_sec_create_type = 2 and status in (0, 1)) or codeid = 681 isk_proccess_status

      var isk = await db.query_await(
        `SELECT * FROM view_isk WHERE ${isk_proccess_status} codeid = ${codeid}`
      );
      if (isk.recordset.length > 0) {
        var isk_codeid = isk.recordset[0].codeid;
        var file_content = await db.query_await(
          `SELECT content FROM view_files WHERE code_isk = ${isk_codeid} and code_file_type =  15`
        ); // исковое заявление
        var file_content_prinat = await db.query_await(
          `SELECT content FROM view_files WHERE code_isk = ${isk_codeid} and code_file_type =  12`
        ); // Определение о принятий и об отказе от председателя

        var files = await db.query_await(
          `SELECT * FROM view_files WHERE code_isk = ${isk_codeid}`
        );
        var fiz_face = await db.query_await(
          `SELECT * FROM view_face_fiz WHERE  status != -1 and code_isk = ${isk_codeid}`
        );
        var ur_face = await db.query_await(
          `SELECT * FROM view_face_ur WHERE status != -1 and code_isk = ${isk_codeid}`
        );
        var ip_face = await db.query_await(
          `SELECT * FROM view_face_ip WHERE status != -1 and code_isk = ${isk_codeid}`
        );
        var todo = await db.query_await(
          `SELECT [name] as claimText,[status],[number] FROM [isk_todo] where code_isk = ${isk_codeid} and status != -1`
        );

        var plaintiff = [];
        var plaintiffResper = [];
        var defendant = [];
        var defendantResper = [];

        for (var e = 0; fiz_face.recordset.length > e; e++) {
          const element = fiz_face.recordset[e];
          if (element.fiz_face_type == 1) {
            plaintiff.push(element);
          } else if (element.fiz_face_type == 2) {
            defendant.push(element);
          } else if (element.fiz_face_type == 3) {
            plaintiffResper.push(element);
          } else if (element.fiz_face_type == 4) {
            defendantResper.push(element);
          }
        }

        for (var e = 0; ur_face.recordset.length > e; e++) {
          const element = ur_face.recordset[e];
          if (element.ur_face_type == 1) {
            plaintiff.push(element);
          } else if (element.ur_face_type == 2) {
            defendant.push(element);
          }
        }

        for (var e = 0; ip_face.recordset.length > e; e++) {
          const element = ip_face.recordset[e];
          if (element.ip_face_type == 1) {
            plaintiff.push(element);
          } else if (element.ip_face_type == 2) {
            defendant.push(element);
          }
        }

        isk.recordset[0].files = await files_path_name(files);
        isk.recordset[0].plaintiff = plaintiff;
        isk.recordset[0].defendant = defendant;
        isk.recordset[0].plaintiffResper = plaintiffResper;
        isk.recordset[0].defendantResper = defendantResper;
        isk.recordset[0].arbitrs = [];
        isk.recordset[0].content = "";
        isk.recordset[0].claim = todo.recordset;
        if (
          file_content.recordset.length > 0 &&
          file_content.recordset[0].content != null &&
          file_content.recordset[0].content != "null"
        ) {
          isk.recordset[0].content = file_content.recordset[0].content;
        }
        if (
          file_content_prinat.recordset.length > 0 &&
          file_content_prinat.recordset[0].content != null &&
          file_content_prinat.recordset[0].content != "null"
        ) {
          isk.recordset[0].contentPred =
            file_content_prinat.recordset[0].content;
        }
        res.send(isk.recordset[0]);
      } else {
        res.send({});
      }
    } catch (error) {
      res.status(500).json({
        message: "Что-то пошло не так, попробуйте снова",
        error: error,
      });
    }
  } else {
    res.send({ result: 0, error: "Auth Failed" });
  }
});

// api/isks/set_isk_status
router.post("/set_isk_status", async function (req, res) {
  const user = verifyToken(req.headers["authorization"]);
  const data = req.body;
  if (user) {
    try {
      var code_user = user.codeid;
      var type_user = user.type_user;

      var code_isk = data.code_isk;
      var isk_status = data.isk_status; ///  1 принят секратарем, 2 отклонен секретарем, 3 Принятые председателем, 4 Отклонённые председателем, 5 - ответчик уведомлен
      var description = data.description;
      var code_secretar = data.code_secretar;
      console.log(
        `exec edit_isk_status ${code_user}, ${code_isk}, ${type_user}, ${isk_status}, '${description}'`
      );
      var db_result = await db.query_await(
        `exec edit_isk_status ${code_user}, ${code_isk}, ${type_user}, ${isk_status}, '${description}'`
      );
      var isk = await db.query_await(
        `select isk_number, codeid from isk where codeid = ${code_isk}`
      );
      // if ((isk_status == 3 && code_secretar != undefined && code_secretar != 0)) {
      //     await db.query_await(`exec set_isk_secretar ${code_isk}, ${code_secretar}`)
      // } else
      // if (isk_status == 5) {
      //   var db_result = await db.query_await(
      //     `exec edit_isk_status ${code_user}, ${code_isk}, ${type_user}, ${isk_status}, '${description}'`
      //   );
      //   var fiz_face = await db.query_await(
      //     `SELECT * FROM view_face_fiz WHERE  status != -1 and code_isk = ${code_isk}`
      //   );
      //   var ur_face = await db.query_await(
      //     `SELECT * FROM view_face_ur WHERE status != -1 and code_isk = ${code_isk}`
      //   );
      //   var files = await db.query_await(
      //     `SELECT * FROM view_files WHERE code_isk = ${code_isk} and code_file_type = 23 and isk_status = 1`
      //   );
      //   var content = "";
      //   for (var f = 0; files.recordset.length > f; f++) {
      //     const file = files.recordset[f];
      //     file.path = "";
      //     if (
      //       file.file_name != "" &&
      //       file.file_name != undefined &&
      //       file.file_name != null &&
      //       file.file_name != "undefined" &&
      //       file.file_name != "null"
      //     ) {
      //       var file_ = JSON.parse(file.file_name);
      //       file.name = file_.original_name;
      //       file.path = "http://mttp-renaissance.333.kg/" + file_.path;
      //     }
      //     content += `${file.document_name}: ${file.path}`;
      //   }

      //   var defendant = [];
      //   for (var e = 0; fiz_face.recordset.length > e; e++) {
      //     const element = fiz_face.recordset[e];
      //     if (element.fiz_face_type == 2 || element.fiz_face_type == 4) {
      //       defendant.push(element);
      //     }
      //   }
      //   for (var e = 0; ur_face.recordset.length > e; e++) {
      //     const element = ur_face.recordset[e];
      //     if (element.ur_face_type == 2) {
      //       defendant.push(element);
      //     }
      //   }
      //   function res_fun(req, res) {
      //     return function (error, response) {
      //       if (error) throw new Error(error);
      //       console.log(response.body);
      //     };
      //   }
      //   for (var i = 0; defendant.length > i; i++) {
      //     var to_email = defendant[i].email;
      //     console.log(to_email, "to_email");
      //     console.log(content, "content");
      //     if (to_email && to_email != "") {
      //       if (defendant[i].fio == undefined) {
      //         defendant[i].fio = defendant[i].name;
      //       }
      //       var options = {
      //         method: "POST",
      //         url: "http://217.29.18.149:6110/register_mail",
      //         headers: {
      //           "Content-Type": "application/x-www-form-urlencoded",
      //         },
      //         form: {
      //           key: "sudkey",
      //           header: `Исковое заевление`,
      //           content: `<html><head></head>
      //                                       <body>
      //                                           <p>
      //                                               <strong>${defendant[i].fio}</strong>, Вам поступило исковое заявление № <strong>${isk.recordset[0].isk_number}</strong>.
      //                                           </p>
      //                                           <p>
      //                                               <br/>
      //                                               ${content}
      //                                           </p>
      //                                       </body>
      //                                       </html>`,
      //           receiver: to_email,
      //         },
      //       };

      //       request(options, res_fun(req, res));
      //     }
      //   }
      // }
      res.send({ result: db_result.recordset[0].result });
    } catch (error) {
      console.log(error, "error");
      res.status(500).json({
        message: "Что-то пошло не так, попробуйте снова",
        error: error,
      });
    }
  } else {
    res.send({ result: 0, error: "Auth Failed" });
  }
});

router.get("/send_sms", async function (req, res) {
  var code_isk = req.query.id;
  try {
    let files = await db.query_await(
      `SELECT * FROM view_files WHERE code_isk = ${code_isk} and code_file_type = 23 and isk_status = 1`
    );
    let fiz_face = await db.query_await(
      `SELECT * FROM view_face_fiz WHERE code_isk = ${code_isk}`
    );
    let ur_face = await db.query_await(
      `SELECT * FROM view_face_ur WHERE code_isk = ${code_isk}`
    );

    const list_fiz_face = fiz_face.recordsets[0];
    const list_ur_face = ur_face.recordsets[0];
    let list_all_face = [...list_fiz_face, ...list_ur_face];

    const filteredEmails = list_all_face
      .filter((item) => item.fiz_face_type == 2)
      .map(({ email, email2, name, isk_number }) => ({
        email,
        email2,
        name,
        isk_number,
      }));

    console.log(filteredEmails);

    const file_name = JSON.parse(files.recordsets[0][0].file_name).path;

    const allPath = `http://mttp-renaissance.333.kg/${file_name}`;

    function res_fun(req, res) {
      return function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
      };
    }

    for (var i = 0; filteredEmails.length > i; i++) {
      let email = filteredEmails[i].email;
      let email2 = filteredEmails[i].email2;
      let name = filteredEmails[i].name;
      let isk_number = filteredEmails[i].isk_number;
      if (!!email || !!email2) {
        var options = {
          method: "POST",
          url: "http://217.29.18.149:6110/register_mail",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          form: {
            key: "mttpSud",
            header: `Исковое заевление`,
            content: `<html><head></head>
                                        <body>
                                            <p>
                                                <strong>Здравствуйте, ${name}</strong>, вам поступило исковое заявление .
                                            </p>
                                            <p>
                                            <br/>
                                                ${allPath}
                                            </p>
                                        </body>
                                        </html>`,
            receiver: email,
          },
        };

        request(options, res_fun(req, res));
      }
    }

    res.send({ filteredEmails, allPath, list_all_face });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
      error: error,
    });
  }
});

router.post("/set_isk_secretar", async function (req, res) {
  var { code_isk, code_secretar } = req.body;
  if (code_isk != 0 && code_secretar != 0) {
    await db.query_await(`exec set_isk_secretar ${code_isk}, ${code_secretar}`);
  }
  res.send({ result: 1 });
});

////// для добавления арбитров в каждом иске
router.post("/set_isk_arbitrs", async function (req, res) {
  var { code_isk, code_arbitr } = req.body;
  if (code_isk != 0 && code_arbitr != 0) {
    await db.query_await(`exec set_isk_arbitr ${code_isk}, ${code_arbitr}`);
  }
  res.send({ result: 1 });
});

router.get("/sp_arbitrs", async (req, res) => {
  try {
    const search = req.query.search;
    const response = await db.query_await(
      `select * from sp_arbitr where fio_arbitr LIKE '%${search}%'`
    );
    if (response) {
      res.status(200).json(response.recordsets[0]);
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/crud/files", upload.single("file"), async function (req, res) {
  const data = req.body;
  const file = req.file;
  var original_name = Buffer.from(file.originalname, "latin1").toString("utf8");
  console.log(file, data, "/crud/files", original_name);
  try {
    if (file && data.code_isk !== undefined) {
      const filename_for_base = `{"path":"${file.path}","dir":"files/","name":"${file.newFileName}","original_name":"${original_name}", "code_file": "${data.code_file}"}`;
      console.log(
        `exec [create_delete_isk_file] ${data.code_isk}, '${filename_for_base}', 1, '${data.code_file}', 0`
      );
      const db_result = await db.query_await(
        `exec [create_delete_isk_file] ${data.code_isk}, '${filename_for_base}', 1, '${data.code_file}', 0`
      );
      const file_path = "http://mttp-renaissance.333.kg/" + file.path;
      res.json({
        result: 1,
        code_file: db_result.recordset[0].codeid_file,
        file_path: file_path,
      });
    } else {
      res.status(400).json({ result: 0, message: "Invalid file or code_isk" });
    }
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({ result: 0, message: "Internal Server Error" });
  }
});

async function delete_file_api(codeid, codeid_file) {
  var result = 1;
  try {
    var isk_files_result = await db.query_await(
      `SELECT TOP(1) file_name FROM isk_file WHERE  codeid = ${codeid_file}`
    );
    console.log(isk_files_result, "========");
    if (isk_files_result.recordset.length > 0) {
      var file_del = JSON.parse(isk_files_result.recordset[0].file_name);
      var file_name = file_del.name;
      await delete_file(file_name);
      var filename_for_base = `{"path":"${file_name}","dir":"files\/","name":"${file_name}","original_name":"${file_del.original_name}", "code_file": "${file_del.code_file}"}`;
      console.log(
        `exec [create_delete_isk_file] ${codeid}, '${filename_for_base}', 3, ${file_del.code_file}, ${codeid_file}`
      );
      await db.query_await(
        `exec [create_delete_isk_file] ${codeid}, '${filename_for_base}', 3, ${file_del.code_file}, ${codeid_file}`
      );
    } else {
      result = 0;
    }
  } catch (error) {
    result = -1;
  }
  return result;
}

router.post("/crud/genereate-pdf", async (req, res) => {
  // console.log(req)
  const { content, code_file, code_isk } = req.body;
  // console.log(req.body, '/crud/genereate-pdf')
  const file_name = await makeid(25);
  try {
    const documentName = await db.query_await(
      `select [name], [codeid] from [dbo].[sp_document_type] where codeid = ${code_file}`
    );
    const generated_file_name = file_name + ".pdf";
    const file_path = `http://mttp-renaissance.333.kg/files/${generated_file_name}`;
    const filename_for_base = `{"path": "files\/${generated_file_name}","dir":"files/","name":"${generated_file_name}","original_name":"${documentName.recordset[0].name}", "code_file": "${documentName.recordset[0].codeid}"}`;

    let options = {
      format: "A2",
      orientation: "portrait",
      border: "10mm",
      header: {
        height: "10mm",
        contents: "",
      },
      footer: {
        height: "10mm",
        contents: {
          default: "", // fallback value
        },
      },
    };

    var document = {
      html: content,
      data: {},
      path: "files/" + generated_file_name,
      base: "http://mttp-renaissance.333.kg/",
    };

    if (
      code_file == 15 ||
      code_file == 12 ||
      code_file == 17 ||
      code_file == 23
    ) {
      var isk_files_result = await db.query_await(
        `SELECT TOP(1) file_name, codeid FROM isk_file WHERE  code_file_type = ${code_file} and code_isk = ${code_isk}`
      );

      if (isk_files_result.recordset.length > 0) {
        await delete_file_api(code_isk, isk_files_result.recordset[0].codeid);
      }
    }

    function res_doc() {
      return async function () {
        console.log(
          `exec [create_delete_isk_file] ${code_isk}, '${filename_for_base}', 1, '${code_file}', 0`
        );
        var db_result = await db.query_await(
          `exec [create_delete_isk_file] ${code_isk}, '${filename_for_base}', 1, '${code_file}', 0`
        );
        var codeid = db_result.recordset[0].codeid_file;
        var content_for_base = String(content).replace(/'/g, '"');

        if (
          code_file == 15 ||
          code_file == 12 ||
          code_file == 18 ||
          code_file == 22 ||
          code_file == 23
        ) {
          console.log(`exec set_doc_content 'content_for_base', ${codeid}`);
          await db.query_await(
            `exec set_doc_content '${content_for_base}', ${codeid}`
          );
        }
      };
    }

    const generated_file = await pdf.create(document, options).then(
      res_doc({
        name: file_name,
        file_name: generated_file_name,
        filename_for_base: filename_for_base,
      })
    );

    res.status(200).json({ result: 1, file_path: file_path });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ result: 0, message: "Internal Server Error", error: error });
  }
});

router.post("/del/files", async function (req, res) {
  const data = req.body;
  var codeid = data.code_isk;
  var codeid_file = data.codeid_file;
  console.log(data, "/del/files");
  var result = await delete_file_api(codeid, codeid_file);
  res.send({ result: result });
});

////////////

router.post("/del_sides", async function (req, res) {
  ///// удаление истцов, ответчиков, представителей c иска
  const data = req.body;
  const user = verifyToken(req.headers["authorization"]);
  if (!!user) {
    try {
      const { action_type, codeid, typeFace } = data;
      const obj = { 1: "fiz", 2: "ur", 3: "ip" };
      if (action_type == 3 && codeid != 0) {
        await db.query_await(`UPDATE face_${obj?.[+typeFace]} 
        SET status = -1 
        WHERE codeid = ${codeid} AND status != -1;`);
        res.send({ status: true });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Что-то пошло не так, попробуйте снова",
        error: error,
      });
    }
  } else {
    res.send({ result: 0, error: "Auth failed" });
  }
});

//// потом надо доделать
router.get("/accesses_status_role", async (req, res) => {
  const user = verifyToken(req.headers["authorization"]);
  if (user) {
    try {
      if (user.type_user == 1) {
        var listSort = [
          { name: "Черновики", id: 1, count: 0 },
          { name: "Активные иски", id: 2, count: 0 },
          { name: "На доработке", id: 3, count: 0 },
          { name: "Назначенные председателем", id: 4, count: 0 },
        ];
      }
      res.send({ listSort });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.send({ result: 0, error: "Auth Failed" });
  }
});

module.exports = router;

const list = [
  {
    fiz_face_type: 2,
    code_isk: 213,
  },
  {
    ur_face_type: 2,
    code_isk: 2123,
  },
  {
    ip_face_type: 2,
    code_isk: 2153,
  },

  {
    ip_face_type: 2,
    code_isk: 21113,
  },
  {
    ip_face_type: 0,
    code_isk: 2103,
  },
];

const filteredEmails = list
  .filter(
    (item) =>
      item.fiz_face_type == 2 ||
      item.ur_face_type == 2 ||
      item.ip_face_type == 2
  )
  .map(({ code_isk }) => ({
    code_isk,
  }));
