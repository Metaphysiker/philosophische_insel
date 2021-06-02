window.CHAT = (function() {
    var my_var = 10; //shared variable available only inside your module

    const animateCSS = (element, animation, prefix = 'animate__') =>
      // We create a Promise and return it
      new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd() {
          node.classList.remove(`${prefix}animated`, animationName);
          node.removeEventListener('animationend', handleAnimationEnd);

          resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd);
      });

    function bar() { // this function not available outside your module
        alert(my_var); // this function can access my_var
    }

    return {
        get_button_with_ajax: function(id) {
          $.ajax({
            url: "/vegan_chat/get_button/" + id,
            method: 'POST',
            headers: {
              'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
          });
        },
        get_message_with_ajax: function(id) {
          $.ajax({
            url: "/vegan_chat/get_message/" + id,
            method: 'POST',
            headers: {
              'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
          });
        },
        get_video_with_ajax: function(id) {
          $.ajax({
            url: "/vegan_chat/get_video/" + id,
            method: 'POST',
            headers: {
              'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
          });
        },
        remove_button: function(element) {
          //var element = ".chat-select-button-" + id;

          animateCSS(element, 'bounceOut').then((message) => {
            $(element).remove();
            //$(element).empty();
          });
        },
        loading_time_for_chat_message: 600,
        animateCSS: function(element, animation) {
          animateCSS(element, animation)
        }
    };

})();
