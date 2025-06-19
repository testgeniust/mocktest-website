// mocktest-website/backend/functions/get-result.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * 📤 Endpoint: /getResult
 * 📌 Query user test result by userId and paper
 * 📌 Returns score, correct, wrong, and full question with answer
 */
exports.getResult = functions.https.onRequest(async (req, res) => {
  const { userId, paper } = req.body;

  if (!userId || !paper) {
    return res.status(400).send("❌ userId and paper are required");
  }

  try {
    const resultSnap = await db.collection("mocktest_results")
      .where("userId", "==", userId)
      .where("paper", "==", paper)
      .limit(1)
      .get();

    if (resultSnap.empty) {
      return res.status(404).send("❌ No result found");
    }

    const result = resultSnap.docs[0].data();

    const testSnap = await db.collection("mock_tests")
      .where("paper", "==", paper)
      .limit(1)
      .get();

    if (testSnap.empty) {
      return res.status(404).send("❌ No mock test found for this paper");
    }

    const questionsRef = testSnap.docs[0].ref.collection("questions");
    const questionsSnap = await questionsRef.orderBy("qno").get();

    const questions = [];
    questionsSnap.forEach(doc => {
      questions.push(doc.data());
    });

    res.status(200).json({
      result,
      questions
    });

  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});