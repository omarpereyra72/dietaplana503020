// Authentication & Navigation Guard for Dieta Plana 503020

function getRootPath() {
  // Check relative path depth
  const path = window.location.pathname;
  if (path.includes('/textos/') || path.includes('/recetas/') || path.includes('/bibliografia/')) {
    return '../';
  }
  return './';
}

function checkAuth() {
  const isLoggedIn = sessionStorage.getItem('dp503020_logged_in');
  const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');

  if (!isLoggedIn && !isLoginPage && !window.location.pathname.includes('index.html')) {
    window.location.href = getRootPath() + 'index.html';
  }
}

function login(event) {
  event.preventDefault();
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  const errorElement = document.getElementById('error-msg');

  if (user === 'admin' && pass === 'ies21') {
    sessionStorage.setItem('dp503020_logged_in', 'true');
    const loginSec = document.getElementById('login-section');
    const dashSec = document.getElementById('dashboard-section');
    if (loginSec && dashSec) {
      loginSec.style.display = 'none';
      dashSec.style.display = 'block';
    } else {
      window.location.reload();
    }
  } else {
    if (errorElement) {
      errorElement.style.display = 'block';
    }
  }
}

function logout() {
  sessionStorage.removeItem('dp503020_logged_in');
  window.location.href = getRootPath() + 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
  const isLoggedIn = sessionStorage.getItem('dp503020_logged_in');
  const loginSec = document.getElementById('login-section');
  const dashSec = document.getElementById('dashboard-section');

  if (loginSec && dashSec) {
    if (isLoggedIn === 'true') {
      loginSec.style.display = 'none';
      dashSec.style.display = 'block';
    } else {
      loginSec.style.display = 'flex';
      dashSec.style.display = 'none';
    }
  } else {
    checkAuth();
  }
});
