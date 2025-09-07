let botToken = "";

// Cek apakah token valid
async function checkToken() {
  botToken = document.getElementById("botToken").value.trim();
  const res = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
  const data = await res.json();

  if (data.ok) {
    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";
  } else {
    document.getElementById("status").innerText = "Token tidak valid!";
  }
}

// Update nama bot
async function setName() {
  const name = document.getElementById("botName").value;
  if (!name) return;
  await fetch(`https://api.telegram.org/bot${botToken}/setMyName?name=${encodeURIComponent(name)}`);
  alert("Nama bot diperbarui!");
}

// Update bio bot
async function setBio() {
  const bio = document.getElementById("botBio").value;
  if (!bio) return;
  await fetch(`https://api.telegram.org/bot${botToken}/setMyDescription?description=${encodeURIComponent(bio)}`);
  alert("Bio bot diperbarui!");
}

// Update foto bot
async function setPhoto() {
  const fileInput = document.getElementById("botPhoto");
  if (!fileInput.files.length) return;

  const formData = new FormData();
  formData.append("photo", fileInput.files[0]);

  await fetch(`https://api.telegram.org/bot${botToken}/setUserProfilePhotos`, {
    method: "POST",
    body: formData
  });
  alert("Foto bot diperbarui!");
}

// Kirim pesan
async function sendMessage() {
  const chatId = document.getElementById("chatId").value;
  const text = document.getElementById("messageText").value;
  let count = parseInt(document.getElementById("msgCount").value);

  if (!chatId || !text) {
    document.getElementById("msgStatus").innerText = "Isi Chat ID dan Pesan!";
    return;
  }

  if (count > 200) count = 200;

  for (let i = 0; i < count; i++) {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });
  }

  document.getElementById("msgStatus").innerText = `Pesan terkirim ${count}x ke ${chatId}`;
}
