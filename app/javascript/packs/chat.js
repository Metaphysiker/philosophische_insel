export function Chat(container) {
  this.container = container,
  this.container_class = "." + this.container,
  this.loading_box = this.container + "_loading_box",
  this.loading_box_class = "." + this.loading_box,
  this.waiting_time_for_next_message = 1000,
  this.loading_time = 1000,
  this.calculate_reading_time = function(string){
    return 2000 + string.length * 50
  },
  this.calculate_loading_time = function(string){
    return 1000 + string.length * 25
  },
  this.add_left_chat_message = function(id) {
    var self = this;
    self.get_chat_message(id)
    .then(data => self.append_loading_box_left(data))
    .then(data => self.append_message_to_box(data))
    .then(data =>
      setTimeout(function(){
        self.chat_messages_controller(data)
      }, self.calculate_reading_time(data.content))
    )
  },
  this.chat_messages_controller = function(data){
    var self = this;
    var first_child = data.children[0];
    var children = data.children;

    if (first_child["chatter"] === "computer"){
      self.add_left_chat_message(first_child.id)
    } else {
      self.add_buttons(children);
    }
  },
  this.log = function(){
    console.log("OOOOGOGOGIJAOGAG")
  },
  this.add_buttons = function(children){
    var self = this;
    var html_buttons = "";

    for (let i = 0; i < children.length; i++) {
      html_buttons += `<button class="btn btn-light chat-buttons" data-chat-message-id="${children[i].id}" type="button">${children[i].content}</button>`;
    }

    return new Promise(function(resolve, reject)
    {
    $(self.container_class).append(`
      <div class="d-grid gap-4 col-6 mx-auto">
        ${html_buttons}
      </div>
      `)

      $(".chat-buttons").click(function(){
        console.log($(this).data("chat-message-id"));
      });

      resolve(children)
    })
  },
  this.append_loading_box_left = function(data){
    var self = this;
    return new Promise(function(resolve, reject)
    {
    $(self.container_class).append(`
      <div class="chat-section-field">
        <div class="row">
            <div class="col-12 d-flex align-items-end">
              <div class="" style="padding-right: 0.5rem;">
                <img src="${data.image_url}" class="rounded-circle border-white white-border-for-rounded-circle bg-white" width="50px" height="50px">
              </div>
              <div class="chat-bg-computer chat-text chat-argument-field chat_message_${data.id}">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
              </div>
            </div>
        </div>
      </div>
      `)
      resolve(data)
    })
  },
  this.append_message_to_box = function(data){
    var self = this;
    return new Promise(function(resolve, reject)
    {
      setTimeout(function(){
        $(".chat_message_" + data.id).html(data.content);
        resolve(data)
      }, self.calculate_loading_time(data.content))

    })
  },
  this.start = function() {
    var self = this;
    this.add_left_chat_message(1)
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
    $(this.loading_box_class).remove();
  },
  this.append_message_left = function(data){
    var self = this;
    return new Promise(function(resolve, reject)
    {
    $(self.container_class).append(`
      <div class="chat-section-field">
        <div class="row">
            <div class="col-12 d-flex align-items-end">
              <div class="" style="padding-right: 0.5rem;">
                <img src="${data.image_url}" class="rounded-circle border-white white-border-for-rounded-circle bg-white" width="50px" height="50px">
              </div>
              <div class="chat-bg-computer chat-text chat-argument-field chat_message_${data.id}">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
              </div>
            </div>
        </div>
      </div>
      `)
      resolve(data)
    })
  }
}
