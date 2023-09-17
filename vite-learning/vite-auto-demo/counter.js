let counter = 0;
// 通过 legacy 插件，箭头函数将转换为普通函数
const addCounter = () => {
  document.body.insertAdjacentHTML("beforebegin", `<p>Couter：${counter}</p>`);
  counter += 1;
};

export { addCounter };
