const typewriter = document.getElementById('typewriter');
const words = text.split(' ');
let index = 0;

function type() {
  if (index < words.length) {
    typewriter.innerHTML = words.slice(0, index + 1).join(' ') + '<span class="blinking-cursor">|</span>';
    index++;
    setTimeout(type, Math.random() * 150 + 50);
  } else {
    typewriter.innerHTML = words.join(' ') + '<span class="blinking-cursor">|</span>';
  }
}

// start typing
type(text);

const text = "This is a ChatGPT-like typing effect, simulating human typing with random delays and a blinking cursor. It also supports multiline text and ensures the cursor is displayed at the end of the last output character."