const express = require("express");
const fetch = require("node-fetch");

const app = express();

const port = process.env.PORT || 5000;

const youtubeKey = "YOUR_API_KEY";

app.use(express.json());

app.post("/channel-stats", async (req, res) => {
  const { utube } = req.body; // This accepts only YouTube Channel Link

  const utubeUrlPart = utube.split("/")[4];

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${utubeUrlPart}&key=${youtubeKey}`
  );
  const data = await response.json();
  if (data.items) {
    res.status(200).json({
      success: true,
      message: "Successfully Fetched!",
      result: data,
    });
  } else {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=${utubeUrlPart}&key=${youtubeKey}`
    );
    const data = await response.json();
    res.status(200).json({
      success: true,
      message: "Successfully Fetched!",
      result: data,
    });
  }
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
