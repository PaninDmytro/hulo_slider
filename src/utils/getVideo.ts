const BASE_URL = 'https://api.vimeo.com/videos/';
const ACCESS_TOKEN = 'e61cf4e4b304898f87aa96c0cb1c43cf';
const VIDEO_ID = '824804225';

export const getVideo = async () => {
  try {
    const response = await fetch(`${BASE_URL}${VIDEO_ID}?autoplay=true`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const videoData = await response.json();
    return videoData;
  } catch (error) {
    console.error('Error fetching video data:', error);
    throw error;
  }
};
