let botToken = "";

// ✅ Connect Bot
async function connectBot() {
  botToken = document.getElementById("botToken").value.trim();
  const status = document.getElementById("botStatus");

  if (!botToken) {
    status.textContent = "❌ Token tidak boleh kosong!";
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const data = await res.json();

    if (data.ok) {
      document.getElementById("botName").textContent = data.result.first_name || "-";
      document.getElementById("botUsername").textContent = data.result.username || "-";
      const link = `https://t.me/${data.result.username}`;
      document.getElementById("botLink").textContent = link;
      document.getElementById("botLink").href = link;

      status.textContent = "✅ Bot berhasil terkoneksi!";
      document.getElementById("botInfo").classList.remove("hidden");
      document.getElementById("messageSection").classList.remove("hidden");
      document.getElementById("zalgoSection").classList.remove("hidden");
    } else {
      status.textContent = "❌ Token salah atau bot tidak valid.";
    }
  } catch (err) {
    status.textContent = "❌ Gagal menghubungkan bot.";
  }
}

// ✅ Kirim Pesan
async function sendMessage() {
  const chatId = document.getElementById("chatId").value.trim();
  const message = document.getElementById("messageText").value;
  const count = Math.min(350, parseInt(document.getElementById("messageCount").value) || 1);
  const status = document.getElementById("sendStatus");

  if (!chatId || !message) {
    status.textContent = "❌ Chat ID dan Pesan harus diisi!";
    return;
  }

  try {
    for (let i = 0; i < count; i++) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
      });
    }
    status.textContent = `✅ Pesan terkirim (${count}x)`;
  } catch (err) {
    status.textContent = "❌ Gagal mengirim pesan.";
  }
}

// --------------------
// ⚡ ZALGO GENERATOR
// --------------------
const zalgo_up = ["̍","̎","̄","̅","̿","̑","̆","̐","͒","͗","͑","̇","̈","̊","͂","̓","̈","͊","͋","͌","̃","̂","̌","͐","̀","́","̋","̏","̒","̓","̔","̽","̉","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ","ͫ","ͬ","ͭ","ͮ","ͯ","̾","͛","͆","̚"];
const zalgo_down = ["̖","̗","̘","̙","̜","̝","̞","̟","̠","̤","̥","̦","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̹","̺","̻","̼","ͅ","͇","͈","͉","͍","͎","͓","͔","͕","͖","͙","͚","̣"];
const zalgo_mid = ["̕","̛","̀","́","͘","̡","̢","̧","̨","̴","̵","̶","͜","͝","͞","͟","͠","͢","̸","̷","͡"," ҉"];

function rand(max){ return Math.floor(Math.random() * max); }

function zalgo(text){
  let result = "";
  for (let ch of text) {
    result += ch;
    let num_up = rand(5), num_mid = rand(3), num_down = rand(5);
    for (let i=0; i<num_up; i++) result += zalgo_up[rand(zalgo_up.length)];
    for (let i=0; i<num_mid; i++) result += zalgo_mid[rand(zalgo_mid.length)];
    for (let i=0; i<num_down; i++) result += zalgo_down[rand(zalgo_down.length)];
  }
  return result;
}

function generateZalgo() {
  const input = document.getElementById("zalgoInput").value;
  document.getElementById("zalgoOutput").value = zalgo(input || "HELLO WORLD");
        }
