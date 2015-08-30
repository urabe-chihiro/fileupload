(function(window,undefined){
  $(function(){
    //サムネイル画像アップロードをセット
    var fileupload =  new Fileupload({
      id: 'thumbnail001',
      data: {},
      btn: $('#js-thumb-upload__btn'),
      removeBtn: $('#js−thumb-remove'),
      renderWrapper: $('#js-thumb-upload'),
      template: '<li class="thumb-upload__list list-unstyled">' +
                    '<a href="#" class="">' +
                      '<img src="" height="80" >'  +
                    '</a>' +
                    '<div class="js−thumb-remove thumb-upload__remove">' +
                      '削除する' +
                    '</div>' +
                '</li>',
        limit: 10,
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
            });
          }
        },
        removeCallback : function(_target){
            delete this.data[$(_target).attr('id')];
            mLocalStorage.setData(this.id,this.data);
        },
        callback: function(){
          //アップロードした画像をlocalstorageに保存
          fileupload.data[this.imageFile.lastModified] = this.imageFile;
          mLocalStorage.setData(this.id,fileupload.data);
          console.log(mLocalStorage.getData(this.id));
        }
    });

  });
})(window);