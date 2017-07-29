var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fixBabelExtend = function (O) {
  var gOPD = O.getOwnPropertyDescriptor,
      gPO = O.getPrototypeOf || function (o) {
    return o.__proto__;
  },
      sPO = O.setPrototypeOf || function (o, p) {
    o.__proto__ = p;
    return o;
  },
      construct = typeof Reflect === 'object' ? Reflect.construct : function (Parent, args, Class) {
    var Constructor,
        a = [null];
    a.push.apply(a, args);
    Constructor = Parent.bind.apply(Parent, a);
    return sPO(new Constructor(), Class.prototype);
  };

  return function fixBabelExtend(Class) {
    var Parent = gPO(Class);
    return sPO(Class, sPO(function Super() {
      return construct(Parent, arguments, gPO(this).constructor);
    }, Parent));
  };
}(Object);

var tressa = require('tressa');

let List = _fixBabelExtend(function (_Array) {
  _inherits(List, _Array);

  function List(value) {
    var _this;

    _classCallCheck(this, List);

    (_this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this)), _this).push(value);
    return _this;
  }

  _createClass(List, [{
    key: 'push',
    value: function push(value) {
      _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'push', this).call(this, value);
      return this;
    }
  }]);

  return List;
}(Array));

tressa.title(/test\.js$/.test(__filename) ? 'Native Classes' : 'Transformed Classes');

tressa.assert(new List(1) instanceof List, 'new List is an instanceof List');
tressa.assert(new List(2) instanceof Array, 'new List is an instanceof Array');
var l = new List(3);
tressa.assert(l.length === 1 && l[0] === 3, 'constructor pushes an entry');
tressa.assert(l.push(4) === l && l.length === 2 && l.join('3,4'), 'method override works');

let SecondLevel = function (_List) {
  _inherits(SecondLevel, _List);

  function SecondLevel() {
    _classCallCheck(this, SecondLevel);

    return _possibleConstructorReturn(this, (SecondLevel.__proto__ || Object.getPrototypeOf(SecondLevel)).apply(this, arguments));
  }

  _createClass(SecondLevel, [{
    key: 'method',
    value: function method() {
      return this;
    }
  }]);

  return SecondLevel;
}(List);

tressa.assert(new SecondLevel(1) instanceof SecondLevel, 'new SecondLevel is an instanceof SecondLevel');
tressa.assert(new SecondLevel(2) instanceof List, 'new SecondLevel is an instanceof List');
tressa.assert(new SecondLevel(3) instanceof Array, 'new SecondLevel is an instanceof Array');
var s = new SecondLevel(4);
tressa.assert(s.length === 1 && s[0] === 4, 'constructor pushes an entry');
tressa.assert(s.push(5) === s && s.length === 2 && s.join('4,5'), 'inherited override works');
tressa.assert(s.method() === s, 'new method works');