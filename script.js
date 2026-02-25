const BASE = "http://127.0.0.1:5000/api";
let token = localStorage.getItem("token") || null;

/* =============================
   SECTION SWITCH
============================= */
function showSection(el, id) {
  document.querySelectorAll(".section").forEach(sec =>
    sec.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".sidebar li").forEach(li =>
    li.classList.remove("active")
  );
  if (el) el.classList.add("active");
}

/* =============================
   TOAST NOTIFICATION
============================= */
function showToast(msg, success = true) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.background = success ? "#00f2fe" : "#ff4f4f";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

/* =============================
   REGISTER
============================= */
async function register() {
  try {
    await fetch(BASE + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    });

    showToast("Account Created Successfully 🚀");
  } catch {
    showToast("Registration Failed ❌", false);
  }
}

/* =============================
   LOGIN
============================= */
async function login() {
  try {
    const res = await fetch(BASE + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPassword.value
      })
    });

    const data = await res.json();

    if (data.token) {
      token = data.token;
      localStorage.setItem("token", token);
      showToast("Login Successful ✅");
      showSection(null, "generate");
    } else {
      showToast("Invalid Credentials ❌", false);
    }
  } catch {
    showToast("Login Error ❌", false);
  }
}

/* =============================
   GENERATE ROADMAP
============================= */
async function generate() {
  if (!token) {
    showToast("Please Login First ❗", false);
    return;
  }

  document.getElementById("loader").classList.remove("hidden");

  try {
    const res = await fetch(BASE + "/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        skills: skills.value,
        role: role.value,
        level: level.value
      })
    });

    const data = await res.json();

    document.getElementById("loader").classList.add("hidden");

    if (data.roadmap) {
      typeWriterEffect(data.roadmap);
      localStorage.setItem("savedRoadmap", data.roadmap);
      showSection(null, "dashboard");
      showToast("Roadmap Generated Successfully 🎉");
    } else {
      showToast("Generation Failed ❌", false);
    }

  } catch {
    document.getElementById("loader").classList.add("hidden");
    showToast("Server Error ❌", false);
  }
}

/* =============================
   TYPE WRITER EFFECT
============================= */
function typeWriterEffect(text) {
  const output = document.getElementById("output");
  output.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      output.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 8);
    }
  }

  typing();
}

/* =============================
   PROGRESS TRACKER
============================= */
function updateProgressUI(value) {
  document.getElementById("progressFill").style.width = value + "%";
  document.getElementById("progressText").innerText = value + "%";
  localStorage.setItem("progressValue", value);
}

/* =============================
   LOAD SAVED STATE
============================= */
window.onload = function () {
  const savedRoadmap = localStorage.getItem("savedRoadmap");
  const savedProgress = localStorage.getItem("progressValue");

  if (savedRoadmap) {
    document.getElementById("output").innerText = savedRoadmap;
  }

  if (savedProgress) {
    updateProgressUI(savedProgress);
    document.getElementById("progressSlider").value = savedProgress;
  }

  if (token) {
    showSection(null, "generate");
  }
};