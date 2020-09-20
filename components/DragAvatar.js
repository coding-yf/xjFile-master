/*
    组件drag-avatar：【拖拽选择头像】
    -拖拽选择图片
    -显示缩略图(预览)
*/
(function (win, doc) {
  //1.主构造函数
  function DragAvatar(opt) {
    var defaultOption = {
      el: doc.body,
      clsName: "drop-box",
      accept: "image/png, image/gif, image/jpg, image/jpeg, image/webp",
    };
    if (opt.el) {
      opt.el = typeof opt.el === "object" ? opt.el : doc.querySelector(opt.el);
    }
    this.opt = minix(defaultOption, opt);

    this.init();
  }

  //2.初始化函数 —— 调用其他方法
  DragAvatar.prototype.init = function () {
    this.render();
    this.select();
  };

  //3.渲染函数 —— 创建DragAvatar组件相关的HTML元素
  DragAvatar.prototype.render = function () {
    //创建dropbox，即拖拽放置图片的区域
    var dropbox = doc.createElement("div");
    dropbox.className = this.opt.clsName; //重！
    this.opt.el.appendChild(dropbox);
    //创建img，即显示缩略图的地方
    var img = document.createElement("img");
    img.className = "avatar";
    dropbox.appendChild(img);

    this.dropbox = dropbox; //将其保存到dragAvatar实例上，方便之后使用
    this.img = img;
  };

  //定义该组件的两个功能
  //4.文件选择函数 —— 拖拽选择文件
  DragAvatar.prototype.select = function () {
    // console.log("说明文件已经进入dropbox了");
    var dragenter = function (e) {
      e.stopPropagation();
      e.preventDefault();
    };
    var dragover = function (e) {
      e.stopPropagation();
      e.preventDefault();
    };
    var drop = (e) => {
      e.stopPropagation();
      e.preventDefault();
      //从事件对象中获取到dataTransfer这个域，然后从中得到列表，再将其传递给handleFiles函数
      var dt = e.dataTransfer;
      var files = dt.files;
      // console.log(files);
      //调用显示缩略图函数
      this.preview(files[0]);
    };
    var dropbox = this.dropbox;
    dropbox.addEventListener("dragenter", dragenter, false);
    dropbox.addEventListener("dragover", dragover, false);
    dropbox.addEventListener("drop", drop, false);
  };

  //5.预览函数 —— 显示缩略图
  DragAvatar.prototype.preview = function (file) {
    //使用FileReader()来生成临时URL对象
    var reader = new FileReader();
    //当读取开始时，判断该文件是否为图片，若不为图片则不再继续读取过程
    var _this = this;
    reader.onloadstart = function () {
      if (
        _this.opt.accept !== "*" &&
        _this.opt.accept.indexOf(file.type.toLowerCase()) === -1
      ) {
        reader.abort();
        alert(`文件${file.type.toLowerCase()}格式有误,请上传图片`);
      }
    };
    //当读取完成时，将img的src指向我们创建的url对象
    reader.onload = (function (imgElem) {
      return function (e) {
        //本质上就是将我们创建的img标签，加上src属性，使其引用代表图片的临时URL
        var objectUrl = e.target.result;
        if (objectUrl) {
          imgElem.src = objectUrl;
        }
      };
    })(_this.img);
    //使用reader读取file(是异步的，在后台进行的)，并且将图片转为一个临时可用的URL(上面result当中存的就是该URL)
    reader.readAsDataURL(file);
  };

  win.DragAvatar = DragAvatar;
})(window, document);
