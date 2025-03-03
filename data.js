// Mock data for Emotional Echoes

// Daily insights based on mood level
const dailyInsights = {
    low: [
        "It's okay to have down days. Try to engage in a small self-care activity today.",
        "Your emotions are valid. Consider journaling about what might be affecting your mood.",
        "Today might be challenging, but remember that difficult feelings pass with time.",
        "Lower moods can be opportunities for reflection. What might your emotions be telling you?",
        "You've navigated difficult days before, and you have the strength to do so again."
    ],
    medium: [
        "You seem to be in a balanced state today. This is a good time for productive tasks.",
        "Maintaining emotional equilibrium is a skill you're practicing. Well done!",
        "Your steady mood creates space for clarity and focus. What would you like to accomplish?",
        "Neither too high nor too low - this balanced state is great for decision-making.",
        "Today's emotional stability can be a foundation for addressing any challenges ahead."
    ],
    high: [
        "Your positive mood can be channeled into creative endeavors today.",
        "This elevated emotional state is perfect for connecting with others and strengthening relationships.",
        "Harness this positive energy to tackle something you've been putting off.",
        "Your uplifted mood can be contagious - consider ways to spread positivity to others.",
        "Moments of joy are worth savoring. Take time to appreciate what's working well in your life."
    ]
};

// Pattern insights
const patternInsights = [
    "Your mood tends to improve as the day progresses. Morning self-care might enhance your start.",
    "There appears to be a correlation between your mood and time spent outdoors.",
    "Your emotional patterns suggest you respond well to social interaction.",
    "We've noticed your mood often dips midweek. Building in small rewards could help.",
    "Your weekends show consistently higher mood ratings. Consider what elements you might incorporate into weekdays.",
    "There's a pattern of mood improvement after you express your feelings in the notes section.",
    "Your emotional trends suggest you're building resilience over time.",
    "We've detected a cyclical pattern in your mood data that might align with sleep or activity levels."
];

// Weekly insights
const weeklyInsights = [
    "This week showed more emotional stability than last week. You're developing consistency.",
    "Your average mood this week was higher than last week. What positive changes have you made?",
    "This week's entries reflect more emotional awareness in your notes compared to previous weeks.",
    "You logged more consistently this week - regular check-ins enhance self-awareness.",
    "This week's mood variance was lower, suggesting more emotional stability.",
    "Your emotional range this week indicates healthy engagement with your feelings.",
    "This week's entries show a positive trend toward the weekend - something to look forward to.",
    "Your weekly pattern suggests mornings might be an opportunity for mood-enhancing routines."
];

// Growth insights
const growthInsights = [
    "You're becoming more specific in describing your emotions - a sign of growing emotional intelligence.",
    "Your notes demonstrate increased self-compassion compared to earlier entries.",
    "We notice you're identifying triggers more clearly, which is key to emotional management.",
    "Your recent entries show more nuanced emotional awareness than when you started.",
    "You're developing a pattern of bouncing back more quickly from lower moods.",
    "Your emotional vocabulary is expanding, allowing for more precise self-understanding.",
    "You're showing progress in accepting difficult emotions without judgment.",
    "Your growing consistency in logging reveals commitment to your emotional well-being."
];

// Meditation recommendations
const meditationRecommendations = [
    "5-Minute Breathing Awareness for Stress Reduction",
    "Body Scan Meditation for Physical Tension",
    "Loving-Kindness Practice for Emotional Balance",
    "Mindful Walking for Mental Clarity",
    "Gratitude Meditation for Mood Enhancement",
    "Self-Compassion Practice for Difficult Emotions",
    "Mindful Observation for Present Moment Awareness",
    "Progressive Relaxation for Better Sleep",
    "Focused Attention Practice for Improved Concentration",
    "Emotion-Focused Meditation for Processing Feelings"
];

// Get a random daily insight based on mood level
function getDailyInsight(moodLevel) {
    let category;
    
    if (moodLevel <= 4) {
        category = 'low';
    } else if (moodLevel <= 7) {
        category = 'medium';
    } else {
        category = 'high';
    }
    
    const insights = dailyInsights[category];
    const randomIndex = Math.floor(Math.random() * insights.length);
    
    return insights[randomIndex];
}

// Get a random insight from the specified category
function getRandomInsight(category) {
    let insights;
    
    switch(category) {
        case 'patterns':
            insights = patternInsights;
            break;
        case 'weekly':
            insights = weeklyInsights;
            break;
        case 'growth':
            insights = growthInsights;
            break;
        default:
            insights = patternInsights;
    }
    
    const randomIndex = Math.floor(Math.random() * insights.length);
    return insights[randomIndex];
}

// Get meditation recommendations
function getMeditationRecommendations() {
    // Shuffle array and take first 5
    return meditationRecommendations
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
}