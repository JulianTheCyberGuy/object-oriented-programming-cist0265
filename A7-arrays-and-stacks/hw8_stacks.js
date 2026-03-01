// hw8_stacks.js
// CIST 0265 — Week 8 Homework: Stacks

// ─── Provided Stack Class (do not modify) ──────────────
class Stack {
  #items = [];
  push(item)   { this.#items.push(item); }
  pop()        { return this.#items.pop(); }
  peek()       { return this.#items[this.#items.length - 1]; }
  isEmpty()    { return this.#items.length === 0; }
  get size()   { return this.#items.length; }
  clear()      { this.#items = []; }
  toString()   { return [...this.#items].reverse().join(' | '); }
}

// ════════════════════════════════════════════
// EXERCISE 4 — Multi-Base Converter  (15 pts)
// ════════════════════════════════════════════
// Extend the decimal→binary idea from the slides.
// TODO: convert a decimal number to any base (2–16).
const DIGITS = "0123456789ABCDEF";

function baseConverter(decimal, base) {
  const stack = new Stack();

  if (decimal === 0) return "0";
  if (base < 2 || base > 16) throw new RangeError("base must be between 2 and 16");

  let num = decimal;

  while (num > 0) {
    const rem = num % base;
    stack.push(DIGITS[rem]);
    num = Math.floor(num / base);
  }

  let out = "";
  while (!stack.isEmpty()) {
    out += stack.pop();
  }

  return out;
}

// ════════════════════════════════════════════
// EXERCISE 5 — Balanced Symbols Checker  (20 pts)
// ════════════════════════════════════════════
// Extend the parentheses example from the slides.
// Also handle [], {} — and skip non-bracket characters.
// TODO: return true if all symbols are balanced, false otherwise.
function isBalanced(str) {
  const stack = new Stack();

  const openers = new Set(["(", "[", "{"]);
  const matches = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const ch of str) {
    if (openers.has(ch)) {
      stack.push(ch);
      continue;
    }

    if (ch in matches) {
      if (stack.isEmpty()) return false;
      const top = stack.pop();
      if (top !== matches[ch]) return false;
    }
  }

  return stack.isEmpty();
}

// ════════════════════════════════════════════
// EXERCISE 6 — BONUS: Browser History  (15 pts)
// ════════════════════════════════════════════
// Use two stacks to simulate Back / Forward navigation.
class BrowserHistory {
  #back    = new Stack(); // pages you can go back to
  #forward = new Stack(); // pages you can go forward to
  #current = null;        // page currently displayed

  // TODO: visit(url) — push current to #back, clear #forward, set #current.
  visit(url) {
    if (this.#current !== null) {
      this.#back.push(this.#current);
    }
    this.#forward.clear();
    this.#current = url;
  }

  // TODO: back() — push #current to #forward, pop #back to #current.
  back() {
    if (this.#back.isEmpty()) return "No history";
    if (this.#current !== null) this.#forward.push(this.#current);
    this.#current = this.#back.pop();
    return this.#current ?? "No history";
  }

  // TODO: forward() — mirror of back().
  forward() {
    if (this.#forward.isEmpty()) return "No forward history";
    if (this.#current !== null) this.#back.push(this.#current);
    this.#current = this.#forward.pop();
    return this.#current ?? "No forward history";
  }

  current() { return this.#current; }
}

module.exports = { baseConverter, isBalanced, BrowserHistory };