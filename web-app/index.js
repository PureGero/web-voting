import './styles.scss';

import manual from './modules/manual';
import idattend from './modules/idattend';

const modules = [
  manual,
  idattend
];

const renderHome = () => {
  history.pushState({ render: 'renderHome' }, 'Web Voting - Home');

  const container = document.querySelector('.container');
  container.innerHTML = '<h1>Web Voting</h1>';
  modules.forEach(module => {
    const button = document.createElement('div');
    button.className = 'login_button';
    container.appendChild(button);
    module.renderLoginButton(button, renderHome, renderCandidateList);
  });
};

const renderCandidateList = () => {
  history.pushState({ render: 'renderCandidateList' }, 'Web Voting - Candidate List');

  const container = document.querySelector('.container');
  container.innerHTML = '<h1>Candidate List</h1>';
};

window.onload = renderHome;