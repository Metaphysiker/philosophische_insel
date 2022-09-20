<script defer>
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

let cookie = getCookie("vcpisrr");

if ( cookie ){

} else {
	cookie = Math.floor(10000000 + Math.random() * 90000000);
    document.cookie = "vcpisrr=" + cookie + ";  expires=Tue, 19 Jan 2037 04:14:07 GMT; SameSite=none; path=/; domain=.vegan.ch; Secure";
}

let data = {
  cookie: cookie,
  url: window.location.href
};

fetch('https://www.philosophische-insel.ch/api/vegan_visit', {
  method: 'POST', // or 'PUT',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
</script>
