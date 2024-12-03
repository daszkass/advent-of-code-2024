import { open } from "node:fs/promises";

const file = await open("./data/day2");
let amountOfSaveReports = 0;
let amountOfSaveReportsWithProblemDampener = 0;

const isCorrect = (report: number[]): boolean => {
  const isAscending = (el: number, index: number, arr: number[]) =>
    index === 0 || el > arr[index - 1];

  if (report.every(isAscending)) {
    return report.every((x, i) => i === 0 || x - report[i - 1] < 4);
  } else if (report.toReversed().every(isAscending)) {
    return report.every((x, i) => i === 0 || report[i - 1] - x < 4);
  }
  return false;
};

const isCorrectWithProblemDampener = (report: number[]): boolean => {
  const correctWithRemovingOneLevel = (_, i: number, report: number[]) => {
    const modifiedReport = report.toSpliced(i, 1);
    return isCorrect(modifiedReport);
  };

  return report.some(correctWithRemovingOneLevel);
};

for await (const line of file.readLines()) {
  const report = line.split(" ").map(Number);

  if (isCorrect(report)) {
    amountOfSaveReports += 1;
    amountOfSaveReportsWithProblemDampener += 1;
  } else if (isCorrectWithProblemDampener(report)) {
    amountOfSaveReportsWithProblemDampener += 1;
  }
}

console.log(amountOfSaveReports, amountOfSaveReportsWithProblemDampener);
