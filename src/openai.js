const apiKey =
  "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";

const products = [
  {
    name: "HP Pavilion",
    brand: "HP",
    price: "$600",
    features: ["8GB RAM", "256GB SSD", "Intel i5"],
  },
  {
    name: "MacBook Air",
    brand: "Apple",
    price: "$999",
    features: ["8GB RAM", "512GB SSD", "M1 chip"],
  },
  {
    name: "Lenovo IdeaPad",
    brand: "Lenovo",
    price: "$550",
    features: ["8GB RAM", "1TB HDD", "AMD Ryzen 5"],
  },
];

export async function getChatbotResponse(userMessage) {
  const productInfo = products
    .map(
      (p) =>
        `${p.name} by ${p.brand}: ${p.price}, Features: ${p.features.join(
          ", "
        )}`
    )
    .join("\n");

  const systemMessage = `You are a helpful assistant that provides information about the following products:\n${productInfo}`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: userMessage },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      console.error("Error:", data);
      return "Could not generate a response. Please try again.";
    }
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred. Please try again.";
  }
}
