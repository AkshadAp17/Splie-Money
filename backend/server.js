require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY || "";

app.post("/send-sms", async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ error: "Phone number and message are required" });
    }

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "v3",
        sender_id: "TXTIND",
        message,
        language: "english",
        numbers: phone,
      },
      {
        headers: {
          authorization: FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ success: true, response: response.data });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ error: "Failed to send SMS" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
