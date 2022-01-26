export function Chat(container) {
  this.container = container,
  this.container_class = "." + this.container,
  this.loading_box = this.container + "_loading_box",
  this.loading_box_class = "." + this.loading_box,
  this.waiting_time_for_next_message = 1000,
  this.start = function() {
    this.get_chat_message(1).then(
      (data) => this.append_message_left(data)
    );
  },
  this.get_chat_message = function(id){
    return new Promise(function(resolve, reject)
    {
    $.ajax({
      method: "GET",
      url: "/chat_messages/" + id + "/json"
        })
      .done(function( data ) {
        resolve(data);
      });
    })
  },
  this.append_loading_box = function(){
    $(this.container_class).append(`
      <div class="${this.loading_box} chat-bg-computer chat-text chat-argument-field">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
    `);
  },
  this.remove_loading_box = function(){
    let loading_box_class = this.loading_box_class;
    setTimeout(function(){
      $(loading_box_class).remove();
    }, 5000);
  },
  this.append_message_left = function(data){
    $(this.container_class).append(`
      <div class="chat-section-field">
        <div class="row">
            <div class="col-12 d-flex align-items-end">
              <div class="" style="padding-right: 0.5rem;">
                <%= image_tag "portrait_frau.png", class: "rounded-circle border-white white-border-for-rounded-circle bg-white", width: "50px", height: "50px" %>
              </div>
              <div class="chat-bg-computer chat-text chat-argument-field <%= dom_id(chat_message) %>">
                ${data.content}
              </div>
            </div>
        </div>
      </div>
      `);
  }
}
