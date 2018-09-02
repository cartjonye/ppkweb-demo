function validateXMLSchema(xml, xsd, callback) {
  var Module = {
    xml: xml,
    schema: xsd,
    arguments: ["--noout", "--schema", "xsd", "xml"]
  };

  var xmllint = validateXML(Module);

  callback(xmllint);
}

window.addEventListener("load", function () {
  document.getElementById("submit-xml").addEventListener("click", function(){
    var xml = document.getElementById("input-xml").value;
    var xsd = document.getElementById("input-xsd").value;
    validateXMLSchema(xml, xsd, function(res){
      document.getElementById("output-validation").value = res;
    })
  })
})