import { readFile } from "node:fs/promises";

const testData = await readFile("./data/day9", { encoding: "utf-8" });
const diskMap = testData.split("").map(Number);

const isUneven = (v: number) => v % 2 !== 0;
const rearrangedDisk = diskMap.flatMap((v, i) =>
  isUneven(i) ? new Array(v).fill(".") : new Array(v).fill(i / 2)
);
const reversedRearrangedDisk = rearrangedDisk.toReversed();

for (let i = 1; i < rearrangedDisk.length; i++) {
  if (rearrangedDisk[i] === ".") {
    const index = reversedRearrangedDisk.findIndex((v) => v !== ".");
    rearrangedDisk[i] = reversedRearrangedDisk[index];
    rearrangedDisk.splice(
      rearrangedDisk.findLastIndex((v) => v === reversedRearrangedDisk[index]),
      1
    );
    reversedRearrangedDisk.splice(index, 1);
  }
}

const findChecksum = (disk: any[]) =>
  disk.reduce((acc, v, i) => (v !== "." ? v * i + acc : acc + 0), 0);
const result = findChecksum(rearrangedDisk);

console.log(result);

const newRearrangedDisk = diskMap.map((v, i) =>
  isUneven(i) ? new Array(v).fill(".") : new Array(v).fill(i / 2)
);
const newReversedRearrangedDisk = newRearrangedDisk.toReversed();

newReversedRearrangedDisk.forEach((file) => {
  if (file.every((el) => el !== "." && el !== undefined)) {
    const index = newRearrangedDisk.findIndex(
      (v) => v.every((el) => el === ".") && v.length >= file.length
    );
    if (index !== -1) {
      const freeSpaceLength = newRearrangedDisk[index].length;
      newRearrangedDisk.splice(
        index,
        1,
        file,
        new Array(freeSpaceLength - file.length).fill(".")
      );
      const indexToRemove = newRearrangedDisk.findLastIndex((v) => v === file);
      newRearrangedDisk[indexToRemove] = new Array(file.length).fill(".");
    }
  }
});

const result2 = findChecksum(newRearrangedDisk.flat());
console.log(result2);
