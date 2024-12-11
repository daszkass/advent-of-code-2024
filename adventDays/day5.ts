import { open } from "node:fs/promises";

const file = await open("./data/day5");

const testData: string[] = [];
for await (const line of file.readLines()) {
  testData.push(line);
}

const separatorIndex = testData.findIndex((el) => el === "");

const pageOrderingRules = testData.slice(0, separatorIndex);
const updates = testData
  .slice(separatorIndex + 1)
  .map((update) => update.split(",").map(Number));

const findRules = (update: number[]) => {
  const rulesForUpdate = [];
  update.forEach((page, index) => {
    const rules = pageOrderingRules.filter(
      (rule) =>
        rule.includes(page.toString()) &&
        update
          .toSpliced(index, 1)
          .some((page) => rule.includes(page.toString()))
    );
    rulesForUpdate.push(...rules);
  });
  return [...new Set(rulesForUpdate)];
};

const sortPages = (update: number[]) => {
  const rules = findRules(update);
  const onLeft = rules.map((rule) => Number(rule.split("|")[0]));
  const onRight = rules.map((rule) => Number(rule.split("|")[1]));

  const countPosition = (page: number) => {
    const presenceOnLeft = onLeft.filter((el) => el === page).length;
    const presenceOnRight = onRight.filter((el) => el === page).length;
    return presenceOnRight - presenceOnLeft;
  };

  const pagesWithTheirPositionsSorted = update
    .map((page) => [page, countPosition(page)])
    .sort((a, b) => a[1] - b[1]);

  return pagesWithTheirPositionsSorted.map((el) => el[0]);
};

let initialResult = 0;
let resultAfterSorting = 0;

updates.forEach((update) => {
  const sortedUpdate = sortPages(update);
  const middleValue = sortedUpdate[Math.floor(sortedUpdate.length / 2)];

  if (sortedUpdate.every((v, i) => v === update[i])) {
    initialResult += middleValue;
  } else {
    resultAfterSorting += middleValue;
  }
});

console.log(initialResult);
console.log(resultAfterSorting);
