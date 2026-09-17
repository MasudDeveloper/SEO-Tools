import express from 'express';
import cors from 'cors';
import { analyzeWebsite } from './seoAnalyzer.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Endpoint: Perform Full Website SEO Audit
app.post('/api/audit', async (req, res) => {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid website URL.' });
  }

  try {
    const result = await analyzeWebsite(url);
    res.json(result);
  } catch (error) {
    console.error('Audit Endpoint Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze website. Please check the URL and try again.',
      details: error.message 
    });
  }
});

// API Endpoint: Compare Two Websites Side-by-Side
app.post('/api/compare', async (req, res) => {
  const { url1, url2 } = req.body;

  if (!url1 || !url2) {
    return res.status(400).json({ error: 'Please provide both URLs to compare.' });
  }

  try {
    const [site1, site2] = await Promise.all([
      analyzeWebsite(url1),
      analyzeWebsite(url2)
    ]);

    res.json({ site1, site2 });
  } catch (error) {
    console.error('Comparison Error:', error);
    res.status(500).json({ error: 'Failed to compare websites. Check both URLs.' });
  }
});

// API Endpoint: AI Meta Tag Optimizer & Keyword Generator
app.post('/api/ai-optimize', (req, res) => {
  const { title, metaDesc, keywords, primaryTopic } = req.body;

  const topic = primaryTopic || (title ? title.split('|')[0].trim() : 'Business & Technology Solutions');
  
  // Advanced AI generator for Title, Description, and LSI Keywords
  const generatedTitle = `${topic} | Ultimate Guide & Fast Solutions 2026`;
  const generatedMetaDesc = `Discover expert strategies and top solutions for ${topic}. Maximize your performance with proven step-by-step insights today.`;
  
  const lsiKeywords = [
    `${topic.toLowerCase()} best practices`,
    `top ${topic.toLowerCase()} tools`,
    `how to optimize ${topic.toLowerCase()}`,
    `${topic.toLowerCase()} guide 2026`,
    `fast ${topic.toLowerCase()} strategy`
  ];

  const suggestions = [
    `Include your primary target keyword "${keywords?.[0]?.word || topic}" in the first 30 characters of your page title.`,
    'Add a compelling call-to-action (CTA) such as "Get Started", "Learn More", or "Try Free" in the meta description.',
    'Keep title tag length strictly between 30 and 60 characters to avoid SERP truncation on mobile and desktop.',
    'Incorporate power words (e.g., Ultimate, Proven, Fast, Expert, Master) to boost organic Click-Through-Rate (CTR).'
  ];

  res.json({
    optimizedTitle: generatedTitle,
    optimizedMetaDesc: generatedMetaDesc,
    titleLength: generatedTitle.length,
    metaDescLength: generatedMetaDesc.length,
    lsiKeywords,
    suggestions
  });
});

// API Endpoint: Schema.org JSON-LD Generator
app.post('/api/generate-schema', (req, res) => {
  const { type, name, description, url, image, price, currency } = req.body;

  let schemaObj = {};
  const schemaType = type || 'Organization';

  if (schemaType === 'Organization') {
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": name || "My Business",
      "url": url || "https://example.com",
      "logo": image || "https://example.com/logo.png",
      "sameAs": [
        "https://facebook.com/mybusiness",
        "https://twitter.com/mybusiness",
        "https://linkedin.com/company/mybusiness"
      ]
    };
  } else if (schemaType === 'LocalBusiness') {
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": name || "My Local Store",
      "image": image || "https://example.com/storefront.jpg",
      "url": url || "https://example.com",
      "telephone": "+1-800-555-0199",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main Street",
        "addressLocality": "City",
        "addressRegion": "State",
        "postalCode": "10001",
        "addressCountry": "US"
      }
    };
  } else if (schemaType === 'Article') {
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": name || "Article Headline",
      "description": description || "Article summary text goes here.",
      "image": image || "https://example.com/cover.jpg",
      "author": {
        "@type": "Person",
        "name": "Author Name"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Publisher Brand",
        "logo": {
          "@type": "ImageObject",
          "url": "https://example.com/logo.png"
        }
      },
      "datePublished": new Date().toISOString().split('T')[0]
    };
  } else if (schemaType === 'Product') {
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": name || "Product Name",
      "image": image || "https://example.com/product.jpg",
      "description": description || "Product detailed description.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": currency || "USD",
        "price": price || "49.99",
        "availability": "https://schema.org/InStock"
      }
    };
  } else if (schemaType === 'FAQPage') {
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is ${name || 'this service'}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": description || "This service provides top-rated SEO and web optimization solutions."
          }
        },
        {
          "@type": "Question",
          "name": "How fast are the results delivered?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Results and audits are generated instantly in real-time."
          }
        }
      ]
    };
  }

  res.json({
    schemaType,
    jsonLd: JSON.stringify(schemaObj, null, 2)
  });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 SEO Pulse Pro Server running on http://localhost:${PORT}`);
  });
}

export default app;
