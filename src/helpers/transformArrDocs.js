/// transformArrDocs трансформация массива с файлами, добавление данных а массив файлов(приложений)Ю, при нажатии на редактирование иска
export const transformArrDocs = (data) => {
  const { arrIsk, reqData } = data;
    // console.log(arrIsk, "arrIsk");
    // console.log(reqData, "reqData");

  const newdata = arrIsk?.map((i) => {
    const matchingItems = reqData?.filter(
      (j) => +i.codeid === +j?.code_file_type
    );
    return {
      ...i,
      arrDocs: [
        ...i.arrDocs,
        ...matchingItems?.map((newObj) => ({
          code_file: newObj?.code_file_type,
          codeid_file: newObj?.codeid,
          file_path: newObj?.path,
          name: newObj?.name,
        })),
      ],
    };
  });

  //   console.log(newdata, "newdata");
  return newdata;
};
