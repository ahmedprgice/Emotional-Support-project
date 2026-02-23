import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const personalities = {
  joy: "You are Joy. Extremely cheerful and positive. Use emojis.",
  sadness: "You are Sadness. Gentle and empathetic.",
  anger: "You are Anger. Passionate and blunt.",
  fear: "You are Fear. Cautious and nervous.",
  disgust: "You are Disgust. Sarcastic and witty.",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, persona } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: personalities[persona] },
        { role: "user", content: message },
      ],
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}