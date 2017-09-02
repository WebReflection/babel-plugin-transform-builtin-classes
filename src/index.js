import template from 'babel-template';

const fixAsTemplate = template(`
var HELPER = (function (O) {
  var
    gOPD = O.getOwnPropertyDescriptor,
    gPO = O.getPrototypeOf || function (o) { return o.__proto__; },
    sPO = O.setPrototypeOf || function (o, p) { o.__proto__ = p; return o; },
    construct = typeof Reflect === 'object' ?
      Reflect.construct :
      function (Parent, args, Class) {
        var Constructor, a = [null];
        a.push.apply(a, args);
        Constructor = Parent.bind.apply(Parent, a);
        return sPO(new Constructor, Class.prototype);
      }
  ;
  return function fixBabelExtend(Class) {
    var Parent = gPO(Class);
    return sPO(
      Class,
      sPO(
        function Super() {
          return construct(Parent, arguments, gPO(this).constructor);
        },
        Parent
      )
    );
  };
}(Object));
`);

export default function (babel) {

  let name;

  const VISITED = Symbol();
  const {types: t} = babel;

  const needsWrapping = (path, globals) => {
    const superClass = path.get('superClass');
    return !!superClass.node &&
            (globals || []).some(name => superClass.isIdentifier({name}));
  };

  const getName = (path) => {
  	if (!name) {
      name = path.scope.generateUidIdentifier('fixBabelExtend');
      path.scope.getProgramParent()
       .path.unshiftContainer('body',fixAsTemplate({HELPER: name}));
    }
    return name;
  };

  return {
    pre() {
      name = null;
    },
    visitor: {
      ClassDeclaration(path) {
        const {node} = path;
        if (!node[VISITED] && needsWrapping(path, this.opts.globals)) {
          const name = getName(path);
          const ref = node.id || path.scope.generateUidIdentifier('class');
          path.replaceWith(t.variableDeclaration('let', [
            t.variableDeclarator(ref, t.callExpression(name, [
              t.toExpression(node)
            ])),
          ]));
        }
        node[VISITED] = true;
      },
      ClassExpression(path) {
        const {node} = path;
        if (!node[VISITED] && needsWrapping(path, this.opts.globals)) {
          const name = getName(path);
          path.replaceWith(t.callExpression(name, [
            t.toExpression(node)
          ]));
        }
        node[VISITED] = true;
      },
    },
    post() {
      if (name) console.info(' ✔ builtin extends patched');
    }
  };

}
