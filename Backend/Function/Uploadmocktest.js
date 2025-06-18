// mocktest-website/backend/functions/upload-mocktest.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * 📥 Endpoint: /uploadMockTest
 * 🛡️ Admin uploads a mock test (subject, paper, questions[])
 * 📌 Each question includes questionText, options, correct, explanation
 */
exports.uploadMockTest = functions.https.onRequest(async (req, res) => {
  const { adminId, subject, paper, questions } = req.body;

  if (!adminId || !subject || !paper || !Array.isArray(questions)) {
    return res.status(400).send("❌ Incomplete data");
  }

  try {
    const batch = db.batch();
    const testRef = db.collection("mock_tests").doc();

    batch.set(testRef, {
      adminId,
      subject,
      paper,
      createdAt: new Date(),
    });

    const questionsRef = testRef.collection("questions");
    questions.forEach((q, index) => {
      const qRef = questionsRef.doc(); // Unique ID for each question
      batch.set(qRef, {
        qno: index + 1,
        questionText: q.questionText,
        options: q.options, // { A: "...", B: "...", C: "...", D: "..." }
        correct: q.correct,
        explanation: q.explanation || "",
      });
    });

    await batch.commit();
    res.status(200).send("✅ Mock test uploaded");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});