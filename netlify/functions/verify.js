exports.handler = async (event) => {
    const GEMINI_KEY = process.env.GEMINI_KEY; // set this in Netlify, not in code
    const { image, prompt } = JSON.parse(event.body);
    
    const r = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }, { inline_data: image }] }] })
        }
    );
    const data = await r.json();
    return { statusCode: 200, body: JSON.stringify(data) };
              }
