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
    const rules = pageOrderingRules.filter((rule) =>
      rule.includes(page.toString())
    );
    const relevantRules = rules.filter((rule) =>
      update.toSpliced(index, 1).some((page) => rule.includes(page.toString()))
    );
    rulesForUpdate.push(...relevantRules);
  });
  return [...new Set(rulesForUpdate)];
};

const countOrder = (page: number, onLeft: number[], onRight: number[]) => {
  const presenceOnLeft = onLeft.filter((el) => el === page).length;
  const presenceOnRight = onRight.filter((el) => el === page).length;
  return presenceOnRight - presenceOnLeft;
};

const arePagesSorted = (update: number[]) => {
  const rules = findRules(update);
  const onLeft = rules.map((rule) => Number(rule.split("|")[0]));
  const onRight = rules.map((rule) => Number(rule.split("|")[1]));

  const pagesWithTheirOrder = update.map((page) => [
    page,
    countOrder(page, onLeft, onRight),
  ]);
  const pagesWithOrderSorted = pagesWithTheirOrder.sort((a, b) => a[1] - b[1]);

  return pagesWithOrderSorted
    .map((el) => el[0])
    .every((v, i) => v === update[i]);
};

let result = 0;
updates.forEach((update) => {
    if (arePagesSorted(update)) {
        const middleValue = update[Math.floor(update.length /2)]
        result += middleValue
    }
})

console.log(result)
