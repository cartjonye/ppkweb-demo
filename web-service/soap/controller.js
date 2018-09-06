
function setTableOutput(doc) {
  var outputTable = document.getElementById("output-table");
  var outputStatus = document.getElementById("output-status");
  var people = doc.getElementsByTagName("person");
  var status = doc.getElementsByTagName("status");

  if (status.length == 0){
    outputStatus.hidden = true;
    outputTable.hidden = false;
    outputTable.getElementsByTagName("tbody")[0].innerHTML = "";
    for(var i = 0; i < people.length; i++){
      var row = document.createElement("tr");
      var id = document.createElement("td");
      var name = document.createElement("td");

      id.innerText = people[i].getElementsByTagName("id")[0].innerHTML;
      name.innerText = people[i].getElementsByTagName("name")[0].innerHTML;

      row.appendChild(id);
      row.appendChild(name);
      outputTable.getElementsByTagName("tbody")[0].appendChild(row);
    }
  }
  else {
    outputTable.hidden = true;
    outputStatus.hidden = false;
    outputStatus.innerText = status[0].innerHTML;
  }
}

function setXMLoutput(req, res) {
  var request = document.getElementById("request-xml");
  var response = document.getElementById("response-xml");

  request.value = req;
  response.value = vkbeautify.xml(res, 2);

  setTableOutput((new DOMParser()).parseFromString(res, "text/xml"));
  toggleAllInputs();
}

function submitOps() {
  var ops = document.getElementById("operation");
  var idInput = document.getElementById("id-input").value;
  var nameInput = document.getElementById("name-input").value;


  var opsValue = ops.options[ops.selectedIndex].value;

  toggleAllInputs();
  switch (opsValue) {
    case "get-id":
      opsGetId(idInput, setXMLoutput);
      break;

    case "delete":
      opsDelete(idInput, setXMLoutput);
      break;

    case "get-query":
      opsGetQuery(nameInput, setXMLoutput);
      break;

    case "insert":
      opsInsert(idInput, nameInput, setXMLoutput);
      break;

    case "update":
      opsUpdate(idInput, nameInput, setXMLoutput);
      break;

    case "get-all":
      opsGetAll(setXMLoutput);
      break;

    default:
      break;
  }
}



function toggleAllInputs() {
  var ops = document.getElementById("operation");
  var idInput = document.getElementById("id-input");
  var nameInput = document.getElementById("name-input");
  var request = document.getElementById("request-xml");
  var response = document.getElementById("response-xml");
  var submit = document.getElementById("submit-ops");

  if (!ops.disabled) {
    ops.disabled = true;
    idInput.disabled = true;
    nameInput.disabled = true;
    request.disabled = true;
    response.disabled = true;
    submit.disabled = true;
  }
  else {
    ops.disabled = false;
    idInput.disabled = false;
    nameInput.disabled = false;
    request.disabled = false;
    response.disabled = false;
    submit.disabled = false;
    toggleParamInputs();
  }
}

function toggleResetParamInputs() {
  var idInput = document.getElementById("id-input");
  var nameInput = document.getElementById("name-input");
  idInput.value = "";
  nameInput.value = "";
  toggleParamInputs();
}
function toggleParamInputs() {
  var ops = document.getElementById("operation");
  var idInput = document.getElementById("id-input");
  var nameInput = document.getElementById("name-input");

  var opsValue = ops.options[ops.selectedIndex].value;

  switch (opsValue) {
    case "get-id":
    case "delete":
      idInput.disabled = false;
      nameInput.disabled = true;
      break;
    case "get-query":
      idInput.disabled = true;
      nameInput.disabled = false;
      break;
    case "insert":
    case "update":
      idInput.disabled = false;
      nameInput.disabled = false;
      break;
    case "get-all":
      idInput.disabled = true;
      nameInput.disabled = true;
      break;
    default:
      break;
  }
}



window.addEventListener("load", function () {
  toggleResetParamInputs();
  document.getElementById("operation").addEventListener("change", toggleResetParamInputs);
  document.getElementById("submit-ops").addEventListener("click", submitOps);
});