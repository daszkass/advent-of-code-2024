import { readFile } from "node:fs/promises";

const testData = await readFile("./data/day3", {encoding: 'utf-8'});

const countSumOfMultiplication = (data: string) => {
  const properMultiplyInstructions = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const realData = data.matchAll(properMultiplyInstructions);

  return realData.reduce(
    (acc, v) => Number(v[1]) * Number(v[2]) + acc,
    0
  );
};

const result = countSumOfMultiplication(testData)
console.log(result);

const enabledDataArr: string[] = []

const enabledInstructions = /(^|do\(\)).*?(don't\(\))/gs;
const enabledData = testData.matchAll(enabledInstructions);
for (const line of enabledData) {
    enabledDataArr.push(line[0])
}

const newResult = countSumOfMultiplication(enabledDataArr.join(''));
console.log(newResult);
