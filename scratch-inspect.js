import axios from 'axios';
import * as cheerio from 'cheerio';

async function test() {
  const res = await axios.get('https://travelerbd.com/places/sada-pathor', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 SEO-Pulse-Bot/2.0'
    }
  });
  const $ = cheerio.load(res.data);
  console.log('Total static <img> tags in raw HTML:', $('img').length);
  $('img').each((i, el) => {
    console.log(`Static img #${i+1}: src="${$(el).attr('src')}" | alt="${$(el).attr('alt')}"`);
  });
}

test();
