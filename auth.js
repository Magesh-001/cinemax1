// ============================================================
// auth.js — Authentication: Login, Signup, Logout
// ============================================================

// ── Switch between Sign In / Sign Up tabs ──
function switchTab(t) {
  const isIn = t === 'in';
  document.getElementById('tab-in').classList.toggle('active', isIn);
  document.getElementById('tab-up').classList.toggle('active', !isIn);
  document.getElementById('formIn').style.display = isIn ? 'block' : 'none';
  document.getElementById('formUp').style.display = isIn ? 'none'  : 'block';
  document.getElementById('swTxt').innerHTML = isIn
    ? 'No account? <span onclick="switchTab(\'up\')">Sign Up</span>'
    : 'Have account? <span onclick="switchTab(\'in\')">Sign In</span>';
  document.getElementById('errBox').style.display = 'none';
}

// ── Sign In ──
function doLogin() {
  const email = document.getElementById('inEmail').value.trim();
  const pass  = document.getElementById('inPass').value;
  if (!email || !pass) { showErr('Please fill all fields.'); return; }

  // Accept demo credentials OR any valid-looking email + 4+ char password
  const isDemo  = (email === 'demo@cinemax.com' && pass === '1234');
  const isValid = (email.includes('@') && email.includes('.') && pass.length >= 4);

  if (isDemo || isValid) {
    const name = email.split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
    loginSuccess(name, email);
  } else {
    showErr('Wrong credentials. Try: demo@cinemax.com / 1234');
  }
}

// ── Sign Up ──
function doSignup() {
  const name  = document.getElementById('upName').value.trim();
  const email = document.getElementById('upEmail').value.trim();
  const pass  = document.getElementById('upPass').value;

  if (!name || !email || !pass)           { showErr('Please fill all fields.'); return; }
  if (!email.includes('@'))               { showErr('Enter a valid email address.'); return; }
  if (pass.length < 4)                    { showErr('Password must be at least 4 characters.'); return; }

  loginSuccess(name, email);
}

// ── Social Login ──
function socialLogin(provider) {
  loginSuccess(provider + ' User', 'user@' + provider.toLowerCase() + '.com');
}

// ── Called after any successful login ──
function loginSuccess(name, email) {
  window.loggedIn    = true;
  window.currentUser = { name, email };

  // Update navbar
  document.getElementById('navUser').style.display = 'flex';
  document.getElementById('navSignBtn').style.display = 'none';
  document.getElementById('navAv').textContent = name.charAt(0).toUpperCase();
  document.getElementById('navUn').textContent = name.split(' ')[0];

  // Go to home and render dashboard
  renderHome();
  goPage('home');
  showDash('movies');
}

// ── Logout ──
function logout() {
  if (!confirm('Sign out of CineMax?')) return;
  window.loggedIn = false;
  document.getElementById('navUser').style.display = 'none';
  document.getElementById('navSignBtn').style.display = 'flex';
  goPage('login');
}

// ── Show login error ──
function showErr(msg) {
  const el = document.getElementById('errBox');
  el.textContent = msg;
  el.style.display = 'block';
}
