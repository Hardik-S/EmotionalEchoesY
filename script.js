// Check if user is logged in
function checkLogin() {
    const currentUser = localStorage.getItem('currentUser');
    const path = window.location.pathname;
    
    // Routing flow: Login -> Headspace -> Home
    if (path.includes('index.html') && currentUser) {
        window.location.href = 'headspace.html';
        return;
    }
    
    if (path.includes('headspace.html') && currentUser) {
        // If on headspace and logged in, set up navigation
        const echoes = document.getElementById('echoes-btn');
        if (echoes) {
            echoes.addEventListener('click', () => {
                window.location.href = 'home.html';
            });
        }
        return;
    }
    
    // Redirect to index if not logged in
    if ((path.includes('headspace.html') || path.includes('home.html')) && !currentUser) {
        window.location.href = 'index.html';
        return;
    }
}

// Index page functionality
function setupIndexPage() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeBtns = document.querySelectorAll('.close');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Open login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
        });
    }
    
    // Open signup modal
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            signupModal.classList.add('active');
        });
    }
    
    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.classList.remove('active');
            signupModal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === signupModal) {
            signupModal.classList.remove('active');
        }
    });
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Find user
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                // Set current user
                localStorage.setItem('currentUser', username);
                
                // Redirect to headspace page
                window.location.href = 'headspace.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }
    
    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Check if username already exists
            if (users.some(u => u.username === username)) {
                alert('Username already exists');
                return;
            }
            
            // Add new user
            users.push({ username, email, password });
            
            // Save users
            localStorage.setItem('users', JSON.stringify(users));
            
            // Set current user
            localStorage.setItem('currentUser', username);
            
            // Create empty mood entries array for user
            const userEntries = [];
            localStorage.setItem(`mood_entries_${username}`, JSON.stringify(userEntries));
            
            // Redirect to headspace page
            window.location.href = 'headspace.html';
        });
    }
}

