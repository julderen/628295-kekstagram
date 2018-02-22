const generateRandomNumberInRange = (maxNumber, minNumber = 0) =>{
  return Math.round(Math.random() * maxNumber + minNumber);
};

const generateRandomString = (maxLength, arr) =>{
  let string = ``;
  const maxLengthWord = defineMaxLengthWordInArray(arr);

  do {
    const indexDescription = generateRandomNumberInRange(arr.length - 1);

    string += ` ${arr[indexDescription]}`;
  } while (string.length < maxLength - maxLengthWord);

  return string;
};

const defineMaxLengthWordInArray = (arr) =>{
  return arr.reduce((result, word) => (result > word.length ? result : word.length), 0);
};

module.exports = {
  generateRandomNumberInRange,
  generateRandomString,
  defineMaxLengthWordInArray,
};
