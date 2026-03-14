// hw9_deques.js
// CIST 0265 — Week 9 Homework: Deques

// ─── Provided Deque Class (do not modify) ──────────────
class Deque {
    #items = [];
    addFront(item)  { this.#items.unshift(item); }
    addRear(item)   { this.#items.push(item); }
    removeFront()   { return this.#items.shift(); }
    removeRear()    { return this.#items.pop(); }
    peekFront()     { return this.#items[0]; }
    peekRear()      { return this.#items[this.#items.length - 1]; }
    isEmpty()       { return this.#items.length === 0; }
    get size()      { return this.#items.length; }
    clear()         { this.#items = []; }
    toString()      { return this.#items.join(" | "); }
  }
  
  // ════════════════════════════════════════════
  // EXERCISE 4 — Palindrome Checker  (15 pts)
  // ════════════════════════════════════════════
  function isPalindrome(word) {
    const deque = new Deque();
    const cleaned = word.toLowerCase().replace(/[^a-z]/g, "");
  
    for (const char of cleaned) {
      deque.addRear(char);
    }
  
    while (deque.size > 1) {
      const frontChar = deque.removeFront();
      const rearChar = deque.removeRear();
  
      if (frontChar !== rearChar) {
        return false;
      }
    }
  
    return true;
  }
  
  function longestPalindrome(words) {
    let longest = null;
  
    for (const word of words) {
      if (isPalindrome(word)) {
        if (longest === null || word.length > longest.length) {
          longest = word;
        }
      }
    }
  
    return longest;
  }
  
  // ════════════════════════════════════════════
  // EXERCISE 5 — Task Scheduler  (20 pts)
  // ════════════════════════════════════════════
  class TaskScheduler {
    #deque = new Deque();
  
    addUrgent(task)  {
      this.#deque.addFront(task);
    }
  
    addRoutine(task) {
      this.#deque.addRear(task);
    }
  
    processNext() {
      if (this.#deque.isEmpty()) {
        return "No tasks";
      }
      return this.#deque.removeFront();
    }
  
    processLast() {
      if (this.#deque.isEmpty()) {
        return "No tasks";
      }
      return this.#deque.removeRear();
    }
  
    processAll() {
      const results = [];
      while (!this.#deque.isEmpty()) {
        results.push(this.#deque.removeFront());
      }
      return results;
    }
  
    peek()     { return this.#deque.peekFront(); }
    get size() { return this.#deque.size; }
    toString() { return this.#deque.toString(); }
  }
  
  // ════════════════════════════════════════════
  // EXERCISE 6 — BONUS: Sliding Window Maximum  (15 pts)
  // ════════════════════════════════════════════
  function slidingWindowMax(nums, k) {
    const deque = new Deque();
    const result = [];
  
    for (let i = 0; i < nums.length; i++) {
      while (!deque.isEmpty() && nums[deque.peekRear()] <= nums[i]) {
        deque.removeRear();
      }
  
      deque.addRear(i);
  
      while (!deque.isEmpty() && deque.peekFront() <= i - k) {
        deque.removeFront();
      }
  
      if (i >= k - 1) {
        result.push(nums[deque.peekFront()]);
      }
    }
  
    return result;
  }
  
  module.exports = { isPalindrome, longestPalindrome, TaskScheduler, slidingWindowMax };
  