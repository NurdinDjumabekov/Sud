//////// hooks
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";

/////// helpers
import { searchNameSelect } from "../../../helpers/searchNameSelect";
import {
  imgBase64Addres,
  imgBase64Logo,
  key,
} from "../../../helpers/localData";
import { todayDate, transformDate } from "../../../helpers/todayDate";
import { listClaims } from "../../../helpers/HTML_helperes";
import { numToWords, roundedNumberFN } from "../../../helpers/roundedNumberFN";

const PdfFulfilled = ({ editorRef, idContent }) => {
  ///// для секретаря дела и отв. секретаря

  const { selPrimPravo } = useSelector((state) => state.selectsSlice);
  const { selLangArbitr } = useSelector((state) => state.selectsSlice);
  const { selReglament } = useSelector((state) => state.selectsSlice);
  const { dataIsk } = useSelector((state) => state.applicationsSlice);
  const { listContentHtml } = useSelector((state) => state.sendDocsSlice);

  const transform = (arr) => {
    if (arr.length === 1) {
      return arr[0].name;
    } else if (arr.length === 2) {
      return `${arr[0].name} и ${arr[1].name}`;
    } else {
      const namesString = arr.map((item) => item.name).join(", ");
      return `${namesString.substring(
        0,
        namesString.lastIndexOf(",")
      )} и${namesString.substring(namesString.lastIndexOf(",") + 1)}`;
    }
  };

  const plaintiff = transform(dataIsk?.plaintiff);
  const defendant = transform(dataIsk?.defendant);
  const plaintiffResper = transform(dataIsk?.plaintiffResper);
  const defendantResper = transform(dataIsk?.defendantResper);

  const lengthPlaitiff = dataIsk?.plaintiff?.length === 1;

  const isk_date = transformDate(`${dataIsk?.isk_date}`);

  const arbitr_lang = searchNameSelect(selLangArbitr, +dataIsk?.arbitr_lang);

  const prim_pravo = searchNameSelect(selPrimPravo, +dataIsk?.prim_pravo);

  const reglament = searchNameSelect(selReglament, +dataIsk?.reglament);

  const stylesNums = "position: absolute; top: 0px; left: 28px;";
  const defaultP =
    "font-size: 17px; padding-left:50px; text-align: justify; position: relative;";

  const stylesArbitrs =
    "color: rgb(224, 15, 15); font-size: 17px; margin: 7px 0px; display: block; text-decoration: underline;";

  const textPlaintiff = `${
    plaintiffResper
      ? `в лице ${plaintiffResper} обратился`
      : ` ${lengthPlaitiff ? "обратился" : "обратились"}`
  }`;

  const textPart3 = `${
    plaintiffResper
      ? `подписано представителем по доверенности ${plaintiffResper} действующая на основании доверенности `
      : `${transform(dataIsk?.plaintiff)}`
  }`;

  const defaultDifined =
    "font-size: 17px; padding-left:30px; text-align: justify; position: relative;";
  const stylesNumsDifined = "position: absolute; top: 0px; left: 10px;";

  const defaultSnock =
    "color: rgb(224, 15, 15); padding-left:30px; text-align: justify; font-size: 15px; text-indent: 15px";

  /////// определяю сумму сборов (надо перенестив функцию)
  /////// определяю сумму сборов (надо перенестив функцию)
  /////// определяю сумму сборов (надо перенестив функцию)
  /////// определяю сумму сборов (надо перенестив функцию)
  const { selCurrency } = useSelector((state) => state.selectsSlice);

  const { arbitr_fee, registr_fee, doplata_summ } = useSelector(
    (state) => state.applicationsSlice?.dataIsk
  );
  const { arbitr_curr, registr_curr, nadbavka_curr } = useSelector(
    (state) => state.applicationsSlice?.dataIsk
  );

  const newArbitr_curr = selCurrency?.find(
    (i) => i?.codeid == arbitr_curr
  )?.rate;

  const newRegistr_curr = selCurrency?.find(
    (i) => i?.codeid == registr_curr
  )?.rate;

  const newNadbavka_curr = selCurrency?.find(
    (i) => i?.codeid == nadbavka_curr
  )?.rate;

  const arbitr_sum = +arbitr_fee * +newArbitr_curr || 0;

  const registr_sum = +registr_fee * +newRegistr_curr || 0;

  const doplata_sum = +doplata_summ * +newNadbavka_curr || 0;

  const allSumm = arbitr_sum + registr_sum + doplata_sum;
  /////// определяю сумму сборов (надо перенестив функцию)  const { selCurrency } = useSelector((state) => state.selectsSlice);

  const initialContent = `
    <div>
      <div>
        <div style="display:flex; justify-content:right; margin: 20px 0px 20px 0px; font-size:16px !important; min-width:100%">
          <div style="
              width: 100%;
              padding: 0px 0px 0px 0px;
              line-height: 18px;
              font-weight: 500;
              font-family: 'Times New Roman', sans-serif;
              height: 180px;
              position: relative;
              font-size:16px !important;
              ">
                <img src="data:image/jpg;base64,${imgBase64Addres}" alt=""  height="100px" width:"300px" style="position: absolute; bottom: 40px; left: 0px;">
                <img src="data:image/jpg;base64,${imgBase64Logo}" alt=""  height="120px" width:"30px" style="position: absolute; bottom: 40px; right: -10px;">
            </div>
        </div>
      </div>
    </div>
    <main style=" font-family:Times New Roman, Times, serif !important; font-size:14pt ;">
            <div style="text-align: center; margin-top: 16px;">
                <strong>ОПРЕДЕЛЕНИЕ<br>
                о принятии искового заявления к производству <span style="color: rgb(224, 15, 15); text-decoration: underline;">№ ${
                  dataIsk?.isk_number
                }</span><br>
                </strong>
            </div>
            <div>
                <div  style="width: 100%; position: relative; height: 80px">
                  <span style="position: absolute; bottom: 5px; left: 30px; font-size: 16px; font-weight: 600;">${todayDate()} года</span>
                  <span style="position: absolute; bottom: 5px; right: 0px; font-size: 16px; font-weight: 600;">г. Бишкек</span>
                </div>
                <p style="${defaultP}">
                    <span style='${stylesNums}'>1.</span>
                     Международный Третейский Суд при Торгово-промышленной палате Кыргызской Республики (МТС ТПП) в лице Председателя Майчиева Шамарала Юсуповича, 
                     принимая исковое заявление в производство МТС 
                     ТПП от ${plaintiff}  к ${defendant} о ${dataIsk?.name}
                </p>
                <div style="text-align: center; margin: 20px 0px 0px 50px;">
                   <b> УСТАНОВИЛ:</b>
                </div>
                <p style="${defaultP}">
                    <span style='${stylesNums}'>2.</span>
                    <span >${isk_date}</span>
                    <span >${plaintiff}</span> ${textPlaintiff} в МТС ТПП с исковым заявлением к 
                    ${defendant}, со следующими исковыми требованиями: <br>
                   <div style="${defaultP}"> <span >${listClaims(
    dataIsk?.claim
  )}</span></div>
                </p>
                <p style="${defaultP}">
                    <span style='${stylesNums}'>3.</span>
                    Исковое заявление подано с соблюдением требований статьи 20 Регламента МТС ТПП КР, ${textPart3},
                </p>

                <p style="${defaultP}">
                  <span style='${stylesNums}'>4.</span>
                  Доверенность выдана _____________________ , согласно которой подтверждается полномочия на право подписи исковых заявлений.
                </p>

                <p style="${defaultP}">
                  <span style='${stylesNums}'>5.</span>
                  В пункте 9.2. Договора №____ от ____________ года, заключенным между ${plaintiff} к ${defendant} имеется третейская оговорка, где стороны определили:
                  <div style="${defaultP}"><span style="${stylesArbitrs}">- Процессуальное право - ${reglament} МТС ТПП</span></div>
                  <div style="${defaultP}"><span style="${stylesArbitrs}">- Материальное право - законодательство Кыргызской Республики;</span></div>
                  <div style="${defaultP}"><span style="${stylesArbitrs}">- Язык третейского разбирательства – ${arbitr_lang};</span></div>
                  <div style="${defaultP}"><span style="${stylesArbitrs}">- Количество арбитров – 5. </span></div>
                </p>

                <p style="${defaultP}">
                  <span style='${stylesNums}'>6.</span>
                  Регистрационный сбор исчислен правильно и оплачен ___________________(ФИО истца) ___________(дата). Сумма уплаченного сбора   ___________(дата) составляет ${roundedNumberFN(
                    allSumm
                  )} (${numToWords(roundedNumberFN(allSumm))}) сом.
                </p>

                <p style="${defaultP}">
                  <span style='${stylesNums}'>7.</span>
                  Подтверждение о направлении ответчику – ${defendant} копии искового заявления с описью приложенных документов от ${isk_date} представлено. 
                </p>

                <p style="${defaultP}">
                  <span style='${stylesNums}'>8.</span>
                  Принимая во внимание достаточность оснований для принятия искового заявления и рассмотрения спора
                  в МТС ТПП, руководствуясь п. 3 ст. 2 Нью-Йоркской Конвенции , п.2 ст. 1 Конвенции , 
                  статьёй 5 Закона Кыргызской Республики «О третейских судах в Кыргызской Республике», 
                  статьями 2, 3, 11 Регламента МТС ТПП, Председатель  МТС ТПП,
                </p>



                <div style="text-align: center; margin: 20px 0px; margin-top: 40px;">
                 <b>ОПРЕДЕЛИЛ:</b>
                </div>

                <p style="${defaultDifined}">
                  <span style='${stylesNumsDifined}'>1.</span>
                  Исковое заявление ${plaintiff} принять к производству 
                  МТС ТПП с присвоением регистрационного номера дела  <span style="color: rgb(224, 15, 15); font-size: 19px; margin-left: 5px; text-decoration: underline; font-weight: 600;">№${
                    dataIsk?.isk_number
                  }.<span>
                </p>

                <p style="${defaultDifined}">
                  <span style='${stylesNumsDifined}'>2.</span>
                  Определить секретарём заседания по делу  <span style="color: rgb(224, 15, 15); font-size: 19px; margin-left: 5px; text-decoration: underline; font-weight: 600;">№${
                    dataIsk?.isk_number
                  } - (секретарь) .<span>
                </p>

                <p style="${defaultDifined}">
                  <span style='${stylesNumsDifined}'>3.</span>
                  Секретарю заседания получить у Арбитра, и у сторон по делу, адреса Электронной почты, WhatsApp номера, номера для СМС сообщений.
                </p>

                <p style="${defaultDifined}">
                  <span style='${stylesNumsDifined}'>4.</span>
                  Всю официальную переписку с МТС ТПП осуществлять через электронную почту <a href="" target="">baktybekova@arbitricaccikr.com</a> WhatsApp/Telegram номер <b>0770 900 920</b>, 
                  а также задавать вопросы по третейскому разбирательству через телеграмм бот
                  <a href="" target="">https://t.me/arbitrkg_bot</a>
                </p>

                <p style="${defaultDifined}">
                  <span style='${stylesNumsDifined}'>5.</span>
                  Участникам арбитражного процесса необходимо уведомлять МТС ТПП о смене представителя, адвоката, контактов, почтовых реквизитов в течение одного дня.
                </p>

                <p style="${defaultDifined}">
                  <span style='${stylesNumsDifined}'>6.</span>
                  Определение является обязательным для сторон, окончательным и обжалованию не подлежит.
                </p>

                <div style="margin-bottom: 60px;"><b>
                    <span style="margin: 20px 200px 0px 100px;">Председатель</span>
                    <span>Майчиев Ш.Ю.</span>
                    </b>
                </div>

                <p style="${(defaultDifined, defaultSnock)}">
                  Исковое заявление к регистрации принято ответственным секретарём заседания,  Алтынбековой Ж.А., 02 августа 2024 года. 
                </p>

                <p style="${(defaultDifined, defaultSnock)}">
                  Секретарь заседаний, Бактыбекова М.Б. проверила и установила соответствие искового заявления в   соответствии с требованием статьи   20 Регламента МТС ТПП. __________________________   
                </p>

                <p style="${(defaultDifined, defaultSnock)}">
                  Определение о принятии искового заявления подготовлено секретарем заседания Бактыбековой М.Б. 05 августа 2024 года.
                </p>

                <p style="${defaultDifined}">_____________________________________</p>


                <p style="${(defaultDifined, defaultSnock)}">
                    «Каждое Договаривающееся Государство признает письменное соглашение, по которому стороны обязуются передавать в арбитраж все или какие-либо споры, возникшие или могущие возникнуть между ними в связи с каким-либо конкретным договорным или иным правоотношением, объект которого может быть предметом арбитражного разбирательства»
                </p>

                <p style="${(defaultDifined, defaultSnock)}">
                  В Министерстве Юстиции Кыргызской Республики, также на сайте данного органа в открытом доступе размещен Постановление Законодательного собрания от 17 мая 1995 г. за №79-1 ЖК КР, Постановление собрание народных представителей ЖК КР, где Кыргызская Республика Присоединилась к Конвенции о признании и приведении в исполнение иностранных арбитражных решений, подписанной в 1958 году в Нью-Йорке.
                </p>

                <p style="${(defaultDifined, defaultSnock)}">
                  «Термин “арбитражные решения” включает не только арбитражные решения, вынесенные арбитрами, назначенными по каждому отдельному делу, но также и арбитражные решения, вынесенные постоянными арбитражными органами, к которым стороны обратились».
                </p>

                <p style="${(defaultDifined, defaultSnock)}">
                  Председатель МТС ТПП является процессуальной фигурой, в соответствии статьи 12 Ускоренного Регламента МТС ТПП, который наделен правами принимать решения в форме определений. Согласно п.2 ст.1 Нью Йоркской Конвенции, Определение Председателя МТС ТПП является обязательным для сторон, окончательным и обжалованию не подлежит.
                </p>

                <p style="${(defaultDifined, defaultSnock)}">
                  В Решении Конституционной палаты Верховного суда КР от 09 декабря 2015 года №16-р определена Конституционная позиция суда, по оспариваемой норме, предусматривающей окончательность решения третейского суда и невозможность его обжалования, которые вытекают из правовой природы института третейских судов, и основаны на принципе автономии воли и свободы договора; также эти положения являются своего рода результатом принятых на себя обязательств по заключенному третейскому соглашению или арбитражной оговорки, являющейся составной частью договора. Стороны, заключая договор о передаче спора в третейский суд, обязуются выполнить все обязанности, которые могут из него вытекать, и, в частности, исполнить решение третейского суда. Третейское соглашение (арбитражная оговорка) и решение третейского суда рассматриваются как две части единого договора - договора о передаче спора в третейский суд. Вместе с тем третейское разбирательство, предъявление исковых требований, вопросы доказательств, процедура разбирательства, вынесение решения, его исполнение относятся к области гражданско-процессуального права с особенностями, присущими третейскому суду, где эти процедуры могут быть установлены договором или отдельным процессуальным актом (регламентом), с которым стороны соглашаются при подписании третейского соглашения. При этом отличительной особенностью третейского разбирательства является возможность сторон избрания состава арбитров, которому стороны доверяют защиту своих гражданских прав и соответственно признают его решения.
                </p>

                <p style="${(defaultDifined, defaultSnock)}">
                  Исходя из этого, следует отметить, что третейское разбирательство, осуществляемое третейскими судами, основанное на принципах гражданско-процессуального права, отлично от гражданско-процессуального законодательства, осуществляемого судами Кыргызской Республики, и может содержать в себе положения, допускающие принятие третейским судом решения, которое может быть окончательным и не подлежащим обжалованию.
                </p>

                <p style="${(defaultDifined, defaultSnock)}">
                  В соответствии с приказом №3/ПП Председателя МТС ТПП от 08.01.2024г.
                </p>
            </div>
        </main>
      `;

  const everyHtml = listContentHtml?.find((i) => i?.codeid == idContent);

  const dataIskHtml = !!idContent ? everyHtml?.html_accept_isk : initialContent;

  return (
    <div className="pdfFileReject">
      <Editor
        apiKey={key}
        initialValue={dataIskHtml}
        init={{
          height: "100%",
          width: "100%",
          menubar: { file: { title: "File", items: "preview | print | save" } },
          content_style: "body { font-family: 'Times New Roman', sans-serif; }",
          toolbar: false,
        }}
        ref={editorRef}
      />
    </div>
  );
};

export default PdfFulfilled;
