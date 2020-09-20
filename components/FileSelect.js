(function (win, doc) {
  //1.主构造函数
  function FileSelect(opt) {
    var defaultOption = {
      el: doc.body,
      clsName: "file-select",
      accept: "*",
    };
    if (opt.el) {
      opt.el = typeof opt.el === "object" ? opt.el : doc.querySelector(opt.el);
    }
    this.opt = minix(defaultOption, opt);

    this.init();
  }

  //2.初始化函数 —— 调用其他方法
  FileSelect.prototype.init = function () {
    this.render();
    this.select();
  };

  //3.渲染函数 —— 创建FileSelect组件相关的HTML元素
  FileSelect.prototype.render = function () {
    console.log("到render里来了");
    var _this = this;
    var fragment = doc.createDocumentFragment();
    //创建input元素
    var fileElem = doc.createElement("input");
    fileElem.type = "file";
    fileElem.multiple = true;
    fileElem.accept = this.opt.accept;
    fileElem.style.display = "none";
    fragment.appendChild(fileElem);
    //创建button元素
    var fileSelect = doc.createElement("button");
    fileSelect.className = this.opt.clsName; //重!
    fileSelect.innerText = "选择文件";
    fragment.appendChild(fileSelect);
    //创建div元素和ul元素
    var fileList = doc.createElement("div");
    fileList.className = "fileList";
    var ul = doc.createElement("ul");
    ul.className = "ul";
    fileList.appendChild(ul);
    fragment.appendChild(fileList);

    this.opt.el.appendChild(fragment);

    this.fileElem = fileElem;
    this.fileSelect = fileSelect;
    this.ul = ul; //将其保存到fileSelect实例上，方便之后使用
  };

  //定义该组件的两个功能
  //4.文件选择函数 —— 点击选择文件
  FileSelect.prototype.select = function () {
    var _this = this;
    this.fileElem.addEventListener(
      "click",
      function () {
        return _this.showList(this.files);
      },
      false
    );
    this.fileSelect.addEventListener("click", function () {
      _this.fileElem.click();
    });
  };

  //5.显示文件列表函数 —— 显示出所选文件（允许删除）    //此处有问题！！！
  FileSelect.prototype.showList = function (files) {
    console.log(files);
    var _this = this;
    var fragment = doc.createDocumentFragment();
    for (var i = 0; i < files.length; i++) {
      //创建li
      var li = doc.createElement("li");
      var nameSpan = doc.createElement("span");
      nameSpan.innerText = files[i].name;
      var deleteBtn = doc.createElement("button");
      deleteBtn.innerText = "x";
      deleteBtn.index = i;
      deleteBtn.className = "deleteBtn";
      li.appendChild(nameSpan);
      li.appendChild(deleteBtn);
      fragment.appendChild(li);
    }
    this.ul.appendChild(fragment);

    //将deleteBtn删除文件的点击事件委托给父元素fileList
    this.ul.addEventListener("click", function (e) {
      if (e.target.className === "deleteBtn") {
        console.log(e.target.index);
        delete files[e.target.index];
        console.log(files);
        _this.showList();
      }
    });
  };

  win.FileSelect = FileSelect;
})(window, document);
