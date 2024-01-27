export const newListDocs = (arr) => {
  const allNames = arr.flatMap((item) => item.arrDocs.map((doc) => doc.name));
  const rowsHTML = allNames
    .map(
      (item, index) => `
      <tr style="border: 1px solid black !important">
        <td style="border: 1px solid black !important">${index + 1}</td>
        <td style="border: 1px solid black !important">${item}</td>
        <td style="border: 1px solid black !important">1</td>
        <td style="border: 1px solid black !important"></td>
      </tr>
    `
    )
    .join("");

  const tableHTML = `
      <table style="width: 100%; border: 1px solid black">
        <thead>
          <tr style="border: 1px solid black !important">
            <td style="border: 1px solid black !important">№<br>п/п</td>
            <td style="border: 1px solid black !important">Наименование предмета</td>
            <td style="border: 1px solid black !important">Количество предметов</td>
            <td style="border: 1px solid black !important">Объявленная ценность</td>
          </tr>
        </thead>
        <tbody>
          ${rowsHTML}
        </tbody>
      </table>
    `;

  return tableHTML;
};
