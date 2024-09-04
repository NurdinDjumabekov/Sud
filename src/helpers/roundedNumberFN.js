export const roundedNumberFN = (num) => {
  const newNum = +num?.toFixed(1); // Округление до одного знака после запятой
  return newNum;
};

export const numToWords = (num) => {
  const ones = [
    "",
    "один",
    "два",
    "три",
    "четыре",
    "пять",
    "шесть",
    "семь",
    "восемь",
    "девять",
    "десять",
    "одиннадцать",
    "двенадцать",
    "тринадцать",
    "четырнадцать",
    "пятнадцать",
    "шестнадцать",
    "семнадцать",
    "восемнадцать",
    "девятнадцать",
  ];

  const tens = [
    "",
    "",
    "двадцать",
    "тридцать",
    "сорок",
    "пятьдесят",
    "шестьдесят",
    "семьдесят",
    "восемьдесят",
    "девяносто",
  ];

  const hundreds = [
    "",
    "сто",
    "двести",
    "триста",
    "четыреста",
    "пятьсот",
    "шестьсот",
    "семьсот",
    "восемьсот",
    "девятьсот",
  ];

  const thousands = [
    ["", "", ""],
    ["тысяча", "тысячи", "тысяч"],
    ["миллион", "миллиона", "миллионов"],
    ["миллиард", "миллиарда", "миллиардов"],
  ];

  function getDeclension(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

  function convertToWords(num, idx) {
    if (num === "0") return "";
    let n = parseInt(num);
    let word = "";

    if (n > 99) {
      word += hundreds[Math.floor(n / 100)] + " ";
      n %= 100;
    }
    if (n > 19) {
      word += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    }
    if (n > 0) {
      word += ones[n] + " ";
    }

    if (idx > 0) {
      word +=
        getDeclension(
          parseInt(num),
          thousands[idx][0],
          thousands[idx][1],
          thousands[idx][2]
        ) + " ";
    }

    return word.trim();
  }

  let result = "";
  const parts = num.toString().split(".");
  const integerPart = parts[0];
  const fractionPart = parts[1] || "0";

  const segments = integerPart
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g)
    .map((s) => s.split("").reverse().join(""));
  segments.reverse();

  segments.forEach((segment, idx) => {
    result += convertToWords(segment, segments.length - 1 - idx) + " ";
  });

  const rubles = getDeclension(parseInt(integerPart), "сом", "сома", "сомов");
  const kopecks = getDeclension(parseInt(fractionPart), "", "", "");

  result = result.trim() + ` ${rubles} ${fractionPart} ${kopecks}`;

  return result?.trim();
};

// Пример использования
const amount = 1234567.89;
console.log(numToWords(amount)); // "один миллион двести тридцать четыре тысячи пятьсот шестьдесят семь рублей восемьдесят девять копеек"
