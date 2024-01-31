export const shortenToTwoWords = (str) => {
  const words = str.split(" ");

  if (words.length === 1) {
    return str; // Возвращаем единственное слово без изменений
  } else if (words.length === 2) {
    // Возвращаем первое слово и первую букву второго слова с точкой
    return `${words[0]} ${words[1].charAt(0)}.`;
  } else if (words.length === 3) {
    // Возвращаем первое слово, первую букву второго слова и первую букву третьего слова с точкой
    return `${words[0]} ${words[1].charAt(0)}. ${words[2].charAt(0)}.`;
  } else {
    // Если слов больше трех, возвращаем формат "первое слово, первая буква второго слова, точка, первая буква третьего слова, точка"
    return `${words[0]} ${words[1].charAt(0)}. ${words[2].charAt(0)}.`;
  }
};
