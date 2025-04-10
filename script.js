// Digital Clock Function
function digitalClock() {
    const now = new Date();
  
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    

    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();
    const dateString = `${day} / ${month} / ${year} `
  
    document.getElementById('time').textContent = timeString;
    document.getElementById('date').textContent = dateString;
  }
  
  digitalClock();
  setInterval(digitalClock, 1000);
  
  // Voice Recognition
  document.addEventListener("DOMContentLoaded", function () {
    const micButton = document.getElementById('mic-button');
    const voiceStatus = document.getElementById('voiceStatus');
    const searchInput = document.getElementById('searchInput'); // 👈 Make sure your input has this ID
  
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
  
      recognition.onstart = () => {
        voiceStatus.classList.add('show');
      };
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        console.log("Heard:", transcript);
  
        if (transcript) {
          searchInput.value = transcript; // 👈 Set transcript into the search bar
  
          // Optional: auto-submit or redirect
          window.location.href = `https://www.google.com/search?q=${encodeURIComponent(transcript)}`;
        }
      };
  
      recognition.onend = () => {
        voiceStatus.classList.remove('show');
      };
  
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        voiceStatus.classList.remove('show');
      };
  
      micButton.addEventListener("click", () => {
        recognition.start();
      });
    } else {
      console.log("Speech Recognition not supported in this browser.");
    }
  });
  