export const message = (type, msg, callback) => {
  const P = document.querySelector('body');
  P.style = 'position: relative';

  const M = document.createElement('div');
  M.innerHTML = `${msg}`;
  M.style = `
    position: absolute; 
    top: 10px; left: 50%; 
    transform: translateX(-50%); 
    background: ${type === 'danger' ? 'red' : 'green'};
  `;

  P.appendChild(M);

  const t = window.setTimeout(function() {
    P.removeChild(M);
    callback();
    window.clearTimeout(t);
  }, 2000);
};
