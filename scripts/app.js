const loginBtn = document.getElementById('btn-login');

const test = 1;

function login() {
  if (test == 1) {
    console.log('It works!');
    window.location = 'notindex.html';
  } else {
    console.log('It works, but the other way');
  }
}

loginBtn.addEventListener('click', login);
