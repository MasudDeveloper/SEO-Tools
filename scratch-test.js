import { analyzeWebsite } from './server/seoAnalyzer.js';

async function runTest() {
  console.log('Testing travelerbd.com/places/sada-pathor audit...');
  const result = await analyzeWebsite('https://travelerbd.com/places/sada-pathor');
  
  console.log('\n--- AUDIT RESULTS SUMMARY ---');
  console.log('Domain:', result.domain);
  console.log('Overall Score:', result.scores.overall);
  console.log('SPA Inertia Detected?:', result.isSpaDetected);
  console.log('Title:', result.metadata.title);
  console.log('Meta Desc:', result.metadata.metaDesc);
  console.log('H1 Headings:', result.headings.h1);
  console.log('Total Images Extracted:', result.images.totalCount);
  console.log('Missing Alt Count:', result.images.missingAltCount);
  
  console.log('\n--- EXTRACTED IMAGES ---');
  result.images.allImages.forEach(img => {
    console.log(`- [#${img.index}] ${img.src} | Alt: "${img.alt}" | HasAlt: ${img.hasAlt}`);
  });
}

runTest();
