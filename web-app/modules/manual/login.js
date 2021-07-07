import pencil from './pencil.png';

export default async (button, returnToHome, goToCandidateList) => {
  const pencilIcon = new Image();
  pencilIcon.src = pencil;
  button.appendChild(pencilIcon);
  button.appendChild(document.createTextNode('Manual mode'));
  button.onclick = goToCandidateList;
};