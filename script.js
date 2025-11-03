
// Typing animation
const nameElement = document.querySelector('.name');
const name = 'Nitesh Kamat';
let charIndex = 0;

function typeText() {
    if (charIndex < name.length) {
        nameElement.textContent += name.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    }
}

// Start typing animation after page load
window.addEventListener('load', () => {
    setTimeout(typeText, 500);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
});

// Chatbot functionality
const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');
const minimizeChat = document.getElementById('minimizeChat');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

// Chat state
let chatHistory = [];
let isTyping = false;

// Toggle chat window
chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active') && chatHistory.length === 0) {
        sendBotMessage("Hi! I'm an AI assistant. Ask me anything about my work, skills, or experience! 👋", true);
    }
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

minimizeChat.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

// Send message
function sendMessage() {
    const message = chatInput.value.trim();
    if (message && !isTyping) {
        addMessage(message, 'user');
        chatInput.value = '';
        processUserMessage(message);
    }
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;

    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);

    chatHistory.push({ text, sender, time: new Date() });

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTyping() {
    isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot';
    typingDiv.id = 'typing-indicator';

    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

    typingDiv.appendChild(indicator);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide typing indicator
function hideTyping() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
    isTyping = false;
}

// Send bot message with delay
function sendBotMessage(message, withSuggestions = false) {
    showTyping();

    setTimeout(() => {
        hideTyping();
        addMessage(message, 'bot');

        if (withSuggestions) {
            addSuggestedQuestions();
        }
    }, 1000 + Math.random() * 1000);
}

// Add suggested questions
function addSuggestedQuestions() {
    const questions = [
        "What are your skills?",
        "Tell me about your projects",
        "What's your experience?",
        "How can I contact you?"
    ];

    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'chat-message bot';

    const container = document.createElement('div');
    container.className = 'suggested-questions';

    questions.forEach(q => {
        const btn = document.createElement('button');
        btn.className = 'suggested-question';
        btn.textContent = q;
        btn.addEventListener('click', () => {
            chatInput.value = q;
            sendMessage();
        });
        container.appendChild(btn);
    });

    suggestionsDiv.appendChild(container);
    chatMessages.appendChild(suggestionsDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Process user message and generate response
function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    let response = '';

    // Greetings
    if (lowerMessage.match(/\b(hi|hello|hey|greetings)\b/)) {
        response = "Hello! 👋 I'm here to help you learn more about my background, skills, and projects. What would you like to know?";
    }
    // Skills
    else if (lowerMessage.match(/\b(skill|skills|technology|technologies|tech stack)\b/)) {
        response = "I have expertise in:\n\n🎨 Frontend: React, JavaScript, HTML/CSS, Tailwind CSS\n⚙️ Backend: Node.js, Python, Express, FastAPI\n🤖 AI/ML: TensorFlow, PyTorch, OpenAI APIs, LangChain\n🛠️ Tools: Git, Docker, MongoDB, PostgreSQL\n\nI specialize in building full-stack web applications with AI integration!";
    }
    // Projects
    else if (lowerMessage.match(/\b(project|projects|portfolio|work)\b/)) {
        response = "I've worked on several exciting projects:\n\n🤖 AI Chatbot Platform - Built with Python, OpenAI, React, and FastAPI\n🛒 E-Commerce Dashboard - Using React, Node.js, and MongoDB\n📊 Machine Learning Model - Predictive analytics with TensorFlow\n✨ Portfolio Generator - AI-powered portfolio creation tool\n\nEach project showcases my passion for combining modern web development with AI capabilities!";
    }
    // Experience
    else if (lowerMessage.match(/\b(experience|background|about|bio)\b/)) {
        response = "I'm a full-stack developer born in 2002, based in Biratnagar, Nepal. I specialize in creating intelligent web applications with AI integration. My journey combines a strong foundation in both frontend and backend technologies with a passion for machine learning and AI solutions. I love building user-centric applications that make a real impact!";
    }
    // Education
    else if (lowerMessage.match(/\b(education|study|degree|university|college)\b/)) {
        response = "I have a Computer Science background with a focus on AI and software engineering. My education has given me a solid foundation in algorithms, data structures, and modern development practices, which I apply to every project I work on.";
    }
    // Contact
    else if (lowerMessage.match(/\b(contact|email|reach|hire|available)\b/)) {
        response = "I'd love to connect with you! 📧\n\nYou can reach me at: your.email@example.com\n📍 Location: Biratnagar, Nepal\n\nI'm open to freelance projects and full-time opportunities. Feel free to use the contact form on this page or connect with me on GitHub, LinkedIn, or Twitter!";
    }
    // AI/ML specific
    else if (lowerMessage.match(/\b(ai|artificial intelligence|machine learning|ml|openai)\b/)) {
        response = "AI and Machine Learning are my passion! 🤖\n\nI work with technologies like TensorFlow, PyTorch, OpenAI APIs, and LangChain to build intelligent applications. I've created conversational AI systems, predictive analytics models, and AI-powered tools. I believe AI has the potential to transform how we interact with technology and solve complex problems.";
    }
    // Location
    else if (lowerMessage.match(/\b(where|location|from|nepal|biratnagar)\b/)) {
        response = "I'm from Biratnagar, Nepal 🇳🇵 - a vibrant city with a growing tech community. Born in 2002, I've been passionate about technology from a young age and am proud to contribute to the global tech ecosystem from here!";
    }
    // Age
    else if (lowerMessage.match(/\b(age|old|born|birth)\b/)) {
        response = "I was born in 2002, which makes me 23 years old. Despite my young age, I've gained significant experience in web development and AI integration through various projects and continuous learning!";
    }
    // Thanks
    else if (lowerMessage.match(/\b(thanks|thank you|appreciate)\b/)) {
        response = "You're very welcome! 😊 Feel free to ask me anything else about my work, skills, or experience. I'm here to help!";
    }
    // Default response
    else {
        response = "That's an interesting question! While I don't have specific information about that, I'd be happy to tell you about:\n\n• My skills and technologies\n• Projects I've worked on\n• My experience and background\n• How to get in touch\n\nWhat would you like to know more about?";
    }

    sendBotMessage(response);
}


