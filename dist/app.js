/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var mLocalStorage = __webpack_require__(1);
	var Fileupload = __webpack_require__(2);
	var modal = __webpack_require__(3);

	$(function(){
	  //サムネイル画像アップロードをセット
	  var fileupload =  new Fileupload({
	    id: 'thumbnail001',
	    data: {},
	    btn: '#js-thumb-upload__btn',
	    removeBtn: '.js−thumb-remove',
	    renderWrapper: $('#js-thumb-upload'),
	    template: '<li class="thumb-upload__list list-unstyled">' +
	                '<div class="thumb-upload__img">' +
	                    '<img src="" height="80" data-toggle="modal" data-target="#myModal">'  +
	                '</div>' +
	                '<div class="js−thumb-remove thumb-upload__remove">' +
	                  '×' +
	                '</div>' +
	              '</li>',
	      limit: 5,
	      setLayout: true,
	      before: function(){
	        //localstorage にあるデータを表示
	        var _self = this;
	        if(mLocalStorage.getData(this.id)){
	          this.data = JSON.parse(mLocalStorage.getData(this.id));
	          $.each(this.data,function(_key,_img){
	            _self.imageFile = {
	              id: _img.lastModified,
	              name: _img.name,
	              lastModified: _img.lastModified,
	              url: _img.url
	            };
	            _self.renderThumb();
	            _self.setLayout && _self.setThumbLayout();
	            _self.toggleThumbDisplay();

	            modal.init(_self.thumb);
	          });
	        }
	      },
	      removeCallback : function(_target){
	          delete this.data[$(_target).attr('id')];
	          mLocalStorage.setData(this.id,this.data);
	      },
	      callback: function(){
	        var _self = this;
	        //アップロードした画像をlocalstorageに保存
	        fileupload.data[this.imageFile.lastModified] = this.imageFile;
	        mLocalStorage.setData(this.id,fileupload.data);
	        //click したらモーダル開くイベントをセット
	        modal.init(_self.thumb);
	      }
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var mLocalStorage = {
	    storage: localStorage,
	    setData: function(_id,_data){
	        var _setData = ($.isPlainObject(_data)) ? JSON.stringify(_data) : _data;
	        this.storage.setItem(_id,_setData);
	        //console.log(this.storage.getItem(_id));
	    },
	    getData: function(_id){
	        return this.storage.getItem(_id);
	    },
	    removeData: function(_id){
	        this.storage.remove(_id);
	        //console.log(this.storage.getITem(_id));
	    }
	};

	module.exports = mLocalStorage;



/***/ },
/* 2 */
/***/ function(module, exports) {

	//サムネイルを投稿する
	var Fileupload = function(_options){
	  this.postedfile = $('.file-posted');
	  $.extend(true,this,_options);
	  this.before && this.before();
	  this.initEvents();
	};
	Fileupload.prototype.initEvents = function(){
	  var _self = this;
	  $(this.btn).on('change','input',function(e){
	    if(_self.checkFileApiSupport()){
	      _self.readImageFile(e.target.files);
	      $(e.target).val('');
	    };
	  });
	  this.renderWrapper.on('click', this.removeBtn ,function(e){
	      var _target = $(e.target).closest('.thumb-upload__list');
	      _self.removeCallback && _self.removeCallback(_target);
	      _target.remove();
	      _self.toggleThumbDisplay();
	  });
	};
	Fileupload.prototype.readImageFile = function(_files){
	  var self = this;
	  $(_files).each(function(_i,_file){
	    if(_file.type.indexOf('image') >= 0){
	      var reader = new FileReader();
	      //ファイルの読み込みが完了したら
	      reader.onload = function(e){
	        self.imageFile = {
	          id: _file.lastModified,
	          name : _file.name,
	          lastModified: _file.lastModified,
	          url: e.target.result
	        };
	        //追加した画像をDOMに追加
	        self.renderThumb();
	        self.setLayout && self.setThumbLayout();
	        self.toggleThumbDisplay();
	        self.callback && self.callback();
	      };
	      //ファイルの内容を取得
	      reader.readAsDataURL(_file);
	    };
	  });
	};
	Fileupload.prototype.checkFileApiSupport = function(){
	  if (window.File && window.FileReader && window.FileList && window.Blob) {
	    // Great success! All the File APIs are supported.
	    console.log('[COMMENT] All the File APIs are supported.');
	    return true;
	  } else {
	    alert('The File APIs are not fully supported in this browser.');
	    return false;
	  }
	};

	Fileupload.prototype.renderThumb = function(){
	  this.thumb = $(this.template);
	  $(this.thumb)
	    .attr('id',this.imageFile.id)
	    .find('img')
	    .attr('src',this.imageFile.url)
	    .attr('alt',this.imageFile.name)
	    .attr('role','posted-file');
	  this.renderWrapper.append(this.thumb);
	},
	Fileupload.prototype.toggleThumbDisplay = function(){
	  var _flg = this.renderWrapper.find('img[role=posted-file]').length >= this.limit;
	  $(this.btn).toggleClass('disabled',_flg);
	  $(this.btn).find('input').prop('disabled',_flg);
	},
	Fileupload.prototype.setThumbLayout = function(){
	  var _img = new Image(),
	      _imgWidth,
	      _imgHeight,
	      _thumbLeft;

	  _img.src = this.imageFile.url;
	  _imgWidth = _img.width;
	  _imgHeight = _img.height;

	  this.thumb.find('img').attr('height',(_imgWidth > _imgHeight) ? this.thumb.innerHeight() : 'auto');
	  this.thumb.find('img').attr('width',(_imgWidth > _imgHeight) ? 'auto' : this.thumb.innerWidth());

	  //画像センタリング
	  _thumbLeft = this.thumb.innerWidth()/2 - this.thumb.find('img').innerWidth()/2;
	  this.thumb.find('img').css('margin-left',_thumbLeft + 'px');
	}

	module.exports = Fileupload;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var modal = {
	  init: function(_target){
	    this.target = _target;
	    this.initEvent();
	  },
	  initEvent: function(){
	    $(this.target).on('click',function(e){
	      $('.modal-title')
	      .text($(this).find('img').attr('alt'))
	      .css('text-align','center');

	    $('.modal-body')
	      .html('<img src="' + $(this).find('img').attr('src') + '" height="300">')
	      .css('text-align','center');
	    });
	  }
	};

	module.exports = modal;

/***/ }
/******/ ]);