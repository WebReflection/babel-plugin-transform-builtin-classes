var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

let CoolElement = _fixBabelExtend(function (_HTMLElement) {
  _inherits(CoolElement, _HTMLElement);

  function CoolElement() {
    _classCallCheck(this, CoolElement);

    return _possibleConstructorReturn(this, (CoolElement.__proto__ || Object.getPrototypeOf(CoolElement)).apply(this, arguments));
  }

  _createClass(CoolElement, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.innerText = 'Hello World';
    }
  }]);

  return CoolElement;
}(HTMLElement));

customElements.define('cool-element', CoolElement);