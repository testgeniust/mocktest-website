// mocktest-website/backend/functions/upload-vocab.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * 📥 Endpoint: /uploadVocabulary
 * 📌 Admin uploads daily vocabulary (word, meaning, example) for a given date
 */
exports.uploadVocabulary = functions.https.onRequest(async (req, res) => {
  const { date, words } = req.body;

  if (!date || !Array.isArray(words) || words.length === 0) {
    return res.status(400).send("❌ Provide a date and at least one word");
  }

  try {
    const vocabRef = db.collection("vocabulary").doc(`vocab_${date}`);
    await vocabRef.set({
      date,
      words,
      createdAt: new Date()
    });

    res.status(200).send("✅ Vocabulary uploaded successfully");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});
