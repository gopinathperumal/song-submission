import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfCayk980MnYa0SkpNrij7lJCmY5T-jYw",
  authDomain: "song-selection-52aff.firebaseapp.com",
  databaseURL: "https://song-selection-52aff-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "song-selection-52aff",
  storageBucket: "song-selection-52aff.firebasestorage.app",
  messagingSenderId: "907587762868",
  appId: "1:907587762868:web:681042b334a2a049aaf5e1"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Submission closes Feb 1, 2026
const SUBMISSION_END = new Date("2026-02-01T23:59:00");

window.submitSong = async () => {
  const group = document.getElementById("group").value.trim();
  const song = document.getElementById("song").value.trim();
  const msg = document.getElementById("msg");
  const btn = document.getElementById("btn");

  if (new Date() > SUBMISSION_END) {
    alert("Song submission is closed.");
    return;
  }

  if (!group || !song) {
    alert("Fill all fields");
    return;
  }

  btn.disabled = true;
  msg.innerText = "Submitting...";

  try {
    await push(ref(db, "submissions"), {
      group,
      song,
      submitted_at: serverTimestamp()
    });

    msg.innerText = "✅ Submitted successfully!";
    document.getElementById("group").value = "";
    document.getElementById("song").value = "";
  } catch (e) {
    console.error(e);
    msg.innerText = "❌ Error submitting";
  } finally {
    btn.disabled = false;
  }
};
