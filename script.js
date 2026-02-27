// =============================
// STABLE AI ROADMAP ENGINE
// =============================

let completed = 0;
let totalSteps = 0;

// Role Database
const roleDatabase = {
  "penetration tester": [
    "networking",
    "linux",
    "python",
    "web security",
    "nmap",
    "burp suite",
    "cryptography",
    "owasp",
    "ctf",
    "scripting"
  ],
  "ai engineer": [
    "python",
    "data structures",
    "machine learning",
    "deep learning",
    "tensorflow",
    "statistics",
    "linear algebra",
    "projects"
  ],
  "frontend developer": [
    "html",
    "css",
    "javascript",
    "react",
    "api",
    "git",
    "responsive design"
  ]
};

// =============================
// LOGIN SYSTEM
// =============================

function register() {
  alert("Registered Successfully!");
}

function login() {
  document.getElementById("authBox").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
}

function logout() {
  location.reload();
}

// =============================
// SECTION SWITCH
// =============================

function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec =>
    sec.classList.remove("active")
  );
  document.getElementById(sectionId).classList.add("active");
}

// =============================
// SMART ROLE MATCHING
// =============================

function findBestRoleMatch(userGoal) {
  userGoal = userGoal.toLowerCase();

  for (let role in roleDatabase) {
    if (userGoal.includes(role)) {
      return role;
    }
  }

  // fallback partial match
  for (let role in roleDatabase) {
    if (role.includes(userGoal) || userGoal.includes(role.split(" ")[0])) {
      return role;
    }
  }

  return null;
}

// =============================
// MAIN AI ROADMAP FUNCTION
// =============================

function generateRoadmap() {

  const goalInput = document.getElementById("goal").value.trim();
  const level = document.getElementById("level").value;
  const skillsInput = document.getElementById("skills").value;

  const output = document.getElementById("roadmapOutput");
  output.innerHTML = "";

  if (!goalInput) {
    output.innerHTML = "<p>⚠ Please enter your target role.</p>";
    return;
  }

  const matchedRole = findBestRoleMatch(goalInput);

  if (!matchedRole) {
    output.innerHTML = "<p>⚠ Role not found. Try: Penetration Tester / AI Engineer / Frontend Developer</p>";
    return;
  }

  const requiredSkills = roleDatabase[matchedRole];

  const userSkills = skillsInput
    .toLowerCase()
    .split(",")
    .map(skill => skill.trim())
    .filter(skill => skill !== "");

  const missingSkills = requiredSkills.filter(
    skill => !userSkills.includes(skill)
  );

  if (missingSkills.length === 0) {
    output.innerHTML = "<h2>🔥 You already match this role! Start applying now.</h2>";
    return;
  }

  totalSteps = missingSkills.length;
  completed = 0;
  updateProgress();

  // =============================
  // PHASE LOGIC
  // =============================

  let phaseCount = level === "Beginner" ? 3 :
                   level === "Intermediate" ? 2 : 1;

  const chunkSize = Math.ceil(missingSkills.length / phaseCount);

  for (let i = 0; i < phaseCount; i++) {

    const phaseSkills = missingSkills.slice(i * chunkSize, (i + 1) * chunkSize);

    if (phaseSkills.length === 0) continue;

    const phaseTitle = document.createElement("h2");
    phaseTitle.innerText = `🚀 Phase ${i + 1}`;
    output.appendChild(phaseTitle);

    phaseSkills.forEach(skill => {

      const card = document.createElement("div");
      card.className = "roadmap-card";

      const weeks = Math.floor(Math.random() * 3) + 2;

      card.innerHTML = `
        <strong>${skill.toUpperCase()}</strong>
        <p>Estimated Time: ${weeks} weeks</p>
      `;

      card.onclick = () => markComplete(card);

      output.appendChild(card);
    });
  }
}

// =============================
// PROGRESS SYSTEM
// =============================

function markComplete(card) {
  if (!card.classList.contains("done")) {
    card.classList.add("done");
    card.style.background = "#00c9a7";
    completed++;
    updateProgress();
  }
}

function updateProgress() {
  const percent = totalSteps === 0 ? 0 : (completed / totalSteps) * 100;
  document.getElementById("progressFill").style.width = percent + "%";
  document.getElementById("progressText").innerText =
    percent.toFixed(0) + "% Completed";
}
