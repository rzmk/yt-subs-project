# Custom YouTube Subtitles

A website showcasing the ability to overlay custom subtitles for multiple YouTube videos using `.vtt` files.

![Demo](demo.gif)

## How to Use

1. Create captions for a YouTube video and save them as a `.vtt` file.
   1. One method is using online caption-making software or Adobe Premiere Pro, exporting as a `.srt` file and then converting it to a `.vtt` file using an online conversion tool.
2. Rename the `.vtt` file to the video ID of the YouTube video.
   1. For example if the YouTube video you're captioning is at [https://www.youtube.com/watch?v=-JTq1BFBwmo](https://www.youtube.com/watch?v=-JTq1BFBwmo) then the video ID is after the `=` symbol as `-JTq1BFBwmo`.
3. Add the `.vtt` file to `/src/captions/` and add the video ID to the array in `captions.js`.
4. Build the React application and deploy it.
   1. You can use tools like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) to automate this process.

## Conclusions

This was helpful in understanding how to work with the [Video.js](https://videojs.com/) player and adding my own custom subtitles.

There is a possible issue where adding more caption entries may result in a single row of selectable videos to become too crowded/long, so this could be fixed. Though I don't plan to as this isn't a production application and there are web applications such as [Amara.org](https://amara.org/) and [Captionfy](https://www.captionfy.com/) that are more fully featured.
