// Google Analytics (through Firebase) on every page, plus what a campaign needs:
// ad tags carried over to the workspace so sign-ups keep their source, and a
// click event on every link to the workspace or to us.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

const analytics = getAnalytics(initializeApp({
  apiKey: "AIzaSyBFtR8VVwOWFk2R0olHZd5aoNK0hfdFbaw",
  authDomain: "d0d-gcp-workspace.firebaseapp.com",
  projectId: "d0d-gcp-workspace",
  storageBucket: "d0d-gcp-workspace.firebasestorage.app",
  messagingSenderId: "692100161813",
  appId: "1:692100161813:web:0f77756ab7d8b34fe4491c",
  measurementId: "G-N7ZT2ZDNQ1"
}));

const tags = [...new URLSearchParams(location.search)].filter(([k]) => /^(utm_\w+|gclid|fbclid|li_fat_id|msclkid)$/.test(k));
for (const a of document.querySelectorAll('a[href^="https://workspace.d0d.ai"]')) {
  const url = new URL(a.href);
  for (const [k, v] of tags) url.searchParams.set(k, v);
  a.href = url;
}

document.addEventListener("click", e => {
  const a = e.target.closest("a");
  if (!a) return;
  const event = a.href.startsWith("https://workspace.d0d.ai") ? "workspace_click" : a.href.startsWith("mailto:") ? "contact_click" : null;
  if (event) logEvent(analytics, event, {link_text: a.textContent.trim().slice(0, 60), page: location.pathname});
});
