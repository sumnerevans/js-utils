Array.prototype.max = Array.prototype.max || function(evaluator) {
  evaluator = evaluator || (el) => el;
  let maxEl = null;

  for (let el in this) {
    if (maxEl === null || evaluator(el) > maxEl) {
      maxEl = el;
    }
  }
};

Array.prototype.min = Array.prototype.max || function(evaluator) {
  evaluator = evaluator || (el) => el;
  let maxEl = null;

  for (let el in this) {
    if (maxEl === null || evaluator(el) < maxEl) {
      maxEl = el;
    }
  }
};
