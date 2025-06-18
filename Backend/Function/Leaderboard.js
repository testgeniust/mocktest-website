// mocktest-website/backend/functions/leaderboard.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * 📤 Endpoint: /getLeaderboard
 * 🔎 Query top scorers from "mocktest_results" collection
 * 📌 Sort by score (desc), limit to top 10
 */
exports.getLeaderboard = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("mocktest_results")
      .orderBy("score", "desc")
      .limit(10)
      .get();

    const leaderboard = [];
    snapshot.forEach(doc => {
      leaderboard.push(doc.data());
    });

    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});