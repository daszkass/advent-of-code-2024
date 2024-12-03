import { leftColumn, rightColumn } from "../data/day1.js";

const findTotalDistance = (
  leftColumn: number[],
  rightColumn: number[]
): number => {
  const pairsOfData = leftColumn
    .sort((a, b) => a - b)
    .map((v, i) =>
      [v, rightColumn.sort((a, b) => a - b)[i]].sort((a, b) => b - a)
    );

  return pairsOfData.reduce((acc, v) => v[0] - v[1] + acc, 0);
};

const findTotalSimilarity = (
  leftColumn: number[],
  rightColumn: number[]
): number => {
  const valuesWithItsSimilarities = leftColumn.map((leftValue) => [
    leftValue,
    rightColumn.filter((rightValue) => rightValue === leftValue).length,
  ]);

  return valuesWithItsSimilarities.reduce((acc, v) => v[0] * v[1] + acc, 0);
};

const totalDistance = findTotalDistance(leftColumn, rightColumn);
const totalSimilarity = findTotalSimilarity(leftColumn, rightColumn);

console.log(totalDistance, totalSimilarity);
