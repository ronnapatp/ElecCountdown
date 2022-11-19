import dotenv from 'dotenv'
import Twitter from 'twitter';
// import { TwitterApi } from 'twitter-api-v2';

dotenv.config()


const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY as string,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string
});



async function main() {
  let today = new Date();
  today.toLocaleString('en-US', { timeZone: 'America/New_York' })

  let ElecDay = new Date("Nov 5, 2024");
  let msPerDay = 24 * 60 * 60 * 1000;
  let timeLeft = (ElecDay.getTime() - today.getTime());
  let e_daysLeft = timeLeft / msPerDay;
  let daysLeft = Math.floor(e_daysLeft);
  // if (daysLeft > 365) {
  //   daysLeft = daysLeft % 365;
  // }

  daysLeft = daysLeft + 1;
  let days: string;

  // Switch case that tweet daysleft
  switch (daysLeft) {
    case 0:
      days = `Today is the United State of America election Day! 🇺🇸 (${ElecDay.toLocaleDateString()})`
      break;
    case 1:
      days = `Tomorrow is the United State of America election Day! 🇺🇸 (${ElecDay.toLocaleDateString()})`
      break;
    default:
      days = `${daysLeft} days left until the United State of America Presidential Election Day! 🇺🇸 (${ElecDay.toLocaleDateString()})`
      break;
  }
  
  if ( daysLeft <= -1 ){
    console.log("Fail!")
  } else {
    client.post('statuses/update', {status: `${days}`})
  }
}
main().catch(err=> console.log(err))
