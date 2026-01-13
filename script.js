// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCfCayk980MnYa0SkpNrij7lJCmY5T-jYw",
  authDomain: "song-selection-52aff.firebaseapp.com",
  databaseURL: "https://song-selection-52aff-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "song-selection-52aff",
  storageBucket: "song-selection-52aff.firebasestorage.app",
  messagingSenderId: "907587762868",
  appId: "1:907587762868:web:681042b334a2a049aaf5e1"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Submission close date
const SUBMISSION_END = new Date("2026-02-01T23:59:00");

document.getElementById("submitBtn").addEventListener("click", () => {
  const group = document.getElementById("group").value.trim();
  const msg = document.getElementById("msg");

  const songInputs = document.querySelectorAll(".song");
  const songs = [];

  songInputs.forEach(input => {
    if (input.value.trim()) {
      songs.push(input.value.trim());
    }
  });

  if (!group) {
    alert("Please enter Group Name");
    return;
  }

  if (songs.length === 0) {
    alert("Please enter at least one song");
    return;
  }

  if (new Date() > SUBMISSION_END) {
    alert("Submissions are closed");
    return;
  }

  msg.innerText = "Submitting...";

  db.ref("submissions").push({
    group: group,
    songs: songs,
    submitted_at: firebase.database.ServerValue.TIMESTAMP
  }).then(() => {
    msg.innerText = "✅ Submitted successfully!";
    document.getElementById("group").value = "";
    songInputs.forEach(i => i.value = "");
  }).catch(err => {
    console.error(err);
    msg.innerText = "❌ Error submitting";
  });
});
