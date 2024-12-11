import { readFile } from "node:fs/promises";

const testData = await readFile("./data/day11example", { encoding: "utf-8" });
const originalStoneLine: any[] = testData.split(" ").map(Number);

const applyFirstRule = (target: number[]) => {
  target.push(1);
};
const applySecondRule = (target: number[], engravedNumber: number) => {
  target.push(
    parseInt(`${engravedNumber}`.substring(0, `${engravedNumber}`.length / 2))
  );
  target.push(
    parseInt(`${engravedNumber}`.substring(`${engravedNumber}`.length / 2))
  );
};
const applyThirdRule = (target: number[], engravedNumber: number) => {
  target.push(engravedNumber * 2024);
};

const applyRules = (target: number[], engravedNumber: number) => {
  if (engravedNumber === 0) {
    applyFirstRule(target);
  } else if (`${engravedNumber}`.length % 2 === 0) {
    applySecondRule(target, engravedNumber);
  } else {
    applyThirdRule(target, engravedNumber);
  }
};

let resultAfterFirstIteration = [];
for (const originalStone of originalStoneLine) {
  let singleStoneLine = [originalStone];
  for (let b = 0; b < 25; b++) {
    let lineAfterBlink = [];
    for (const stone of singleStoneLine) {
      applyRules(lineAfterBlink, stone);
    }
    singleStoneLine = lineAfterBlink;
  }
  resultAfterFirstIteration.push(...singleStoneLine);
}

console.log(resultAfterFirstIteration.length);
