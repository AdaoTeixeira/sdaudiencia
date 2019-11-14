var http = require('http');
var data = JSON.stringify({
  'id': '2'
});

var options = {
  host: 'localhost',
  port: '8081',
  path: '/WebServiceUtility.aspx/CustomOrderService',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': data.length
  }
};

var req = http.request(options, function(res) {
  var msg = '';

  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    msg += chunk;
  });
  res.on('end', function() {
    console.log(JSON.parse(msg));
  });
});



function saveUser() {
    let url = '/api/v1/users/';
    let method = 'post';
    let userData = {
      name: $("#name").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      user_type: $("#user_type").val(),
      estado: $("#estado").val()
    }
  
    if (selectUser) {
      url = url + selectUser;
      method = 'put';
    }else{
      userData['username'] = $("#username").val()
    }
  
    fetch(url, {
      method: method,
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(resp) {  
      if (resp.ok) {
        listUsers();
        $("#user-dlg").modal('hide'); 
        return;
      }else{
        return resp.json();  
      }  
    }).then(function(data) {
      $.alert(data.error.msg);      
    })
  };


req.write(data);
req.end();
