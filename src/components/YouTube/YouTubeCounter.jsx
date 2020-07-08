import React, { useState, useEffect } from "react";
import config from "./config";

const YouTubeCounter = () => {
  const { api_key } = config;
  const [videoViews, setVideoViews] = useState();
  const apiCallVideo = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=UUJxud-reX7Iz9hvW8KEYR7w&key=${api_key}`;

  let videoID = "";
  let apiCallViews = "";

  useEffect(() => {
    fetch(apiCallVideo)
      .then(result => result.json())
      .then(data => {
        console.log("video:");
        console.log(data);
        videoID = data.items[0].snippet.resourceId.videoId;
        console.log("VideoID:");
        console.log(videoID);
        apiCallViews = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoID}&key=${api_key}`;

        fetch(apiCallViews)
          .then(result => result.json())
          .then(data => {
            console.log("views:");
            console.log(data.items[0].statistics.viewCount);
            setVideoViews(data.items[0].statistics.viewCount);
          });
      });
  });
  return (
    <div>De nieuwste video van AlexAgnewOfficial heeft {videoViews} views</div>
  );
};

export default YouTubeCounter;
