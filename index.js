// List of the most common English words (300 words)
const commonWords = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there",
    "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time",
    "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than",
    "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first",
    "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us", "become", "here", "through", "still",
    "try", "last", "need", "too", "ask", "goes", "have", "good", "long", "now", "under", "name", "great", "before", "between", "where",
    "own", "down", "should", "life", "child", "might", "too", "say", "great", "big", "see", "us", "old", "state", "last", "never", "while",
    "even", "near", "left", "hard", "half", "never", "right", "live", "just", "ask", "move", "left", "means", "try", "below", "under",
    "help", "love", "work", "much", "again", "always", "young", "anything", "door", "quick", "add", "next", "however", "only", "there",
    "they", "another", "pretty", "was", "says", "matter", "alone", "out", "walk", "way", "last", "clear", "we", "believe", "put", "yes",
    "down", "would", "present", "important", "question", "good", "study", "bad", "school", "everything", "piece", "somewhere", "nature",
    "understand", "question", "matter", "each", "both", "ahead", "wherever", "mountain", "care", "staring", "silent", "opportunity",
    "bad", "people", "place", "fight", "you", "matter", "task", "bring", "date", "collect", "far", "sure", "danger", "become", "people",
    "even", "call", "different", "start", "protect", "found", "name", "within", "amazing", "fighting", "outside", "incredible", "as",
    "stop", "worth", "far", "living", "forget", "learn", "man", "book", "training", "reach", "effort", "together", "whatever", "beautiful",
    "lively", "hello", "freedom", "sad", "heart", "write", "path", "taking", "finally", "tool", "move", "potential", "need", "complex",
    "peace", "future", "near", "gather", "advice", "beautiful", "meaning", "blue", "remain", "track", "consider", "change", "busy",
    "loved", "none", "whatsoever", "leading", "plan", "easily", "actions", "deep", "together", "freedom", "clarify", "work", "common",
    "inside", "definitely", "year", "especially", "secure", "effort", "put", "group", "tools", "rather", "book", "enough", "person",
    "circle", "stay", "nothing", "ideas", "time", "needs", "happen", "plan", "second", "matter", "detailed", "real", "end", "moment",
    "incredible", "live", "shape", "shape", "again", "finally", "reality", "sad", "false", "life", "amount", "many", "future", "based",
    "extremely", "succeed", "unexpected", "found", "stand", "through", "still", "as", "brief", "too", "desire", "world", "belief",
    "endless", "become", "making", "creative", "here", "proper", "analysis", "impact", "actual", "wherever", "fail", "plan", "grow",
    "decide", "push", "beyond", "finish", "there", "aware", "power", "better", "unhappy", "alive", "observe", "take", "ahead", "dream"
];

let testWords = [];
let startTime;
let mistakes = [];

// Start the typing test
function startTest() {
    const testType = document.getElementById("test-type").value;
    if (testType === "random") {
        testWords = generateRandomWords(20); // Change the number of words as needed
    } else if (testType === "common") {
        testWords = getRandomCommonWords(20); // 20 random words from the common list
    }

    document.getElementById("settings").classList.add("hidden");
    document.getElementById("test-area").classList.remove("hidden");

    document.getElementById("words").textContent = testWords.join(" ");
    document.getElementById("input-field").value = "";
    document.getElementById("input-field").focus();

    startTime = new Date().getTime();
}

// Generate random words from a list (including common ones)
function generateRandomWords(num) {
    const words = [];
    const allWords = [...commonWords, "hello", "world", "typing", "speed", "test", "practice", "keyboard", "programming", "developer"];
    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * allWords.length);
        words.push(allWords[randomIndex]);
    }
    return words;
}

// Get random words from the common words list
function getRandomCommonWords(num) {
    const words = [];
    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * commonWords.length);
        words.push(commonWords[randomIndex]);
    }
    return words;
}

// Check the user's input
function checkInput() {
    const inputField = document.getElementById("input-field");
    const inputText = inputField.value.trim();

    // Check if the user has typed the entire text
    if (inputText === testWords.join(" ") || inputText.length > 0) {
        endTest();
    }
}

// End the typing test
function endTest() {
    const timeTaken = (new Date().getTime() - startTime) / 1000;
    const wordsTyped = testWords.length;
    const wpm = Math.round((wordsTyped / timeTaken) * 60); // Words per minute
    const accuracy = calculateAccuracy();

    // Show results
    document.getElementById("wpm").textContent = `Words Per Minute: ${wpm}`;
    document.getElementById("accuracy").textContent = `Accuracy: ${accuracy}%`;

    // Show mistakes if any
    if (mistakes.length > 0) {
        let mistakeText = `Mistakes: ${mistakes.join(", ")}`;
        document.getElementById("accuracy").textContent += ` - ${mistakeText}`;
    }

    document.getElementById("results").classList.remove("hidden");
}

// Calculate accuracy
function calculateAccuracy() {
    const typedWords = document.getElementById("input-field").value.split(" ");
    let correctCount = 0;
    typedWords.forEach((word, index) => {
        if (word === testWords[index]) {
            correctCount++;
        } else {
            mistakes.push(word); // Track mistakes
        }
    });

    const accuracy = (correctCount / testWords.length) * 100;
    return accuracy.toFixed(2);
}

// Reset the test
function resetTest() {
    document.getElementById("settings").classList.remove("hidden");
    document.getElementById("test-area").classList.add("hidden");
    document.getElementById("results").classList.add("hidden");
    mistakeText = "Mistakes:"
}
