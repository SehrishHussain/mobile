// app.config.ts
import "dotenv/config";



export default {
  expo: {
    name: "TravelTrack",
    slug: "travel-track",
    owner: "sehrishaman",
    version: "1.0.0",
    extra: {
       googleExpoClientId: process.env.GOOGLE_EXPO_CLIENT_ID,
      
      googleAndroidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
      googleIosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
      googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID,
     
      
    },
  },
};
