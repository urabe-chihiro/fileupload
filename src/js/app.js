(function(window,undefined){
  var fileupload =  new Fileupload({
    btn: $('#js-btn-upload'),
    renderWrapper: $('#js-thumbnail-wrapper'),
    template: '<div class="col-xs-6 col-md-3">' +
                  '<a href="#" class="thumbnail">' +
                    '<img src="" height="80" >'  +
                  '</a>' +
                '</div>',
      limit: 5,
      callback: function(){
        //表示数によって、アップロードボタンのスタイル切り替え
      }
  });
})(window);