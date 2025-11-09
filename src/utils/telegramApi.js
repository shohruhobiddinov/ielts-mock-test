// telegramApi.js
const TELEGRAM_BOT_TOKEN = "8293510200:AAFuQAvlbLEIWKXz01liE38ooOwM0t7f6CA"; // replace with your token
const CHAT_ID = "1736820935"; // you will get this next

export const sendTelegramMessage = async (message) => {
    try {
        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: "HTML",
                }),
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Telegram API error:", error);
    }
};
