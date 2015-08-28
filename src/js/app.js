(function(window,undefined){
  var fileupload =  new Fileupload({
    btn: $('#js-thumb-upload__btn'),
    removeBtn: $('.thumb-upload__remove'),
    renderWrapper: $('#js-thumb-upload'),
    template: '<li class="thumb-upload__list list-unstyled">' +
                  '<a href="#" class="">' +
                    '<img src="" height="80" >'  +
                  '</a>' +
                  '<div class="js−thumb-remove thumb-upload__remove">' +
                    '削除する' +
                  '</div>' +
              '</li>',
      limit: 3,
      setLayout: true,
      callback: function(){
        //表示数によって、アップロードボタンのスタイル切り替え
      }
  });
})(window);