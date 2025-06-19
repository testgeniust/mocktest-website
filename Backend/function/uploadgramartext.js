// mocktest-website/backend/functions/upload-grammar-text.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * 📥 Endpoint: /uploadGrammarText
 * 📌 Admin uploads daily grammar test Hindi text
 */
exports.uploadGrammarText = functions.https.onRequest(async (req, res) => {
  const { date, hindiText } = req.body;

  if (!date || !hindiText) {
    return res.status(400).send("❌ Provide both date and Hindi text");
  }

  try {
    const docId = `grammar_${date}`;
    await db.collection("daily_grammar").doc(docId).set({
      date,
      hindiText,
      createdAt: new Date()
    });

    res.status(200).send("✅ Grammar Hindi text uploaded");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});