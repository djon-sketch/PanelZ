let token = "";

async function checkToken() {
  token = document.getElementById("botToken").value.trim();
  if (!token) {
    document.getElementById("status").innerText = "❌ Token kosong!";
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    const data = await res.json();

    if (data.ok) {
      // tampilkan dashboard
      document.getElementById("login").style.display = "none";
      document.getElementById("panel").style.display = "block";

      // isi status bot
      document.getElementById("statusName").innerText = data.result.first_name || "-";
      document.getElementById("statusUsername").innerText = data.result.username || "-";
      document.getElementById("statusLink").innerText = `https://t.me/${data.result.username}`;
      document.getElementById("statusLink").href = `https://t.me/${data.result.username}`;
    } else {
      document.getElementById("status").innerText = "❌ Token tidak valid!";
    }
  } catch (e) {
    document.getElementById("status").innerText = "⚠️ Gagal koneksi ke Telegram API.";
  }
}

// Update nama bot
async function setName() {
  const name = document.getElementById("botName").value;
  if (!name) return alert("Isi nama baru dulu");
  await fetch(`https://api.telegram.org/bot${token}/setMyName`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name})
  });
  alert("✅ Nama bot diperbarui!");
}

// Update bio bot
async function setBio() {
  const bio = document.getElementById("botBio").value;
  if (!bio) return alert("Isi bio baru dulu");
  await fetch(`https://api.telegram.org/bot${token}/setMyDescription`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({description: bio})
  });
  alert("✅ Bio bot diperbarui!");
}

// Kirim pesan
async function sendMessage() {
  const chatId = document.getElementById("chatId").value;
  const msg = document.getElementById("messageText").value;
  let count = parseInt(document.getElementById("msgCount").value);

  if (!chatId || !msg) {
    document.getElementById("msgStatus").innerText = "❌ Chat ID & pesan wajib diisi!";
    return;
  }
  if (!count || count < 1) count = 1;
  if (count > 200) count = 200;

  for (let i = 0; i < count; i++) {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({chat_id: chatId, text: msg})
    });
  }

  document.getElementById("msgStatus").innerText = `✅ Pesan terkirim (${count}x)`;
    }
