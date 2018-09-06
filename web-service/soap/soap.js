function dataWrapper(content) {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n' +
    '  <soap:Body>\n' +
    content + '\n' +
    '  </soap:Body>\n' +
    '</soap:Envelope>'
  );
}

function requestWrapper(data, callback) {
  var req = new XMLHttpRequest();
  req.open('post', 'https://sloth.cartjonye.com/person');
  req.addEventListener('readystatechange', function () {
    if (this.readyState == 4 && this.status == 200) {
      callback(data, this.responseText);
    }

    if (this.readyState == 4 && this.status >= 400) {
      callback(data, '<?xml version="1.0" encoding="UTF-8"?>\n<status>' + this.statusText + '</status>');
    }

  });


  req.setRequestHeader('Content-Type', 'text/xml');
  req.send(data);
}

function opsGetAll(callback) {
  var content = dataWrapper('    <ns0:getPeople xmlns:ns0="http://sloth.cartjonye.com/"/>');

  requestWrapper(content, callback);
}

function opsGetQuery(name, callback) {
  var content = dataWrapper(
    '    <ns0:getPeopleByNameQuery xmlns:ns0="http://sloth.cartjonye.com/">\n' +
    '      <name>' + encodeURI(name) + '</name>\n' +
    '    </ns0:getPeopleByNameQuery>');

  requestWrapper(content, callback);
}

function opsGetId(id, callback) {
  var content = dataWrapper(
    '    <ns0:getPersonById xmlns:ns0="http://sloth.cartjonye.com/">\n' +
    '      <id>' + encodeURI(id) + '</id>\n' +
    '    </ns0:getPersonById>');

  requestWrapper(content, callback);
}

function opsInsert(id, name, callback) {
  var content = dataWrapper(
    '    <ns0:addPersonString xmlns:ns0="http://sloth.cartjonye.com/">\n' +
    '      <id>' + encodeURI(id) + '</id>\n' +
    '      <name>' + encodeURI(name) + '</name>\n' +
    '    </ns0:addPersonString>');

  requestWrapper(content, callback);
}

function opsUpdate(id, name, callback) {
  var content = dataWrapper(
    '    <ns0:updatePersonNameById xmlns:ns0="http://sloth.cartjonye.com/">\n' +
    '      <id>' + encodeURI(id) + '</id>\n' +
    '      <name>' + encodeURI(name) + '</name>\n' +
    '    </ns0:updatePersonNameById>');

  requestWrapper(content, callback);
}

function opsDelete(id, callback) {
  var content = dataWrapper(
    '    <ns0:deletePersonById xmlns:ns0="http://sloth.cartjonye.com/">\n' +
    '      <id>' + encodeURI(id) + '</id>\n' +
    '    </ns0:deletePersonById>');

  requestWrapper(content, callback);
}