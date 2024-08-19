export const transformArrDocs = (data) => {
  const { arrIsk, reqData } = data;

  const newdata = arrIsk?.map((i) => {
    const matchingItems = reqData?.filter(
      (j) => +i.codeid === +j?.code_file_type
    );
    return {
      ...i,
      arrDocs: matchingItems?.map((newObj) => ({
        code_file: newObj?.code_file_type,
        codeid_file: newObj?.codeid,
        file_path: newObj?.path,
        name: newObj?.name,
      })),
    };
  });

  return newdata;
};

export const transformRole = (arr) => {
  ///// возврашаю определенную роль одну либо слазу несколько
  //// истец, ответчик, представитель истцв и предю отвветч.
  if (arr?.length === 1) {
    return arr?.[0].name;
  } else if (arr?.length === 2) {
    return `${arr?.[0].name} и ${arr?.[1].name}`;
  } else {
    const namesString = arr?.map((item) => item?.name)?.join(", ");
    return `${namesString?.substring(
      0,
      namesString.lastIndexOf(",")
    )} и${namesString?.substring(namesString?.lastIndexOf(",") + 1)}`;
  }
};
