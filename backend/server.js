import express from "express";
import cors from "cors";
import Groq from "groq-sdk";

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});




const personalities = {
  joy: "You are Joy. Extremely cheerful and positive. Use emojis.",
  sadness: "You are Sadness. Gentle and empathetic.",
  anger: "You are Anger. Passionate and blunt.",
  fear: "You are Fear. Cautious and nervous.",
  disgust: "You are Disgust. Sarcastic and witty."
};

app.post("/chat", async (req, res) => {
  try {
    const { message, persona } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: personalities[persona] },
        { role: "user", content: message }
      ]
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

app.listen(3001, () => console.log("Backend running on 3001"));
