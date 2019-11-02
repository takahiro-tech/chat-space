$(function(){
  function buildHTML(message){
    var body = message.body ? `${ message.body }` : "";
    var image = message.image.url ? `<img class="message-text__image" src=${message.image.url}>` : "";
    var html = `<div class = "main-middle__box">
                  <div class = "main-middle__box__user">
                    <p class = "main-middle__box__user__name">
                    ${message.user_name}
                    </p>
                    <p class = "main-middle__box__user__date">
                    ${message.date}
                    </p>
                  </div>
                  <p class = "main-middle__box__message">
                    ${body}
                    <div class ="lower-message__image">
                    ${image}
                  </p>
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
    })
  })
})
