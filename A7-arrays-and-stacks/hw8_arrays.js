// hw8_arrays.js
// CIST 0265 — Week 8 Homework: Arrays

// ════════════════════════════════════════════
// EXERCISE 1 — Temperature Analysis  (15 pts)
// ════════════════════════════════════════════
// A week of recorded high temperatures (°F).
const weeklyTemps = [72, 68, 75, 80, 65, 90, 55];

// TODO 1a: Use reduce() to calculate the average temperature.
function averageTemp(temps) {
  if (!Array.isArray(temps) || temps.length === 0) return 0;

  const sum = temps.reduce((acc, t) => acc + t, 0);
  const avg = sum / temps.length;

  return Number(avg.toFixed(2));
}

// TODO 1b: Use filter() to return only days above 70°F.
function hotDays(temps, threshold = 70) {
  return temps.filter(t => t > threshold);
}

// TODO 1c: Use map() to convert all temps from °F to °C.
// Formula: C = (F - 32) * 5/9  (round to 1 decimal place)
function toCelsius(temps) {
  return temps.map(f => Number((((f - 32) * 5) / 9).toFixed(1)));
}

// ════════════════════════════════════════════
// EXERCISE 2 — Student Records  (20 pts)
// ════════════════════════════════════════════
const students = [
  { name: "Alice",   grade: 92, major: "CS" },
  { name: "Bob",     grade: 78, major: "Math" },
  { name: "Carol",   grade: 85, major: "CS" },
  { name: "Dave",    grade: 61, major: "English" },
  { name: "Eve",     grade: 95, major: "CS" },
];

// TODO 2a: Sort students alphabetically by name (locale-aware).
function sortByName(arr) {
  return [...arr].sort((a, b) => a.name.localeCompare(b.name));
}

// TODO 2b: Return only CS students with grade >= 90, sorted
// by grade descending. Use chained filter() + sort().
function topCSStudents(arr) {
  return arr
    .filter(s => s.major === "CS" && s.grade >= 90)
    .sort((a, b) => b.grade - a.grade);
}

// TODO 2c: Build a grade report using reduce().
// Return: { highest: ..., lowest: ..., average: ... }
function gradeReport(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return { highest: null, lowest: null, average: 0 };
  }

  const result = arr.reduce(
    (acc, s) => {
      const g = s.grade;
      if (g > acc.highest) acc.highest = g;
      if (g < acc.lowest) acc.lowest = g;
      acc.sum += g;
      return acc;
    },
    { highest: -Infinity, lowest: Infinity, sum: 0 }
  );

  return {
    highest: result.highest,
    lowest: result.lowest,
    average: Number((result.sum / arr.length).toFixed(2)),
  };
}

// ════════════════════════════════════════════
// EXERCISE 3 — BONUS: Two-Pointer Problems  (15 pts)
// ════════════════════════════════════════════
// Two classic two-pointer techniques on flat arrays.
// moveZeroes([0,1,0,3,12]) → [1,3,12,0,0]  (in-place, stable)

// TODO 3a: moveZeroes(arr) — move all 0s to the end in-place.
// Non-zero order must be preserved. Do not use filter().
function moveZeroes(arr) {
  let slow = 0;

  for (let fast = 0; fast < arr.length; fast++) {
    if (arr[fast] !== 0) {
      if (slow !== fast) {
        const temp = arr[slow];
        arr[slow] = arr[fast];
        arr[fast] = temp;
      }
      slow++;
    }
  }

  return arr;
}

// TODO 3b: twoSum(arr, target) — return indices [i, j] where
// arr[i] + arr[j] === target. Array is sorted ascending.
// Return null if no pair exists. O(n) time, O(1) space.
function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];

    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }

  return null;
}

module.exports = {
  averageTemp,
  hotDays,
  toCelsius,
  sortByName,
  topCSStudents,
  gradeReport,
  moveZeroes,
  twoSum,
};