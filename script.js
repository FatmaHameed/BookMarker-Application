// alert('hi');
document.getElementById('list').onclick = function () {
  document.getElementById('container').style.transform = 'scale(1)';
};
document.getElementById('close').onclick = function () {
  document.getElementById('container').style.transform = 'scale(0)';
};

// make event for the submitted form

document.getElementById('form').addEventListener('submit', memoriseMarkers);

// create memorize marker function
function memoriseMarkers(x) {
  let name = document.getElementById('WebsiteName').value;
  let URL = document.getElementById('URL').value;
  x.preventDefault();

  //check validation
  if (!name && !URL) {
    alert('please insert the name and the url');
    return false;
  } else if (!name) {
    alert('please insert the name');
    return false;
  } else if (!URL) {
    alert('please insert the URL');
    return false;
  } else {
    showLight();
    setTimeout(hideLight, 1000);
  }
  // store data
  let data = {
    siteName: name,
    siteURL: URL,
  };
  if (localStorage.getItem('storage') === null) {
    let arr = [];
    // we push the data to the array
    arr.push(data);
    //then we convert the object array to be data to be readable by local storage
    let myJSON = JSON.stringify(arr);
    //we set the stringified json data to the local storage
    localStorage.setItem('storage', myJSON);
  } else {
    // get the stringified data from local storage then parse it to js object
    let get = JSON.parse(localStorage.getItem('storage'));
    // push the parsed data to the data array above
    get.push(data);
    //stringify the new data again to be readable by local storage
    myJSON = JSON.stringify(get);
    localStorage.setItem('storage', myJSON);
  }
  //prevent reloading to see the result
  display();
  document.getElementById('form').reset();
}

function display() {
  let get = JSON.parse(localStorage.getItem('storage'));
  let result = document.getElementById('yourSite');
  result.innerHTML = '';
  for (let i = 0; i < get.length; i++) {
    result.innerHTML +=
      '<div>' +
      get[i].siteName +
      '<a href="' +
      get[i].siteURL +
      '" target ="_blank">Go</a>' +
      '<button onclick="Delete(\'' +
      get[i].siteName +
      '\')">Delete</button>' +
      '</div>';
  }
}

// function for the light

function showLight() {
  document.getElementById('light').style.display = 'block';
}
function hideLight() {
  document.getElementById('light').style.display = 'none';
}

// function for delete button

function Delete(x) {
  let get = JSON.parse(localStorage.getItem('storage'));
  for (let i = 0; i < get.length; i++) {
    if (get[i].siteName == x) {
      get.splice(i, 1);
    }
  }
  myJSON = JSON.stringify(get);
  localStorage.setItem('storage', myJSON);
  display();
}
