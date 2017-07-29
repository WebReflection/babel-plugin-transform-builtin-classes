var tressa = require('tressa');

class List extends Array {
  constructor(value) {
    super().push(value);
  }
  push(value) {
    super.push(value);
    return this;
  }
}

tressa.title(/test\.js$/.test(__filename) ?
  'Native Classes' :
  'Transformed Classes'
);

tressa.assert(new List(1) instanceof List, 'new List is an instanceof List');
tressa.assert(new List(2) instanceof Array, 'new List is an instanceof Array');
var l = new List(3);
tressa.assert(l.length === 1 && l[0] === 3, 'constructor pushes an entry');
tressa.assert(l.push(4) === l && l.length === 2 && l.join('3,4'), 'method override works');

class SecondLevel extends List {
  method() {
    return this;
  }
}

tressa.assert(new SecondLevel(1) instanceof SecondLevel, 'new SecondLevel is an instanceof SecondLevel');
tressa.assert(new SecondLevel(2) instanceof List, 'new SecondLevel is an instanceof List');
tressa.assert(new SecondLevel(3) instanceof Array, 'new SecondLevel is an instanceof Array');
var s = new SecondLevel(4);
tressa.assert(s.length === 1 && s[0] === 4, 'constructor pushes an entry');
tressa.assert(s.push(5) === s && s.length === 2 && s.join('4,5'), 'inherited override works');
tressa.assert(s.method() === s, 'new method works');