// Dashboard page functionality
function setupDashboard() {
    const username = localStorage.getItem('currentUser');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabLinks = document.querySelectorAll('.tab-link');
    const moodSlider = document.getElementById('mood-slider');
    const moodValue = document.getElementById('mood-value');
    const emojiBtns = document.querySelectorAll('.emoji-btn');
    const moodForm = document.getElementById('mood-form');
    const moodEntries = document.getElementById('mood-entries');
    const emptyTimeline = document.getElementById('empty-timeline');
    const startTimer = document.getElementById('start-timer');
    const pauseTimer = document.getElementById('pause-timer');
    const resetTimer = document.getElementById('reset-timer');
    const timerDisplay = document.getElementById('timer-display');
    const breathingCircle = document.getElementById('breathing-circle');
    const breathingText = document.getElementById('breathing-text');
    const reminderElement = document.getElementById('reminder');
    const reminderCheck = document.getElementById('reminder-check');
    const reminderDismiss = document.getElementById('reminder-dismiss');
    const refreshInsights = document.getElementById('refresh-insights');
    
    // Set username display
    if (usernameDisplay) {
        usernameDisplay.textContent = username;
    }
    
    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
    
    // Tab navigation
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to selected tab
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Tab links
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');
            tabBtns.forEach(btn => {
                if (btn.getAttribute('data-tab') === tabId) {
                    btn.click();
                }
            });
        });
    });
    
    // Mood slider
    if (moodSlider) {
        moodSlider.addEventListener('input', () => {
            moodValue.textContent = `${moodSlider.value}/10`;
        });
    }
    
    // Emoji selection
    emojiBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove selected class from all emoji buttons
            emojiBtns.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            btn.classList.add('selected');
            
            // Set value for hidden input
            document.getElementById('selected-emoji').value = btn.getAttribute('data-emoji');
        });
    });
    
    // Handle mood form submission
    if (moodForm) {
        moodForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const moodLevel = moodSlider.value;
            const selectedEmoji = document.getElementById('selected-emoji').value;
            const moodNotes = document.getElementById('mood-notes').value;
            
            if (!selectedEmoji) {
                alert('Please select an emoji for your mood');
                return;
            }
            
            // Create mood entry
            const entry = {
                id: Date.now(),
                date: new Date().toISOString(),
                moodLevel,
                emoji: selectedEmoji,
                notes: moodNotes
            };
            
            // Get user's mood entries
            const entries = JSON.parse(localStorage.getItem(`mood_entries_${username}`)) || [];
            
            // Add new entry
            entries.unshift(entry);
            
            // Save entries
            localStorage.setItem(`mood_entries_${username}`, JSON.stringify(entries));
            
            // Reset form
            moodSlider.value = 5;
            moodValue.textContent = '5/10';
            emojiBtns.forEach(btn => btn.classList.remove('selected'));
            document.getElementById('selected-emoji').value = '';
            document.getElementById('mood-notes').value = '';
            
            // Switch to timeline tab
            tabBtns.forEach(btn => {
                if (btn.getAttribute('data-tab') === 'timeline') {
                    btn.click();
                }
            });
            
            // Update timeline
            updateTimeline();
            
            // Generate new insights
            generateInsights();
        });
    }
    
    // Update timeline with mood entries
    function updateTimeline() {
        if (!moodEntries) return;
        
        const entries = JSON.parse(localStorage.getItem(`mood_entries_${username}`)) || [];
        
        if (entries.length === 0) {
            moodEntries.innerHTML = '';
            emptyTimeline.style.display = 'block';
            return;
        }
        
        emptyTimeline.style.display = 'none';
        
        moodEntries.innerHTML = entries.map(entry => {
            const date = new Date(entry.date);
            const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
            
            return `
                <div class="timeline-entry">
                    <div class="timeline-header">
                        <span class="entry-date">${formattedDate}</span>
                        <span class="entry-emoji">${entry.emoji}</span>
                    </div>
                    <div class="entry-mood">
                        <span class="mood-level">Mood Level: ${entry.moodLevel}/10</span>
                    </div>
                    <div class="entry-notes">${entry.notes}</div>
                </div>
            `;
        }).join('');
    }
    
    // Meditation timer
    let timerInterval;
    let timerSeconds = 300; // 5 minutes
    let isRunning = false;
    
    if (startTimer) {
        startTimer.addEventListener('click', () => {
            if (!isRunning) {
                isRunning = true;
                startTimer.disabled = true;
                pauseTimer.disabled = false;
                resetTimer.disabled = false;
                
                timerInterval = setInterval(() => {
                    timerSeconds--;
                    
                    if (timerSeconds <= 0) {
                        clearInterval(timerInterval);
                        timerDisplay.textContent = "Done!";
                        isRunning = false;
                        startTimer.disabled = true;
                        pauseTimer.disabled = true;
                        resetTimer.disabled = false;
                        return;
                    }
                    
                    const minutes = Math.floor(timerSeconds / 60);
                    const seconds = timerSeconds % 60;
                    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                }, 1000);
                
                // Start breathing animation
                startBreathingAnimation();
            }
        });
    }
    
    if (pauseTimer) {
        pauseTimer.addEventListener('click', () => {
            if (isRunning) {
                clearInterval(timerInterval);
                isRunning = false;
                startTimer.disabled = false;
                pauseTimer.disabled = true;
                stopBreathingAnimation();
            }
        });
    }
    
    if (resetTimer) {
        resetTimer.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerSeconds = 300;
            timerDisplay.textContent = "5:00";
            isRunning = false;
            startTimer.disabled = false;
            pauseTimer.disabled = true;
            resetTimer.disabled = true;
            stopBreathingAnimation();
        });
    }
    
    // Breathing animation
    let breathingInterval;
    
    function startBreathingAnimation() {
        if (breathingCircle && breathingText) {
            breathingCircle.classList.add('inhale');
            breathingText.textContent = 'Breathe in...';
            
            breathingInterval = setInterval(() => {
                if (breathingCircle.classList.contains('inhale')) {
                    breathingCircle.classList.remove('inhale');
                    breathingCircle.classList.add('exhale');
                    breathingText.textContent = 'Breathe out...';
                } else {
                    breathingCircle.classList.remove('exhale');
                    breathingCircle.classList.add('inhale');
                    breathingText.textContent = 'Breathe in...';
                }
            }, 4000);
        }
    }
    
    function stopBreathingAnimation() {
        if (breathingInterval) {
            clearInterval(breathingInterval);
            
            if (breathingCircle && breathingText) {
                breathingCircle.classList.remove('inhale');
                breathingCircle.classList.remove('exhale');
                breathingText.textContent = 'Breathe in...';
            }
        }
    }
    
    // Generate insights
    function generateInsights() {
        const dailyInsight = document.getElementById('daily-insight-text');
        const patternInsight = document.getElementById('pattern-insight');
        const weeklyInsight = document.getElementById('weekly-insight');
        const growthInsight = document.getElementById('growth-insight');
        
        if (dailyInsight && patternInsight && weeklyInsight && growthInsight) {
            const entries = JSON.parse(localStorage.getItem(`mood_entries_${username}`)) || [];
            
            // Generate insights based on entries
            if (entries.length === 0) {
                dailyInsight.textContent = 'Add your first mood entry to get personalized insights.';
                patternInsight.textContent = 'No data available yet.';
                weeklyInsight.textContent = 'Log your moods regularly to see weekly patterns.';
                growthInsight.textContent = 'Start your journey by adding mood entries.';
                return;
            }
            
            // Calculate average mood
            const averageMood = entries.reduce((sum, entry) => sum + parseInt(entry.moodLevel), 0) / entries.length;
            
            // Get random insights from data.js
            dailyInsight.textContent = getDailyInsight(averageMood);
            patternInsight.textContent = getRandomInsight('patterns');
            weeklyInsight.textContent = getRandomInsight('weekly');
            growthInsight.textContent = getRandomInsight('growth');
        }
    }
    
    // Refresh insights button
    if (refreshInsights) {
        refreshInsights.addEventListener('click', generateInsights);
    }
    
    // Show timed reminder after 2 minutes
    setTimeout(() => {
        if (reminderElement) {
            reminderElement.classList.add('active');
        }
    }, 120000); // 2 minutes
    
    // Handle reminder buttons
    if (reminderCheck) {
        reminderCheck.addEventListener('click', () => {
            reminderElement.classList.remove('active');
            // Switch to mood check tab
                tabBtns.forEach(btn => {
                    if (btn.getAttribute('data-tab') === 'mood-check') {
                        btn.click();
                    }
                });
            });
        }
        
        if (reminderDismiss) {
            reminderDismiss.addEventListener('click', () => {
                reminderElement.classList.remove('active');
            });
        }
        
        // Populate meditation recommendations
        const meditationList = document.getElementById('meditation-list');
        if (meditationList) {
            const recommendations = getMeditationRecommendations();
            meditationList.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
        }
        
        // Initial setup
        updateTimeline();
        generateInsights();
    }
    
    // Initialize the page based on current location
    document.addEventListener('DOMContentLoaded', () => {
        checkLogin();
        
        if (window.location.pathname.includes('index.html') || 
            window.location.pathname.endsWith('/')) {
            setupIndexPage();
        }
    });