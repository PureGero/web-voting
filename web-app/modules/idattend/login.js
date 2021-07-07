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
    container.querySelector('#credentials').style.display = event.target.checked ? 'none' : '';
  };

  formLogin.onsubmit = event => {
    localStorage.idattendServer = inputServer.value;
    localStorage.idattendPhotos = inputPhotos.value;
    localStorage.idattendDomain = inputDomain.value;
    localStorage.idattendUsername = inputUsername.value;
    localStorage.idattendIntegratedAuthentication = inputIntegratedAuthentication.checked;
    ipcRenderer.invokeTask('perform-action', {
      domain: inputDomain.value,
      user: inputUsername.value,
      password: inputPassword.value,
      database: 'IDAttend2021',
      server: inputServer.value,
      options: {
        encrypt: false, // for azure
        trustServerCertificate: true,
        trustedConnection: inputIntegratedAuthentication.checked
      }
    });
    event.preventDefault();
    return false;
  };

  if (localStorage.idattendServer) {
    inputServer.value = localStorage.idattendServer;
  }
  if (localStorage.idattendPhotos) {
    inputPhotos.value = localStorage.idattendPhotos;
  }
}

export default async (button, returnToHome, goToCandidateList) => {
  const idattendIcon = new Image();
  idattendIcon.src = idattend;
  idattendIcon.className = 'no_invert';
  button.appendChild(idattendIcon);
  button.appendChild(document.createTextNode('IDAttend'));

  button.onclick = renderIDAttendLoginForm;
};