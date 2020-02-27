(function () {
  const submitForm = document.getElementById('github-submit-form');

  submitForm.addEventListener('submit', function (event) {
    checkUser();
    event.preventDefault();
  });

  async function checkUser() {
    const githubUsername = document.getElementById('githubUsername').value;
    const url = 'https://api.github.com/search/issues?q=author:' + githubUsername;
    const response = await fetch(url);

    if (submitForm.checkValidity() && response.status == '200') {
      submitForm.submit();
    } else {
      document.getElementById('warning').innerHTML = "<div>Please provide a valid Github username!</div>";
    }
  }
})();
