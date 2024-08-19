import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";

/////// helpers
import { searchNameSelect } from "../../../helpers/searchNameSelect";
import { key, logoBas64 } from "../../../helpers/localData";
import { transformDate } from "../../../helpers/todayDate";

const PdfFulfilled = ({ editorRef }) => {
  const dispatch = useDispatch();

  const { typeUser } = useSelector((state) => state.saveDataSlice);
  const { selPrimPravo } = useSelector((state) => state.selectsSlice);
  const { selLangArbitr } = useSelector((state) => state.selectsSlice);
  const { selReglament } = useSelector((state) => state.selectsSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);

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

  const plaintiff = transform(todosApplications?.plaintiff);
  const defendant = transform(todosApplications?.defendant);

  const lengthPlaitiff = todosApplications?.plaintiff?.length === 1;

  const isk_date = transformDate(`${todosApplications?.isk_date}`);

  const arbitr_lang = searchNameSelect(
    selLangArbitr,
    +todosApplications?.arbitr_lang
  );

  const prim_pravo = searchNameSelect(
    selPrimPravo,
    +todosApplications?.prim_pravo
  );

  const reglament = searchNameSelect(
    selReglament,
    +todosApplications?.reglament
  );

  const initialContent = `
    <div>
      <div>
        <div style="display:flex; justify-content:right; margin: 20px 0px 20px 0px; font-size:16px !important; min-width:100%">
          <div style="
              width: 100%;
              padding: 50px 0px 0px 0px;
              line-height: 18px;
              font-weight: 500;
              font-family: 'Times New Roman', sans-serif;
              height: 200px;
              position: relative;
              font-size:16px !important;
              ">
                <img src="data:image/png;base64,
                  ${logoBas64} alt="" height="175px" width:"950px">
            </div>
        </div>
      </div>
    </div>
    <main style=" font-family:Times New Roman, Times, serif !important; font-size:15pt ;">
            <div style="text-align: center; margin-top: 16px;">
                <strong>ОПРЕДЕЛЕНИЕ<br>
                о принятии искового заявления к производству № <span>${
                  todosApplications?.isk_number
                }</span><br>
                </strong>
            </div>
            <div>
                <p  style="text-align: right;">
                    <span>
                        <b>
                        г.Бишкек
                        </b>
                    </span>
                </p>  
                <div style="display: inline-block;width: 97%;">
                     1. Международный Третейский Суд при Торгово-промышленной палате Кыргызской Республики (МТС ТПП) в лице Председателя Майчиева Шамарала Юсуповича, 
                     принимая исковое заявление в производство МТС 
                     ТПП от ${plaintiff}  к ${defendant} о 
                </div>
                <div style="text-align: center; margin: 20px 0px;">
                   <b> УСТАНОВИЛ:</b>
                </div>
                <div style="display: inline-block;width: 97%;">
                    <span>2.</span>  
                    <span  class="today">${isk_date}</span>  
                    <span  class="istec">${plaintiff}</span> ${
    lengthPlaitiff ? "обратился" : "обратились"
  } в МТС ТПП с исковым заявлением к 
                    ${defendant}, со следующими исковыми требованиями: <br>
                    <span class="trebovanie"></span>
                </div>
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                    3.	Исковое заявление подано с соблюдением требований статьи 20 Регламента МТС ТПП КР, подписано ${transform(
                      todosApplications?.plaintiff
                    )},
                </div>
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                     4. В пункте<span>_______________________</span>(название договора), имеется третейская оговорка, где стороны определили: <br>

                    -	Процессуальное право рассмотрения спора - <span class="prim_pravo">${prim_pravo}</span>; <br>
                    -	Применимое материальное право - <span class="prim_pravo">${prim_pravo}</span>;<br>
                    -	Язык третейского разбирательства – <span class="language">${arbitr_lang}</span>;<br>
                    -	Количество арбитров – <span class="reglament">${reglament}</span>;
                </div>
               
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                   5. В пункте 9.2. Договора №BA-201-2022 от 29.09.2022 года, заключенным между <span  class="otv">${defendant}, </span> к
                    <span class="today">${plaintiff}</span> имеется третейская оговорка, где стороны определили:
                    <span class="today"> </span>
                </div>
               
                <div style="display: inline-block;width: 97%; margin-top: 15px; color:red;">
                    6. Регистрационный исчислен правильно и оплачен, <span  class="istec"></span> <span>_______________________</span>(дата поступления).
                </div>
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                  7.	Подтверждение о направлении ответчику, <span  class="istec">${defendant} копии искового заявления с описью приложенных документов от ${isk_date} представлено.  </span> 
                  </div>
                  <div style="display: inline-block;width: 97%; margin-top: 15px;">
             
                   8. Принимая во внимание достаточность оснований для принятия искового заявления и рассмотрения спора в МТС ТПП, руководствуясь п. 3 ст. 2 Нью-Йоркской Конвенции , п.2 ст. 1 Конвенции , статьёй 5 Закона Кыргызской Республики «О третейских судах в Кыргызской Республике», статьями 2, 3, 11 Регламента МТС ТПП, Председатель  МТС ТПП,
                </div>
                <div style="text-align: center; margin: 20px 0px; margin-top: 40px;">
                 <b>   ОПРЕДЕЛИЛ:</b>
                </div>
               
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                     1. Исковое заявление от  ${plaintiff} к ${defendant} принять к производству МТС ТПП с присвоением регистрационного номера дела  
                    <strong> <span style="color:red; font-weight: 700;  font-size:18pt">№ ${
                      todosApplications?.isk_number
                    }</span></strong> 
                </div>
             
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                    2. Определить секретарём заседания по делу <strong>№${
                      todosApplications?.isk_number
                    } </strong>
                </div>
               
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                    3. Секретарю заседания получить у Арбитра, и у сторон по делу, адреса Электронной почты, WhatsApp номера, номера для СМС сообщений.
                </div>
              
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                     4. Всю официальную переписку с МТС ТПП осуществлять через электронную почту <span>_______________________</span>(почта секретаря), WhatsApp/Telegram номер <strong>0770 900 920</strong>, а также задавать вопросы по третейскому разбирательству через телеграмм бот <a href="https://t.me/arbitrkg_bot">https://t.me/arbitrkg_bot</a>,
                </div>
               
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                    5. Участникам арбитражного процесса необходимо уведомлять МТС ТПП о смене представителя, адвоката, контактов, почтовых реквизитов в течение одного дня.
                </div>

                <div style="display: inline-block;width: 97%; margin-top: 15px; margin-bottom: 30px;">
                    6.	Определение является обязательным для сторон, окончательным и обжалованию не подлежит.
                </div>
                
                <div style="margin-bottom: 60px;"><b>
                    <span style="margin: 20px 200px 0px 100px;">Председатель</span>
                    <span>Майчиев Ш.Ю.</span>
                    </b>
                </div>
            </div>
        </main>
      `;

  return (
    <div className="pdfFileReject">
      <Editor
        apiKey={key}
        initialValue={
          +typeUser === 3
            ? todosApplications?.contentPred == "" ||
              !todosApplications?.contentPred
              ? initialContent
              : todosApplications?.contentPred
            : initialContent
        }
        init={{
          height: "100%",
          width: "100%",
          menubar: {
            file: {
              title: "File",
              items: "preview | print | save",
            },
          },
          content_style: "body { font-family: 'Times New Roman', sans-serif; }",
          toolbar: false,
        }}
        ref={editorRef}
      />
    </div>
  );
};

export default PdfFulfilled;
