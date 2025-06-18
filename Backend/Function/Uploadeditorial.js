// mocktest-website/backend/functions/upload-editorial.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * 📥 Endpoint: /uploadEditorial
 * 📌 Admin uploads editorial text (title, content, date)
 */
exports.uploadEditorial = functions.https.onRequest(async (req, res) => {
  const { title, content, date } = req.body;

  if (!title || !content || !date) {
    return res.status(400).send("❌ Please provide title, content, and date");
  }

  try {
    const docId = `editorial_${date}`;
    await db.collection("editorials").doc(docId).set({
      title,
      content,
      date,
      createdAt: new Date()
    });

    res.status(200).send("✅ Editorial uploaded successfully");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});