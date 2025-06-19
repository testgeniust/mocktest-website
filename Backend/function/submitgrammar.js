// mocktest-website/backend/functions/submit-grammar.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * 📥 Endpoint: /submitGrammar
 * 🔐 Expected payload:
 * {
 *   userId: "abc123",
 *   typedHindiText: "यूज़र ने जो हिंदी में टाइप किया",
 *   detectedMistakes: ["गलत शब्द", "त्रुटि"],
 *   correctEnglish: "Correct translation here",
 *   wordAnalysis: [
 *     { word: "परिश्रम", synonym: "मेहनत", antonym: "आलस्य" },
 *     ...
 *   ]
 * }
 */
exports.submitGrammar = functions.https.onRequest(async (req, res) => {
  const { userId, typedHindiText, detectedMistakes, correctEnglish, wordAnalysis } = req.body;

  if (!userId || !typedHindiText || !correctEnglish || !Array.isArray(wordAnalysis)) {
    return res.status(400).send("❌ Incomplete data");
  }

  try {
    await db.collection("grammar_results").add({
      userId,
      typedHindiText,
      detectedMistakes,
      correctEnglish,
      wordAnalysis,
      timestamp: new Date()
    });
    res.status(200).send("✅ Grammar result submitted");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});