const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { parseTestQuestions } = require("../utils/parser");

exports.uploadTest = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Fayl yuklanmadi" });
    }

    const filePath = req.file.path;

    // mammoth.js yordamida matnni chiqarib olish
    const result = await mammoth.extractRawText({ path: filePath });
    const rawText = result.value;

    // Savollarni parse qilish
    const questions = parseTestQuestions(rawText);

    // Vaqtinchalik faylni o'chirish
    fs.unlinkSync(filePath);

    if (questions.length === 0) {
      return res.status(422).json({
        success: false,
        message: "Savollar topilmadi. Fayl formatini tekshiring.",
        formatExample: "1. Savol?\nA) Variant\n# B) To'g'ri\nC) Variant",
      });
    }

    res.json({
      success: true,
      testId: `test_${uuidv4()}`,
      fileName: req.file.originalname,
      totalQuestions: questions.length,
      questions,
    });
  } catch (error) {
    // Xato bo'lsa ham faylni tozalash
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error("❌ Upload/Parsing error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server xatosi: " + error.message });
  }
};
