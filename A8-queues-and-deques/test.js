const queues = require("./hw9_queues");
const deques = require("./hw9_deques");

// ─── Queue Tests ─────────────────────────────
const printJobs = [
  { id: 1, name: "Resume.pdf", pages: 2 },
  { id: 2, name: "CoverLetter.pdf", pages: 1 },
  { id: 3, name: "Portfolio.pdf", pages: 18 },
  { id: 4, name: "References.pdf", pages: 1 },
];

console.log(
  queues.processPrintQueue(
    queues.loadPrintQueue(printJobs)
  )
);
// ["Resume.pdf", "CoverLetter.pdf", "Portfolio.pdf", "References.pdf"]

console.log(queues.totalPages(printJobs));
// 22

console.log(
  queues.hotPotato(["Alice","Bob","Carol","David","Eve"], 7)
);
// "Bob"

console.log(
  queues.hotPotatoLog(["Alice","Bob","Carol"], 2)
);
// example → { winner: 'Carol', eliminated: ['Alice','Bob'] }

console.log(
  queues.josephus(7, 3)
);
// 4


// ─── Deque Tests ─────────────────────────────
console.log(deques.isPalindrome("racecar"));
// true

console.log(deques.isPalindrome("hello"));
// false

console.log(
  deques.longestPalindrome(["hi", "racecar", "noon", "hello"])
);
// "racecar"


const s = new deques.TaskScheduler();
s.addRoutine("Write report");
s.addRoutine("Reply to emails");
s.addUrgent("Fix outage");

console.log(s.toString());
// "Fix outage | Write report | Reply to emails"

console.log(s.processNext());
// "Fix outage"

console.log(s.processLast());
// "Reply to emails"

console.log(s.processAll());
// ["Write report"]


console.log(
  deques.slidingWindowMax([1,3,-1,-3,5,3,6,7], 3)
);
// [3,3,5,5,6,7]
