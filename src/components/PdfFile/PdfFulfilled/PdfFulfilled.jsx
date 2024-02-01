import React, { useRef } from "react";
import "./PdfFulfilled.scss";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { searchNameSelect } from "../../../helpers/searchNameSelect";
import imgSud from "../../../asstes/images/logo.png";

const PdfFulfilled = ({ istype, editorRef }) => {
  const dispatch = useDispatch();
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { selPrimPravo, selLangArbitr, selReglament } = useSelector(
    (state) => state.selectsSlice
  );

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

  const initialContent = `
    <div>
      <div>
        <div style="display:flex; justify-content:right; margin: 20px 0px 20px 0px; font-size:16px !important; min-width:100%">
          <div style="
              width: 100%;
              padding: 10px 0px 0px 0px;
              line-height: 18px;
              font-weight: 500;
              font-family: 'Times New Roman', sans-serif;
              height: 250px;
              position: relative;
              font-size:16px !important;
              ">
              <div style"position: absolute; top:10px; left:10px">
                <p>Кыргызская Республика, 720001,<br>г.Бишкек, ул.Турусбекова 109/3,<br>БЦ "Максимум плюс", 6 этаж, офис 601/2</p>
                <p>Моб.: +996 770 900 920 <br>Тел.: +996 312 383 005 <br>office@arbitricaccikr.com <br>www.arbitricaccikr.com</p>
              </div>
              <img src=${imgSud} alt="" style="width: 250px; position: absolute; top: 10px; right: 10px; display: block;"/>
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
                     ТПП от ${transform(
                       todosApplications?.plaintiff
                     )}  к ${transform(todosApplications?.defendant)} о 
                </div>
                <div style="text-align: center; margin: 20px 0px;">
                   <b> УСТАНОВИЛ:</b>
                </div>
                <div style="display: inline-block;width: 97%;">
                    <span>2.</span>  
                    <span  class="today">${todosApplications?.isk_date?.replace(
                      /\//g,
                      "."
                    )}</span>  
                    <span  class="istec">${transform(
                      todosApplications?.plaintiff
                    )}</span> ${
    todosApplications?.plaintiff?.length === 1 ? "обратился" : "обратились"
  } в Международный Третейский суд при Торгово-промышленной палате Кыргызской Республики с исковым заявлением к
                    ${transform(
                      todosApplications?.defendant
                    )}, со следующими исковыми требованиями: <br>
                    <span class="trebovanie"></span>
                </div>
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                    3. Исковое заявление подано ${transform(
                      todosApplications?.plaintiff
                    )}, с соблюдением требований статьи 20 Регламента МТС ТПП.<br>
                    <span>_______________________</span>(документ подтверждающий), прилагается.
                </div>
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                     4. В пункте<span>_______________________</span>(название договора), имеется третейская оговорка, где стороны определили: <br>

                    -	Процессуальное право рассмотрения спора - <span class="prim_pravo">${searchNameSelect(
                      selPrimPravo,
                      +todosApplications?.prim_pravo
                    )}</span>; <br>
                    -	Применимое материальное право - <span class="prim_pravo">${searchNameSelect(
                      selPrimPravo,
                      +todosApplications?.prim_pravo
                    )}</span>;<br>
                    -	Язык третейского разбирательства – <span class="language">${searchNameSelect(
                      selLangArbitr,
                      +todosApplications?.arbitr_lang
                    )}</span>;<br>
                    -	Количество арбитров – <span class="reglament">${searchNameSelect(
                      selReglament,
                      +todosApplications?.reglament
                    )}</span>;
                </div>
               
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                   5. Подтверждение о направлении ${
                     todosApplications?.defendant?.length === 1
                       ? "ответчику"
                       : "ответчикам"
                   }, <span  class="otv">${transform(
    todosApplications?.defendant
  )}, </span> копии искового заявления с описью приложенных к нему документов от
                    <span class="today">${transform(
                      todosApplications?.plaintiff
                    )}</span>, представлено. 
                </div>
               
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                    6. Регистрационный сбор оплачен истцом,  <span  class="istec"></span> <span>_______________________</span>(дата поступления).
                </div>
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                   7. Принимая во внимание достаточность оснований для принятия искового заявления и рассмотрения спора в МТС ТПП, руководствуясь статьёй 5 Закона Кыргызской Республики «О третейских судах в Кыргызской Республике», статьями 2, 3, 11 Регламента МТС ТПП, третейский суд,
                </div>
                <div style="text-align: center; margin: 20px 0px; margin-top: 140px;">
                 <b>   ОПРЕДЕЛИЛ:</b>
                </div>
               
                <div style="display: inline-block;width: 97%; margin-top: 15px;">
                     1. Исковое заявление от  ${transform(
                       todosApplications?.plaintiff
                     )} к ${transform(
    todosApplications?.defendant
  )} принять к производству МТС ТПП с присвоением регистрационного номера дела
                    <strong> №<span>${
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
               
                <div style="display: inline-block;width: 97%; margin-top: 15px; margin-bottom: 30px;">
                    5. Участникам арбитражного процесса необходимо уведомлять МТС ТПП о смене представителя, адвоката, контактов, почтовых реквизитов в течение одного дня.
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
        apiKey="gydld2v6nkt94wd85xei7jj62bgagm191o3utnlxihf8cg0a"
        initialValue={initialContent}
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
