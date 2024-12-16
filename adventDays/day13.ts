import { open } from "node:fs/promises";

const file = await open("./data/day13");

const testDataInLines: string[] = [];
for await (const line of file.readLines()) {
  testDataInLines.push(line);
}

const clawMachinesConfigurations: string[][] = [];
for (let i = 0; i < testDataInLines.length; i += 4) {
  clawMachinesConfigurations.push(testDataInLines.slice(i, i + 3));
}

const findCheapestWin = (
  buttonAConfig: number[],
  buttonBConfig: number[],
  prizeConfig: number[],
  maxIteration = 100
) => {
  for (let i = 0; i < maxIteration; i++) {
    const remainderX = prizeConfig[0] - buttonAConfig[0] * i;
    const remainderY = prizeConfig[1] - buttonAConfig[1] * i;
    const multiplyBY = remainderY / buttonBConfig[1];
    if (
      remainderX % buttonBConfig[0] === 0 &&
      remainderY % buttonBConfig[1] === 0 &&
      buttonBConfig[0] * multiplyBY === remainderX
    ) {
      return i * 3 + multiplyBY;
    }
  }
};

let result = 0;
clawMachinesConfigurations.forEach((clawMachine) => {
  const clawMachineConfig = clawMachine.map((config) =>
    config.match(/\d+/g).map(Number)
  );

  const buttonA = clawMachineConfig[0];
  const buttonB = clawMachineConfig[1];
  const prize = clawMachineConfig[2];

  const tokens = findCheapestWin(buttonA, buttonB, prize);
  result += tokens || 0;
});
console.log(result);
