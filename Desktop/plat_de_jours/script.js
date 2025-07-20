const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const meals = ["Thiebou Dieune", "Poulet Yassa", "Mafé", "Domoda", "Spaghetti", "Pizza", "Burger", "Tiebou Yap"];

let currentUser = "";
let savedUsers = JSON.parse(localStorage.getItem('allUsersMeals')) || {};
let savedChoices = {};

function loadUser() {
  const input = document.getElementById('username');
  const name = input.value.trim();
  if (!name) return alert("Veuillez entrer un prénom.");

  currentUser = name;
  savedChoices = savedUsers[currentUser] || {};
  createPlanner();
}

function createPlanner() {
  const planner = document.getElementById('meal-planner');
  const summary = document.getElementById('summary');
  planner.innerHTML = "";
  summary.innerHTML = "";

  days.forEach(day => {
    const row = document.createElement('div');
    row.className = 'row align-items-center mb-2';

    const labelCol = document.createElement('div');
    labelCol.className = 'col-md-4';
    labelCol.innerHTML = `<label>${day}</label>`;

    const selectCol = document.createElement('div');
    selectCol.className = 'col-md-8';

    const select = document.createElement('select');
    select.className = 'form-select';
    select.dataset.day = day;

    const placeholder = document.createElement('option');
    placeholder.text = "-- Choisir un plat --";
    placeholder.disabled = true;
    placeholder.selected = !savedChoices[day];
    select.appendChild(placeholder);

    meals.forEach(meal => {
      const option = document.createElement('option');
      option.value = meal;
      option.text = meal;
      if (savedChoices[day] === meal) option.selected = true;
      select.appendChild(option);
    });

    select.addEventListener('change', () => {
      savedChoices[day] = select.value;
      savedUsers[currentUser] = savedChoices;
      localStorage.setItem('allUsersMeals', JSON.stringify(savedUsers));
      updatePlanner();
    });

    selectCol.appendChild(select);
    row.appendChild(labelCol);
    row.appendChild(selectCol);
    planner.appendChild(row);
  });

  updatePlanner();
}

function updatePlanner() {
  const selects = document.querySelectorAll('select');
  const chosen = Object.values(savedChoices);
  selects.forEach(select => {
    const currentDay = select.dataset.day;
    const currentVal = savedChoices[currentDay];
    select.querySelectorAll('option').forEach(option => {
      if (chosen.includes(option.value) && option.value !== currentVal) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    });
  });

  // Update summary
  const summary = document.getElementById('summary');
  summary.innerHTML = "";
  days.forEach(day => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `<strong>${day}</strong> : ${savedChoices[day] || "<em>Non défini</em>"}`;
    summary.appendChild(li);
  });
}

document.getElementById('resetBtn').addEventListener('click', () => {
  if (!currentUser) return alert("Choisissez un utilisateur d'abord.");
  if (confirm("Voulez-vous réinitialiser votre planning ?")) {
    delete savedUsers[currentUser];
    localStorage.setItem('allUsersMeals', JSON.stringify(savedUsers));
    savedChoices = {};
    createPlanner();
  }
});

function sendByEmail() {
  let message = `🧆 Planning de ${currentUser} :\n\n`;
  days.forEach(day => {
    message += `- ${day} : ${savedChoices[day] || 'Non défini'}\n`;
  });
  document.getElementById('emailMessage').value = message;
  document.getElementById('realSubmitBtn').click();
}

function sendWhatsApp() {
  let msg = `*🧆 Planning de ${currentUser} :*%0A`;
  days.forEach(day => {
    msg += `👉 ${day} : ${savedChoices[day] || 'Non défini'}%0A`;
  });
  const url = `https://wa.me/?text=${msg}`;
  window.open(url, '_blank');
}

function generateLink() {
  const encoded = encodeURIComponent(JSON.stringify(savedChoices));
  const url = `${location.origin}${location.pathname}?user=${currentUser}&meals=${encoded}`;
  document.getElementById('share-link').innerHTML = `
    <div class="alert alert-info mt-3">Lien : <a href="${url}" target="_blank">${url}</a></div>
  `;
}

function generateQRCode() {
  const qr = document.getElementById('qrcode');
  qr.innerHTML = "";
  const encoded = encodeURIComponent(JSON.stringify(savedChoices));
  const url = `${location.origin}${location.pathname}?user=${currentUser}&meals=${encoded}`;
  new QRCode(qr, url);
}

// Auto-import via URL
window.addEventListener('load', () => {
  const params = new URLSearchParams(location.search);
  if (params.has('user') && params.has('meals')) {
    currentUser = params.get('user');
    document.getElementById('username').value = currentUser;
    savedChoices = JSON.parse(decodeURIComponent(params.get('meals')));
    savedUsers[currentUser] = savedChoices;
    localStorage.setItem('allUsersMeals', JSON.stringify(savedUsers));
    createPlanner();
  }
});

// Notifications à 9h
function getTodayMeal() {
  const idx = (new Date().getDay() + 6) % 7;
  return `${days[idx]} : ${savedChoices[days[idx]] || 'Non défini'}`;
}

function showNotification() {
  if (Notification.permission === "granted") {
    new Notification("🍽️ Plat du jour", {
      body: getTodayMeal(),
      icon: "https://cdn-icons-png.flaticon.com/512/2718/2718224.png"
    });
  }
}

function askNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") scheduleNotification();
    });
  }
}

function scheduleNotification() {
  const now = new Date();
  const target = new Date();
  target.setHours(9, 0, 0, 0);
  if (now > target) target.setDate(now.getDate() + 1);
  const delay = target - now;
  setTimeout(() => {
    showNotification();
    setInterval(showNotification, 86400000);
  }, delay);
}

askNotificationPermission();
