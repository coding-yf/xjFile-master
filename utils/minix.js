/*
工具函数minix：实现两个对象的混合
    本例中target为defaultOption，source为用户自定义的opt（已测试成功）
    因为是公用的函数，所以无需用立即执行函数包裹，就应该放在全局中
*/

function minix(target, source) {
  Object.keys(source).forEach((key) => {
    target[key] = source[key];
  });
  return target;
}
