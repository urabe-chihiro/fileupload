(function(window,undefined){
  var fileupload =  new Fileupload({
    btn: $('#js-thumb-upload__btn'),
    renderWrapper: $('#js-thumb-upload'),
    template: '<li class="thumb-upload__list list-unstyled">' +
                  '<a href="#" class="">' +
                    '<img src="" height="80" >'  +
                  '</a>' +
              '</li>',
      limit: 5,
      callback: function(){
        //表示数によって、アップロードボタンのスタイル切り替え
      }
  });
})(window);