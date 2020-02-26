const logoutBtn = document.getElementById('btn-logout');
const apiBtn = document.getElementById('btn-repos');
const issuesBtn = document.getElementById('btn-issues');
const issuesPrivateBtn = document.getElementById('btn-issues-private');
const commitsBtn = document.getElementById('btn-commits');
const callbackResults = document.getElementById('results');

function logout() {
  window.location = 'index.html';
  console.log('Thank you for visiting our page');
}

function clear() {
  while (callbackResults.firstChild) {
    callbackResults.removeChild(callbackResults.firstChild);
  }
}

async function getRepos() {
  clear();
  const url =
    // 'https://api.github.com/search/repositories?q=stars:150000..300000';
    'https://api.github.com/search/repositories?q=repo:Basil-Stratoglou/Aristeia_Basilis_Code';
  const response = await fetch(url);
  const result = await response.json();

  result.items.forEach(i => {
    const anchor = document.createElement('a');
    anchor.href = i.html_url;
    anchor.textContent = i.full_name;
    callbackResults.appendChild(anchor);
    callbackResults.appendChild(document.createElement('br'));
  });
}

async function getIssues() {
  clear();
  const url =
    'https://api.github.com/search/issues?q=author:raisedadead repo:freecodecamp/freecodecamp type:issue';
  const response = await fetch(url);
  const result = await response.json();

  result.items.forEach(i => {
    const anchor = document.createElement('a');
    anchor.href = i.html_url;
    anchor.textContent = i.title;
    callbackResults.appendChild(anchor);
    callbackResults.appendChild(document.createElement('br'));
  });
}
// 919b5a600247211ad6dc6cbc28c36ca790273b97

async function getIssuesPrivate() {
  clear();
  // const username = 'billdelta62@gmail.com';
  // const password = 'S38624007s';
  // const headers = {
  //   Authorization: `Basic ${btoa(`${username}:${password}`)}`
  // };

    const headers = {
        'Authorization': `Token 919b5a600247211ad6dc6cbc28c36ca790273b97`
    }
  const url =
    'https://api.github.com/search/issues?q=repo:Basil-Stratoglou/Aristeia_Basilis_Code type:issue';
  const response = await fetch(url, {
      'method': 'GET',
      'headers': headers
  });
  const result = await response.json();

  result.items.forEach(i => {
    const anchor = document.createElement('a');
    anchor.href = i.html_url;
    anchor.textContent = i.title;
    callbackResults.appendChild(anchor);
    callbackResults.appendChild(document.createElement('br'));
  });
}

async function getCommits(
  url = 'https://api.github.com/search/commits?q=repo:freecodecamp/freecodecamp author-date:2019-03-01..2019-05-31'
) {
  clear();
  const headers = { Accept: 'application/vnd.github.cloak-preview' };
  const response = await fetch(url, {
    method: 'GET',
    headers: headers
  });

  const link = response.headers.get('link');
  const links = link.split(',');
  const urls = links.map(a => {
    return {
      url: a
        .split(';')[0]
        .replace('>', '')
        .replace('<', ''),
      title: a.split(';')[1]
    };
  });
  const result = await response.json();

  result.items.forEach(i => {
    const image = document.createElement('img');
    image.src = i.author.avatar_url;
    image.style.width = '32px';
    image.style.height = '32px';
    const anchor = document.createElement('a');
    anchor.href = i.html_url;
    anchor.textContent = i.commit.message.substr(0, 120);
    callbackResults.appendChild(image);
    callbackResults.appendChild(anchor);
    callbackResults.appendChild(document.createElement('br'));
  });

  urls.forEach(u => {
    const btn = document.createElement('button');
    btn.textContent = u.title;
    btn.addEventListener('click', e => getCommits(u.url));
    callbackResults.appendChild(btn);
  });
}

logoutBtn.addEventListener('click', logout);
apiBtn.addEventListener('click', getRepos);
issuesBtn.addEventListener('click', getIssues);
issuesPrivateBtn.addEventListener('click', getIssuesPrivate);
commitsBtn.addEventListener('click', e => getCommits());
