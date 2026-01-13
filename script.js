// 🔒 Submission closes Feb 1, 2026
const SUBMISSION_END = new Date("2026-02-01T23:59:00");

// 🔥 Firebase config
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
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 🚀 Submit function (GLOBAL – button can see it)
function submitSong() {
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

  db.ref("submissions").push({
    group: group,
    songs: songs,
    submitted_at: firebase.database.ServerValue.TIMESTAMP
  }).then(() => {
    msg.innerText = "✅ Submitted successfully!";
    document.getElementById("group").value = "";
    songInputs.forEach(i => i.value = "");
    btn.disabled = false;
  }).catch(err => {
    console.error(err);
    msg.innerText = "❌ Error submitting";
    btn.disabled = false;
  });
}
