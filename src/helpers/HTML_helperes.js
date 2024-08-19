////////////// PdfNotifyDefendant
export const listAddresNotify = (date) => {
  return `<div style="position: absolute; z-index: 1; left:0; top: 140px; min-width: 175px; max-width: 175px; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5;">
  <div style="border-bottom: 3px solid #00AEEF; border-top: 3px solid #00AEEF; padding-bottom: 15px; padding-top: 15px; margin-bottom: 15px;">
    <strong>Дата: </strong> ${date}<br>
  </div>
  <div style="border-bottom: 3px solid #00AEEF; padding-bottom: 15px; margin-bottom: 15px;">
    <strong>Адрес:</strong><br>
    Кыргызская Республика, 720001, г. Бишкек,<br>
    ул. Турусбекова 109/3,<br>
    БЦ "Максимум плюс", 6 этаж, офис 601/2<br>
    <a style="color:#000; href="https://go.2gis.com/sdceus">https://go.2gis.com/sdceus</a>
  </div>
  <div style="border-bottom: 3px solid #00AEEF; padding-bottom: 15px; margin-bottom: 15px;">
    <strong>Контакты:</strong><br>
    Моб. тел.: +996 770 900 920<br>
    Телефон: +996 312 383 005<br>
    WhatsApp: +996 770 900 920<br>
    Telegram: <a style="color:#000; href="t.me/arbitrkg_bot">t.me/arbitrkg_bot</a>
  </div>
  <div>
    <strong>Интернет:</strong>
    <br> e-mail: office@arbitricaccikr.com <br>
    <a style="color:#000; href="http://www.arbitricaccikr.com">www.arbitricaccikr.com</a>
  </div>
</div>
`;
};

export const arbitrsLook = (arbitrsList) => {
  const defaulText = "на усмотрение председателя МТС ТПП КР.";

  if (!arbitrsList?.length) {
    return defaulText;
  }

  const names = arbitrsList.map((item) => item.fio_arbitr);

  if (names.length === 1) {
    return names[0];
  } else if (names.length === 2) {
    return names.join(" и ");
  } else {
    return `${names.slice(0, -1).join(", ")} и ${names[names.length - 1]}`;
  }
};

export const notifTitle = `<h4 style="text-align:center; font-size: 17px;  width: 80%; margin: 10px auto 0px;"> Уведомление о поступлении иска в Международный Третейский суд при ТПП КР </h4>`;

export const notifText1 =
  "На основании статьи 24  Регламента МТС ТПП просим Вас в 15-дневный срок с даты получения настоящего уведомления представить в Международный Третейский суд при ТПП КР отзыв на исковое заявление, а также сообщить имена предлагаемых Вами кандидатур арбитра.";

export const notifText2 =
  "Информируем Вас, что согласно пункту 25.2 Регламента в случае, если Вы в установленный срок не представите свое мнение относительно кандидатуры арбитра, решение по этому вопросу будет принято Председателем Международного Третейского суда при ТПП КР.";

export const notifText3 =
  "Также, ставим Вас в известность, что непредставление отзыва на исковое заявление в соответствии со статьей 25 Закона «О третейских судах в Кыргызской Республике» не является препятствием к разрешению спора.";
