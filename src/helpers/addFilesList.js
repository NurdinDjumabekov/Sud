/// addFilesList добавление данных в массив файлов(приложений)
export const addFilesList = (data) => {
   const newdata = data.flatMap(item => item.arrDocs.map(doc => doc.name));

    const newHtml = `<div style="font-weight: 500; font-size: 16px; margin:0px 0px 70px 10px;">
    ${newdata.map((name,ind) => `<p>${ind+1}. ${name}</p>`).join('')}
    </div>`;
    // console.log(newHtml);
    return newHtml
};
