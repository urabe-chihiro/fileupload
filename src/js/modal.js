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