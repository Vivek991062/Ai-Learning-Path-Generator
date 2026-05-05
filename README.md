# PathAI — Intelligent Learning Path Generator

A full-featured AI-powered learning roadmap web app you can run locally.

---

## 🚀 Quick Setup

### 1. Get Your Anthropic API Key
- Go to https://console.anthropic.com
- Sign up / log in
- Navigate to **API Keys** → **Create Key**
- Copy the key (starts with `sk-ant-...`)

### 2. Add Your API Key
Open `js/dashboard.js` and replace on **line 2**:
```js
const ANTHROPIC_API_KEY = 'YOUR_API_KEY_HERE';
```
With your actual key:
```js
const ANTHROPIC_API_KEY = 'sk-ant-api03-...your-key...';
```

### 3. Run the App
You need a local web server (browsers block file:// for security).

**Option A — VS Code Live Server (Easiest)**
1. Install the "Live Server" extension in VS Code
2. Open the project folder in VS Code
3. Right-click `index.html` → **Open with Live Server**

**Option B — Python (built-in)**
```bash
cd ai-learning-path
python3 -m http.server 8080
# Then open http://localhost:8080
```

**Option C — Node.js**
```bash
npx serve .
```

---

## 📁 Project Structure

```
ai-learning-path/
├── index.html          # Login / Register page
├── dashboard.html      # Main app (dashboard, roadmap, progress)
├── css/
│   ├── auth.css        # Login page styles
│   └── dashboard.css   # App styles (dark/light theme)
├── js/
│   ├── auth.js         # Login/Register logic
│   └── dashboard.js    # All app logic + AI integration
└── README.md
```

---

## ✨ Features

- **Auth**: Register/login with email + password (stored in localStorage)
- **Dark/Light Theme**: Toggle button in top nav
- **4-Step Setup Wizard**:
  1. Choose your learning goal (10 presets + custom)
  2. Set your current skill level
  3. Add skills you already have
  4. Pick content type (Notes / Videos / Both)
- **AI Roadmap Generation**: Claude AI builds a 3-5 phase roadmap tailored to you
- **Content Links**:
  - 📖 Notes → W3Schools (topic-specific search)
  - 🎬 Videos → YouTube (topic-specific search)
- **Time Tracking**: Timer tracks how long you study each topic
- **Smart Completion**: Mark as Complete button activates after sufficient study time
- **Progress Tracking**: Visual progress bars per phase + overall stats
- **Persistent Data**: All data saved locally, survives page refresh

---

## 🔧 Customization

- Edit the goal cards in `dashboard.html` to add/remove learning goals
- Change `trackerState.goalMinutes` calculation in `dashboard.js` to adjust time requirements
- The `ANTHROPIC_API_KEY` variable is the only required configuration

---

## ⚠️ Notes

- API costs: Each roadmap generation uses ~1000-2000 tokens (~$0.003-0.006)
- Data is stored in your browser's localStorage (private, not sent anywhere)
- Roadmaps persist between sessions — use "New Roadmap" to generate fresh
