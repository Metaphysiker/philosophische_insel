<%= url_string = ".vegan-ch/blog/instagram-code=45" %>
<%= link_to "test", api_vegan_visit_path(value: url_string), method: :post %>

<%= form_with url: api_vegan_visit_url, method: :post do |form| %>
  <%= form.text_field :value, placeholder: url_string %>
  <%= form.submit "Do" %>
<% end %>

<script>

  function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

let data = {
  cookie: getCookie("_ga"),
  url: window.location.href
};

console.log(data);

  fetch("<%= api_vegan_visit_url %>", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });

</script>
