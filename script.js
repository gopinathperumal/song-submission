import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 🔒 Submission closes Feb 1, 2026 at 23:59
const SUBMISSION_END = new Date("2026-02-01T23:59:00");

// 🔥 Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfCayk980MnYa0SkpNrij7lJCmY5T-jYw",
  authDomain: "song-selection-52aff.firebaseapp.com",
  databaseURL: "https://song-selection-52aff-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "song-selection-52aff",
  storageBucket: "song-selection-52aff.firebasestorage.app",
  messagingSenderId: "907587762868",
  appId: "1:907587762868:web:681042b334a2a049aaf5e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🚀 Submit handler
async function submitSong() {
  const group = document.getElementById("group").value.trim();
  const msg = document.getElementById("msg");
  const btn = document.getElementById("btn");
  const songInputs = document.querySelectorAll(".song");

  const songs = [];
  songInputs.forEach(input => {
    if (input.value.trim()) {
      songs.push(input.value.trim());
    }
  });

  if (new Date() > SUBMISSION_END) {
    alert("Song submission is closed.");
    return;
  }

  if (!group) {
    alert("Please enter Group Name");
    return;
  }

  if (songs.length === 0) {
    alert("Please enter at least one song");
    return;
  }

  btn.disabled = true;
  msg.innerText = "Submitting...";

  try {
    await push(ref(db, "submissions"), {
      group: group,
      songs: songs,                 // max 10
      submitted_at: serverTimestamp()
    });

    msg.innerText = "✅ Submitted successfully!";
    document.getElementById("group").value = "";
    songInputs.forEach(i => (i.value = ""));
  } catch (err) {
    console.error(err);
    msg.innerText = "❌ Error submitting. Try again.";
  } finally {
    btn.disabled = false;
  }
}

// 🔗 Attach button listener AFTER DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn").addEventListener("click", submitSong);
});
