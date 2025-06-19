// mocktest-website/backend/functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// 🎯 Upload Mock Test
exports.uploadMockTest = functions.https.onRequest(async (req, res) => {
  const { subject, paper, questions } = req.body;
  try {
    await db.collection("mocktests").add({
      subject,
      paper,
      questions,
      timestamp: new Date()
    });
    res.status(200).send("✅ Mock test uploaded");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});

// 📚 Upload Editorial
exports.uploadEditorial = functions.https.onRequest(async (req, res) => {
  const { title, content } = req.body;
  try {
    await db.collection("editorials").add({
      title,
      content,
      timestamp: new Date()
    });
    res.status(200).send("✅ Editorial uploaded");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});

// 📘 Upload Vocabulary
exports.uploadVocab = functions.https.onRequest(async (req, res) => {
  const { word, meaning, example } = req.body;
  try {
    await db.collection("vocabulary").add({
      word,
      meaning,
      example,
      timestamp: new Date()
    });
    res.status(200).send("✅ Vocabulary added");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});