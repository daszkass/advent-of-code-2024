import { open } from "node:fs/promises";

const file = await open("./data/day4");

const testDataInLines: string[] = [];
for await (const line of file.readLines()) {
  testDataInLines.push(line);
}

const maxX = testDataInLines[0].length;
const maxY = testDataInLines.length;

const getChar = (x: number, y: number) => testDataInLines[y]?.[x];

const getRelativeChar = (
  x: number,
  y: number,
  direction: number,
  distance: number
) => {
  switch (direction) {
    case 0:
      return getChar(x, y - distance);
    case 1:
      return getChar(x + distance, y - distance);
    case 2:
      return getChar(x + distance, y);
    case 3:
      return getChar(x + distance, y + distance);
    case 4:
      return getChar(x, y + distance);
    case 5:
      return getChar(x - distance, y + distance);
    case 6:
      return getChar(x - distance, y);
    case 7:
      return getChar(x - distance, y - distance);
  }
};

const isXmasInDirection = (x: number, y: number, direction: number): boolean =>
  getChar(x, y) === "X" &&
  getRelativeChar(x, y, direction, 1) === "M" &&
  getRelativeChar(x, y, direction, 2) === "A" &&
  getRelativeChar(x, y, direction, 3) === "S";

let result = 0;

for (let x = 0; x < maxX; x++) {
  for (let y = 0; y < maxY; y++) {
    for (let d = 0; d < 8; d++) {
      if (isXmasInDirection(x, y, d)) {
        result += 1;
      }
    }
  }
}

console.log(result);

let newResult = 0;

const isXxMas = (...pos: [number, number]): boolean => {
  const topLeft = getRelativeChar(...pos, 7, 1);
  const topRight = getRelativeChar(...pos, 1, 1);
  const bottomRight = getRelativeChar(...pos, 3, 1);
  const bottomLeft = getRelativeChar(...pos, 5, 1);

  return (
    getChar(...pos) === "A" &&
    (topLeft === "M" || topLeft === "S") &&
    (topLeft === "M" ? bottomRight === "S" : bottomRight === "M") &&
    (topRight === "M" || topRight === "S") &&
    (topRight === "M" ? bottomLeft === "S" : bottomLeft === "M")
  );
};

for (let x = 0; x < maxX; x++) {
  for (let y = 0; y < maxY; y++) {
    if (isXxMas(x, y)) {
      newResult += 1;
    }
  }
}

console.log(newResult);
