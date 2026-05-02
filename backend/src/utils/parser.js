/**
 * Test savollarini matndan ajratib olish
 * Format:
 * 1. Savol matni?
 * A) Variant
 * # B) To'g'ri javob
 * C) Variant
 */
function parseTestQuestions(rawText) {
  const questions = [];
  // Savollarni bo'sh qatorlar orqali ajratamiz
  const blocks = rawText.split(/\n\s*\n/).filter((b) => b.trim());

  blocks.forEach((block) => {
    const lines = block
      .trim()
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l);
    if (lines.length < 3) return;

    const questionText = lines[0].replace(/^\d+[\.\)]\s*/, "").trim();
    let correctAnswer = null;
    const options = [];

    for (let i = 1; i < lines.length; i++) {
      let line = lines[i];
      const hasHash = line.includes("#");

      // # belgisini va atrofidagi bo'shliqlarni olib tashlash
      let cleanLine = line.replace(/\s*#\s*/g, "").trim();

      // A) yoki A. formatini aniqlash
      const match = cleanLine.match(/^([A-Da-dёЁ])[\.\)]\s*(.*)/);

      if (match) {
        const letter = match[1].toUpperCase().replace("Ё", "E");
        const optText = match[2].trim();
        options.push({ letter, text: optText });
        if (hasHash) correctAnswer = letter;
      }
    }

    // Faqat to'liq savol, variantlar va belgilangan to'g'ri javob borlarini qabul qilamiz
    if (questionText && options.length >= 2 && correctAnswer) {
      questions.push({ question: questionText, options, correctAnswer });
    }
  });

  return questions;
}

module.exports = { parseTestQuestions };
