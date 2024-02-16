import React, { useRef } from "react";
import "./PdfFulfilled.scss";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { searchNameSelect } from "../../../helpers/searchNameSelect";
import imgSud from "../../../asstes/images/logo.png";

const PdfFulfilled = ({ editorRef }) => {
  const dispatch = useDispatch();
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { typeUser } = useSelector((state) => state.saveDataSlice);
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
              <div style="width: 340px; 
                  position: absolute; 
                  top: 10px; 
                  right: 10px; 
                  display: block; 
                  text-align: right;">
                      <p>
                        <img src="data:image/png;base64,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" alt="" height="80px" width: 350px;>
                          </p>
                      <p style="margin: -15px 0 0 5px; width:100%;font-size:14px; text-align:left">MЕЖДУНАРОДНЫЙ ТРЕТЕЙСКИЙ СУД<br> ПРИ  ТОРГОВО -ПРОМЫШЛЕННОЙ<br> ПАЛАТЕ КЫРГЫЗСКОЙ РЕСПУБЛИКИ</p>
              </div>
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
        apiKey="aqp3lj8havavh7ud6btplh670nfzm8axex2z18lpuqrv30ag"
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
