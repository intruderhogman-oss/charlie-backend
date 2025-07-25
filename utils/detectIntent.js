const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function detectIntent(message) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            "You are Charlene, a helpful, warm, intelligent assistant for Leona’s Farmers Market. Speak conversationally, avoid sounding robotic. Guide vendors through the application process and answer questions naturally, like a thoughtful human would. Keep your tone friendly, helpful, and community-focused.",
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    return reply;
  } catch (err) {
    console.error('OpenAI error:', err);
    return "Sorry, Charlene is having trouble thinking right now.";
  }
}

module.exports = detectIntent;
