const getButton = document.getElementById("btnGet");
getButton.addEventListener("click", getData);
var users = [];
isEditMode = false;

function saveUser(form) {
  console.log("form", form);

  let userObject = {
    id: null,
    name: null,
    eMail: null,
    userName: null,
  };

  for (const formItem of form) {
    switch (formItem.id) {
      case "inputId":
        userObject.id = parseFloat(formItem.value);
        break;
      case "inputName":
        userObject.name = formItem.value;
        break;
      case "inputEMail":
        userObject.eMail = formItem.value;
        break;
      case "inputUserName":
        userObject.userName = formItem.value;
        break;
      default:
        break;
    }
  }

  console.log("userObject", userObject);

  //   const axiosObject = axios.create({
  //     baseURL: "https://jsonplaceholder.typicode.com",
  //     headers: { Authorization: `Bearer ${tokenValue}` },
  //   });

  //   axiosObject.get("/users").then((response) => {
  //     console.log("response", response);
  //   });

  //   axios.interceptors.request.use(function createLog(config) {
  //     console.log("Log başarılı.", config);
  //   });

  const tokenValue = "xxyyzz";
  if (isEditMode) {
    axios
      .patch(
        `https://jsonplaceholder.typicode.com/users/${userObject.id}`,
        userObject,
        { headers: { Authorization: `Bearer ${tokenValue}` } }
      )
      .then((patchedUser) => {
        // userObject.id = parseFloat(patchedUser.data.id);
        console.log("patchedUser", patchedUser);
      });
  } else {
    axios
      .post("https://jsonplaceholder.typicode.com/users", userObject, {
        headers: { Authorization: `Bearer ${tokenValue}` },
      })
      .then((createdUser) => {
        userObject.id = createdUser.data.id;

        users.push(userObject);

        let tableHtml = `<table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">E-Mail</th>
              <th scope="col">User Name</th>
            </tr>
          </thead>
          <tbody>`;

        for (const userItem of users) {
          tableHtml += `<tr onClick="bindForm(${userItem.id})"><td>${userItem.name}</td><td>${userItem.eMail}</td><td>${userItem.userName}</td></tr>`;
        }

        tableHtml += `</tbody>
            </table>`;

        document.querySelector("#userList").innerHTML = tableHtml;

        document.querySelector(
          "#userToast"
        ).innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="toast-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
              <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
            </svg>
                  <strong class="me-auto">${userObject.name}</strong>
                <small>11 mins ago</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
              <div class="toast-body">
              ${userObject.name} user has created.
              <br>
              E-Mail:  ${userObject.eMail}
              <br>
              User Name:  ${userObject.userName}
              </div>
            </div>
          </div>`;

        var toastLiveExample = document.getElementById("liveToast");
        var toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
        form.reset();
      });
  }
}

function bindForm(userId) {
  isEditMode = true;
  const foundUser = _.find(users, (x) => x.id === userId);

  let userForm = document.querySelector("#userForm");

  for (const userFormElement of userForm) {
    switch (userFormElement.id) {
      case "inputId":
        userFormElement.value = foundUser.id;
        break;
      case "inputName":
        userFormElement.value = foundUser.name;
        break;
      case "inputEMail":
        userFormElement.value = foundUser.eMail;
        break;
      case "inputUserName":
        userFormElement.value = foundUser.userName;
        break;
      default:
        break;
    }
  }

  console.log("foundUser", foundUser);
}

function getData() {
  axios({
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/users",
  })
    .then((res) => {
      users = res.data;

      console.log("users", users);

      var promisses = [];
      //   var axiosPromisses = [];

      for (const userItem of users) {
        // const axiosPromise = axios({
        //   method: "GET",
        //   url: `https://jsonplaceholder.typicode.com/users/${userItem.id}`,
        // });

        // axiosPromisses.push(axiosPromise);

        const returned = getUserDetail(userItem.id);
        promisses.push(returned);
      }

      //   axios.all(axiosPromisses).then((response) => {
      //     console.log("axios all response", response);
      //   });

      Promise.all(promisses).then((userDetails) => {
        for (const userDetail of userDetails) {
          let foundUser = _.find(users, (x) => x.id === userDetail.data.id);
          foundUser["user_detail"] = userDetail.data;
        }
        patchUsers(res.data);
      });
    })
    .catch((err) => {
      console.log("err=>", err.message);
    });
}

const getUserDetail = async (userId) => {
  return await axios({
    method: "GET",
    url: `https://jsonplaceholder.typicode.com/users/${userId}`,
  });
};

function patchUsers(users) {
  let userHtml = "";
  for (const userItem of users) {
    userHtml += `
    <div class="accordion" id="accordion_${userItem.id}">
    <div class="accordion-item">
      <h2 class="accordion-header" id="heading_${userItem.id}">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${userItem.id}" aria-expanded="true" aria-controls="collapse_${userItem.id}">
          ${userItem.name}
        </button>
      </h2>
      <div id="collapse_${userItem.id}" class="accordion-collapse collapse" aria-labelledby="heading_${userItem.id}" data-bs-parent="#accordion_${userItem.id}">
        <div class="accordion-body">
          <strong>${userItem.username}</strong>
          <br>
          Address: ${userItem.user_detail.address.city}
          <br>
          Company: ${userItem.user_detail.company.name}
        </div>
      </div>
    </div>
    `;
  }

  document.querySelector("#users").innerHTML = userHtml;
}
