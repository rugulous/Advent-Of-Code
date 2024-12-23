export {};

//set polyfills to save arguments
declare global {
  interface Set<T> {
    union(otherSet: Set<T>): Set<T>;
    intersection(otherSet: Set<T>): Set<T>;
    difference(otherSet: Set<T>): Set<T>;
  }
}


Set.prototype.union = function (otherSet: Set<any>) {
    return new Set([...this, ...otherSet]);
  };
  
  Set.prototype.intersection = function (otherSet: Set<any>) {
    return new Set([...this].filter(item => otherSet.has(item)));
  };
  
  Set.prototype.difference = function (otherSet: Set<any>) {
    return new Set([...this].filter(item => !otherSet.has(item)));
  };
