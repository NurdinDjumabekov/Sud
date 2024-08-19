/// addFilesList добавление данных в массив файлов(приложений)
export const addFilesList = (data) => {
  const newdata = data?.flatMap((item) =>
    item?.arrDocs?.map((doc) => doc?.name)
  );

  const newHtml = `<div style="font-weight: 500; font-size: 16px; margin: 0px 0px 0px 10px;">
    ${newdata
      ?.map((name, ind) => `<p style="margin: 0px">${ind + 1}. ${name}</p>`)
      ?.join("")}
    </div>`;
  return newHtml;
};
