//Variables
var siteName = document.getElementById("bookmarkname");
var siteUrl = document.getElementById("bookmarkurl");

var siteList;

//Local storage Check
if (localStorage.getItem("siteList")) {
  siteList = JSON.parse(localStorage.getItem("siteList"));
  displaySite(siteList);
} else {
  siteList = [];
}
//ValidURL_Function
function isValidUrl(url) {
  const urlRegex =
  /^https?:\/\//;
  return urlRegex.test(url);
}


//Add_Function
function addSite() {
  var site = {
    name: siteName.value,
    url: siteUrl.value,
  };

  if (site.name.trim() === "" && site.url.trim() === "") {
    alert("You Need To Enter Data first");
  }
  else if (site.name.trim() === "") {
    alert("You Need To Enter Site Name first");

  }
  else if (site.name.length <= 2) {
    alert("Site Name should be more than 2 characters");

  }
  else if (site.url.trim() === "") {
    alert("You Need To Enter URL first");

  }
   else if (!isValidUrl(site.url)){
    alert("You Need To Enter A Valid URL");
  }
  else{
    siteList.push(site);
  }
  displaySite(siteList);
  localStorage.setItem("siteList", JSON.stringify(siteList));
  clearForm();
}

//DisplayFunction
function displaySite(list) {
  var cartona = ``;
  for (var i = 0; i < list.length; i++) {
    cartona += `
<tr>
<td>${i + 1}</td>
<td>${list[i].name}</td>
<td><button class="btn btn-warning"onclick=' visitSite(${i})'><i class="icofont-eye"></i> Visit</button></td>
<td><button class=" btn btn-danger" onclick=' deleteSite(${i})'><i class="icofont-trash"></i> Delete</button></td>
</tr>`;
  }
  document.getElementById("siteData").innerHTML = cartona;
}

//ClearFunction
function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
}

//DeleteFunction
function deleteSite(index) {
  siteList.splice(index, 1);
  localStorage.setItem("siteList", JSON.stringify(siteList));
  displaySite(siteList);
}

//VisitFunction
function visitSite(index) {
  open(siteList[index].url);
}
