var inputName = document.getElementById("siteName");
var urlInput = document.getElementById("siteURL");
var srchInput = document.getElementById("srchUrl");
var containerSite = [];
if (localStorage.getItem("site") !== null) {
  containerSite = JSON.parse(localStorage.getItem("site"));
  display();
}
function addForm() {
  if (validationForm(inputName) && validationForm(urlInput)) {
    var siteGroup = {
      nSite: inputName.value,
      uSite: urlInput.value,
    };
    containerSite.push(siteGroup);
    display();
    localStorage.setItem("site", JSON.stringify(containerSite));
    clearForm();
    Swal.fire({
      icon: "success",
      title: "Bookmark Added Successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Input",
      text: "Please enter valid site name and URL",
    });
  }
}
function clearForm() {
  inputName.value = null;
  urlInput.value = null;
  inputName.classList.remove("is-valid", "is-invalid");
  urlInput.classList.remove("is-valid", "is-invalid");
}
function createCols(i) {
  return `<div class="row list-cat w-100 d-flex justify-content-center align-items-center bg-white text-dark py-2 text-center">
          <div class="col-3 text-capitalize fw-bolder">${i + 1}</div>
          <div class="col-3 text-capitalize fw-bolder">${containerSite[i].nSite}</div>
          <div class="col-3 text-capitalize fw-bolder">
              <a class="btn btn-success" target="_blank" href="https://${
                containerSite[i].uSite
              }" role="button"><i class="fa-solid fa-eye pe-4 "></i>Visit</a>
          </div>
          <div class="col-3 text-capitalize fw-bolder">
            <button onclick="deleteForm(${i})" class="btn btn-danger btnCol">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button>
          </div>
        </div>`;
}
function display() {
  var box = ``;
  for (var i = 0; i < containerSite.length; i++) {
    box += createCols(i);
  }
  document.getElementById("dome").innerHTML = box;
}
function deleteForm(dIx) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      containerSite.splice(dIx, 1);
      localStorage.setItem("site", JSON.stringify(containerSite));
      display();
      Swal.fire("Deleted!", "Your bookmark has been deleted.", "success");
    }
  });
}
function searchForm() {
  var data = srchInput.value;
  box = ``;
  for (var i = 0; i < containerSite.length; i++) {
    if (containerSite[i].nSite.toLowerCase().includes(data.toLowerCase())) {
      box += createCols(i);
    }
  }
  document.getElementById("dome").innerHTML = box;
}

function validationForm(inp) {
  var regex = {
    siteName: /^[a-zA-Z0-9\s_]{3,15}$/,
    siteURL: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i,
  };

  if (inp.id === "siteName" || inp.id === "siteURL") {
    var pattern = inp.id === "siteName" ? regex.siteName : regex.siteURL;
    if (pattern.test(inp.value)) {
      inp.classList.remove("is-invalid");
      inp.classList.add("is-valid");
      return true;
    } else {
      inp.classList.remove("is-valid");
      inp.classList.add("is-invalid");
      return false;
    }
  }
  return false;
}
