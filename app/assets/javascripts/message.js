$(function(){
  function buildHTML(message){
    var image = message.image.url ? `<img class="lower-message__image" src=${message.image.url}>` : "";
    var html = `<div class = "main-middle__box" data-message-id="${message.id}">
                  <div class = "main-middle__box__user">
                    <p class = "main-middle__box__user__name">
                    ${message.user_name}
                    </p>
                    <p class = "main-middle__box__user__date">
                    ${message.date}
                    </p>
                  </div>
                  <div class = "main-middle__box__message">
                    <p class = "lower-message_body">
                      ${message.body}
                    </p>
                    <div class ="lower-message__image">
                      ${image}
                    </div>
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    function scrollBottom(){
      var target = $('.main-middle__box').last();
      var position = target.offset().top + $('.main-middle').scrollTop();
      $('.main-middle').animate({
        scrollTop: position
      }, 300, 'swing');
    }
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-middle').append(html)
      $('#new_message')[0].reset();
      scrollBottom()
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
    .always(function(data){
      $('.main-low__form__submit').prop('disabled', false);
    });
  })
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.main-middle__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = ''
      messages.forEach(function (message) {
        insertHTML = buildHTML(message);
        $('.main-middle').append(insertHTML);
      })
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
    }
  };
  setInterval(reloadMessages, 5000);
});
