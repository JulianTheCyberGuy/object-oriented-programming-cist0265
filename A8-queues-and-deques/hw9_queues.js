// hw9_queues.js
// CIST 0265 — Week 9 Homework: Queues

// ─── Provided Queue Class (do not modify) ──────────────
class Queue {
    #items = [];
    enqueue(item) { this.#items.push(item); }
    dequeue()     { return this.#items.shift(); }
    front()       { return this.#items[0]; }
    isEmpty()     { return this.#items.length === 0; }
    get size()    { return this.#items.length; }
    clear()       { this.#items = []; }
    toString()    { return this.#items.join(" <- "); }
  }
  
  // ════════════════════════════════════════════
  // EXERCISE 1 — Print Queue Simulator  (15 pts)
  // ════════════════════════════════════════════
  const printJobs = [
    { id: 1, name: "Resume.pdf",       pages: 2  },
    { id: 2, name: "CoverLetter.pdf",  pages: 1  },
    { id: 3, name: "Portfolio.pdf",    pages: 18 },
    { id: 4, name: "References.pdf",   pages: 1  },
  ];
  
  function loadPrintQueue(jobs) {
    const queue = new Queue();
    for (const job of jobs) {
      queue.enqueue(job);
    }
    return queue;
  }
  
  function processPrintQueue(queue) {
    const printed = [];
    while (!queue.isEmpty()) {
      const job = queue.dequeue();
      printed.push(job.name);
    }
    return printed;
  }
  
  function totalPages(jobs) {
    return jobs.reduce((sum, job) => sum + job.pages, 0);
  }
  
  // ════════════════════════════════════════════
  // EXERCISE 2 — Hot Potato Simulation  (20 pts)
  // ════════════════════════════════════════════
  function hotPotato(players, numPasses) {
    const queue = new Queue();
  
    for (const player of players) {
      queue.enqueue(player);
    }
  
    while (queue.size > 1) {
      for (let i = 0; i < numPasses; i++) {
        queue.enqueue(queue.dequeue());
      }
      queue.dequeue();
    }
  
    return queue.front();
  }
  
  function hotPotatoLog(players, numPasses) {
    const queue = new Queue();
    const eliminated = [];
  
    for (const player of players) {
      queue.enqueue(player);
    }
  
    while (queue.size > 1) {
      for (let i = 0; i < numPasses; i++) {
        queue.enqueue(queue.dequeue());
      }
      eliminated.push(queue.dequeue());
    }
  
    return { winner: queue.front(), eliminated };
  }
  
  // ════════════════════════════════════════════
  // EXERCISE 3 — BONUS: Josephus Problem  (15 pts)
  // ════════════════════════════════════════════
  function josephus(n, k) {
    const queue = new Queue();
  
    for (let i = 1; i <= n; i++) {
      queue.enqueue(i);
    }
  
    while (queue.size > 1) {
      for (let i = 0; i < k - 1; i++) {
        queue.enqueue(queue.dequeue());
      }
      queue.dequeue();
    }
  
    return queue.front();
  }
  
  module.exports = { loadPrintQueue, processPrintQueue, totalPages, hotPotato, hotPotatoLog, josephus };
  