# Emotional Echoes

Emotional Echoes (EE) is a mindfulness and emotional well-being feature designed to integrate with the Headspace mobile app. By tracking mood entries over time, providing AI-driven insights, and offering guided meditations, Emotional Echoes empowers users to develop deeper self-awareness and resilience in their day-to-day lives.

---

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Key Features](#key-features)  
3. [Installation & Setup](#installation--setup)  
4. [Usage Instructions](#usage-instructions)  
5. [File Structure](#file-structure)  
6. [Integration with Headspace](#integration-with-headspace)  
7. [Technologies Used](#technologies-used)   
8. [Contributing](#contributing)  
9. [License](#license)

---

## Project Overview
Emotional Echoes was built to extend Headspace’s mindfulness offerings. The primary goal is to give users a simple and effective way to log their moods, reflect on their emotional patterns, and engage in guided meditations tailored to their current needs.

### Objectives
- **Track Moods**: Provide a quick and user-friendly way to record emotional states.  
- **Deliver AI Insights**: Surface patterns, correlations, and personalized recommendations.  
- **Enhance Mindfulness**: Offer guided meditations that align with the user’s emotional data.  
- **Improve Retention**: Encourage repeated engagement through notifications and streak tracking.

---

## Key Features
1. **Single-Click Mood Check**  
   - A slider (1–10) to rate how you feel, emoji selection, and note-taking.
2. **Timeline of Entries**  
   - Chronological list of all past moods with timestamps and personal notes.
3. **AI-Driven Insights**  
   - Automated analysis of your emotional patterns, weekly summaries, and growth suggestions.
4. **Guided Meditations**  
   - Curated sessions recommended based on mood data (e.g., stress, anxiety, or general mindfulness).
5. **Notifications & Reminders**  
   - Nudges to check in periodically or to explore new meditations.

---

## Installation & Setup
Follow these steps to run the Emotional Echoes webapp locally:

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/Emotional-Echoes.git
   ```
2. **Navigate to the Project Folder**  
   ```bash
   cd Emotional-Echoes
   ```
3. **Open `index.html` in Your Browser**  
   - You can also use a local server, for example with VS Code Live Server, or run `python -m http.server 8080`.

> **Note:** This project does not require a backend server in its current MVP form; all data is stored in `localStorage`.

---

## Usage Instructions
1. **Open `index.html`**  
   - This serves as the login/signup page.
2. **Sign Up or Log In**  
   - Create a new user account or use existing credentials (stored in `localStorage`).
3. **Home Dashboard**  
   - After logging in, you’ll be redirected to `home.html`, which includes:  
     - **Tabs**: What is EE?, Intelligent Insights, Mood Check, Timeline, Guided Meditation.
     - **User Info**: Displays your username and provides a logout option.
4. **Mood Check**  
   - Rate your current mood, select an emoji, and add notes.  
   - Click “Save Mood Entry” to store your data.
5. **View Timeline & Insights**  
   - Explore past mood entries in chronological order.  
   - Generate or refresh AI-driven insights (pattern detection, weekly summaries, growth tips).
6. **Guided Meditation**  
   - Launch recommended sessions, start a timer, or practice a breathing exercise.
7. **Notifications**  
   - A reminder popup will appear after a set period, prompting you to log another mood or dismiss.

---

## File Structure
```
.
├── index.html         // Login & signup page
├── home.html          // Main dashboard for Emotional Echoes
├── data.js            // Mock data & AI logic for insights
├── script.js          // Front-end logic (login, mood logging, timeline updates, etc.)
├── styles.css         // Global styling
├── README.md          // Project documentation
└── ...               // Additional files or assets
```

### Key Files
- **index.html**  
  Contains the login/signup modals and a welcome landing page.  
- **home.html**  
  The authenticated user dashboard with tabs for different features.  
- **data.js**  
  Provides arrays of insights and a randomization utility to simulate AI-driven data.  
- **script.js**  
  Core front-end logic including user authentication, localStorage interactions, mood logging, and more.  
- **styles.css**  
  Central stylesheet for consistent design across the webapp.

---

## Integration with Headspace
1. **Headspace Landing Page**  
   - The Headspace app’s main screen includes an “Echoes” button (replacing the original “Reflect”).
2. **Echoes Button**  
   - When tapped, this button navigates to `index.html` or `home.html` (depending on login state).
3. **Seamless User Experience**  
   - The Headspace mobile app retains its core functionality while offering the Emotional Echoes extension.

---

## Technologies Used
- **HTML5 / CSS3**: Structure and styling of the front-end.  
- **Vanilla JavaScript (ES6+)**: Client-side logic, including mood logging and AI insights.  
- **localStorage**: Basic data persistence without needing a server or database.  
- **Headspace Mobile App**: Integration point for launching the Emotional Echoes feature.

---
## Contributing
We welcome contributions to enhance Emotional Echoes. Feel free to:

1. **Fork the Repository**  
2. **Create a Feature Branch** (`git checkout -b feature/new-insight-module`)  
3. **Commit Your Changes**  
4. **Open a Pull Request** explaining your additions or modifications.

---

## License
This project is released under the [MIT License](LICENSE). You are free to use, modify, and distribute this code as long as the license terms are followed.

---

**Thank you for exploring Emotional Echoes!**  
For questions, suggestions, or feedback, please open an issue or contact me at hshrestha.hba2026@ivey.ca!
