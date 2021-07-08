import idattend from './idattend.png';

const renderIDAttendLoginForm = () => {
  const container = document.querySelector('.container');
  container.innerHTML = `
<h1>IDAttend Login</h1>
<form>
  <label for="server">IDAttend Server:</label>
  <input id="server"/>
  <label for="photos">IDAttend Photos:</label>
  <input id="photos"/>
  <label for="integratedAuthentication"><input type="checkbox" id="integratedAuthentication" checked/>Use Integrated Authentication</label>
  <div id="credentials" style="display: none">
    <label for="domain">Login domain:</label>
    <input id="domain"/>
    <label for="username">Username:</label>
    <input id="username"/>
    <label for="password">Password:</label>
    <input id="password" type="password"/>
  </div>
  <input type="submit" value="Login &gt;"></input>
</form>
`;

  const formLogin = container.querySelector('form');
  const inputServer = container.querySelector('#server');
  const inputPhotos = container.querySelector('#photos');
  const inputIntegratedAuthentication = container.querySelector('#integratedAuthentication');
  const inputDomain = container.querySelector('#domain');
  const inputUsername = container.querySelector('#username');
  const inputPassword = container.querySelector('#password');

  // const getPhotosFromServer = server => `\\\\${server.split('\\')[0]}\\Apps\\IDAttend\\photos`;
  const getPhotosFromServer = server => `http://${server.split('\\')[0]}/IDAttendWebPhotos/`;

  inputServer.onkeydown = event => {
    if (!inputPhotos.value || inputPhotos.value == getPhotosFromServer(inputServer.value)) {
      // Photos hasn't been modified by the user, recalculate the default value
      setTimeout(() => inputPhotos.value = getPhotosFromServer(inputServer.value), 0);
    }
  };

  inputIntegratedAuthentication.onchange = event => {
    container.querySelector('#credentials').style.display = inputIntegratedAuthentication.checked ? 'none' : '';
  };

  formLogin.onsubmit = event => {
    localStorage.idattendServer = inputServer.value;
    localStorage.idattendPhotos = inputPhotos.value;
    localStorage.idattendDomain = inputDomain.value;
    localStorage.idattendUsername = inputUsername.value;
    localStorage.idattendIntegratedAuthentication = inputIntegratedAuthentication.checked;
    fetch('/idattend/connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        domain: !inputIntegratedAuthentication.checked && inputDomain.value ? inputDomain.value : undefined,
        user: inputIntegratedAuthentication.checked ? undefined : inputUsername.value,
        password: inputIntegratedAuthentication.checked ? undefined : inputPassword.value,
        database: `IDAttend${new Date().getFullYear()}`,
        server: inputServer.value,
        options: {
          // encrypt: false, // for azure
          // trustServerCertificate: true,
          trustedConnection: inputIntegratedAuthentication.checked
        }
      })
    }).then(res => res.json()).then(console.log);
    event.preventDefault();
    return false;
  };

  if (localStorage.idattendServer) {
    inputServer.value = localStorage.idattendServer;
  }
  if (localStorage.idattendPhotos) {
    inputPhotos.value = localStorage.idattendPhotos;
  }
  if (localStorage.idattendDomain) {
    inputDomain.value = localStorage.idattendDomain;
  }
  if (localStorage.idattendUsername) {
    inputUsername.value = localStorage.idattendUsername;
  }
  if (localStorage.idattendIntegratedAuthentication) {
    inputIntegratedAuthentication.checked = localStorage.idattendIntegratedAuthentication;
    inputIntegratedAuthentication.onchange();
  }

  fetch('/idattend/isTrustedConnectionEnabled').then(res => res.json()).then(isTrustedConnectionEnabled => {
    console.log(`isTrustedConnectionEnabled = ${isTrustedConnectionEnabled}`);
    if (!isTrustedConnectionEnabled) {
      inputIntegratedAuthentication.disabled = true;
      inputIntegratedAuthentication.checked = false;
      inputIntegratedAuthentication.onchange();
    }
  });

  fetch('/idattend/getDefaultDomain').then(res => res.text()).then(domain => {
    inputDomain.value = domain;
  });
}

export default async (button, returnToHome, goToCandidateList) => {
  const idattendIcon = new Image();
  idattendIcon.src = idattend;
  idattendIcon.className = 'no_invert';
  button.appendChild(idattendIcon);
  button.appendChild(document.createTextNode('IDAttend'));

  button.onclick = renderIDAttendLoginForm;
};