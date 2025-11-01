// Typing Animation for name
const nameString = "Nitesh Kamat";
let idx = 0;
function typeWriter() {
  const typedName = document.getElementById('typed-name');
  if (idx < nameString.length) {
    typedName.textContent += nameString.charAt(idx);
    idx++;
    setTimeout(typeWriter, 120);
  }
}
window.onload = function() {
  typeWriter();
  closeChatbot();
};

// Email Copy-to-Clipboard
function copyEmail() {
  const emailText = document.getElementById("email").textContent;
  navigator.clipboard.writeText(emailText);
  alert("Copied: " + emailText);
}

// Chatbot logic
let chatHistory = [];

const botKnowledge = {
  background: "Nitesh Kamat is a full stack developer from Biratnagar, Nepal, born in 2002. Specializes in AI and web development.",
  skills: "React, JavaScript, Python, Node.js, TensorFlow, PyTorch, OpenAI APIs, LangChain, MongoDB, Docker, Git.",
  experience: "Building intelligent web apps, AI chatbots, dashboards, and ML models.",
  education: "Computer Science background focused on AI & software engineering.",
  projects: [
    "AI Chatbot Platform: Conversational AI system with NLP.",
    "E-Commerce Dashboard: Analytics, inventory, and visualization.",
    "Machine Learning Model: Predictive analytics using Python.",
    "Portfolio Generator: AI-powered automatic portfolio creator."
  ],
  contact: "Email: nitesh0434@gmail.com. Location: Biratnagar, Nepal."
};

function openChatbot() {
  document.getElementById("chatbot-window").style.display = "flex";
  addBotMessage("Hi! I'm your AI assistant. Ask me anything about Nitesh's work, skills, or experience!");
}
function closeChatbot() {
  document.getElementById("chatbot-window").style.display = "none";
}

function chatbotKeydown(event) {
  if (event.key === "Enter") sendChatbotMessage();
}
function sendChatbotMessage() {
  const inputBox = document.getElementById("chatbot-input");
  const userMsg = inputBox.value.trim();
  if (!userMsg) return;
  addUserMessage(userMsg);
  inputBox.value = "";
  setTimeout(() => botRespond(userMsg), 800);
}

function addUserMessage(msg) {
  chatHistory.push({ type: "user", text: msg, time: getTime() });
  displayChatHistory();
}
function addBotMessage(msg) {
  chatHistory.push({ type: "bot", text: msg, time: getTime() });
  displayChatHistory();
}
function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function displayChatHistory() {
  const msgDiv = document.getElementById("chatbot-messages");
  msgDiv.innerHTML = "";
  chatHistory.forEach(msg => {
    const bubble = document.createElement("div");
    bubble.className = "chatbot-message " + (msg.type === "bot" ? "message-bot" : "message-user");
    bubble.innerHTML = msg.text + `<div class="chatbot-timestamp">${msg.time}</div>`;
    msgDiv.appendChild(bubble);
  });
  msgDiv.scrollTop = msgDiv.scrollHeight;
}

// Basic Bot Response Logic
function botRespond(userMsg) {
  let reply =
    userMsg.match(/name|who/i)
      ? "My name is Nitesh Kamat, a full-stack developer and AI enthusiast from Biratnagar, Nepal."
    : userMsg.match(/skill|technology|proficient/i)
      ? "I'm skilled in " + botKnowledge.skills
    : userMsg.match(/project|work|portfolio/i)
      ? "Here are some projects: <br>" + botKnowledge.projects.join("<br>")
    : userMsg.match(/experience|background|education/i)
      ? botKnowledge.background + "<br>" + botKnowledge.education
    : userMsg.match(/contact|email|locat/i)
      ? botKnowledge.contact
    : "That's an interesting question! You can ask me about Nitesh's skills, projects, experience, or how to contact him.";
  addBotMessage(reply);
}

