// app/meta-tags-generator/head.js

export default function Head() {
    const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://metaforge.allaboutcse.com";
    const pageUrl = `${websiteUrl}/meta-tags-generator`;
    const ogImage = `${websiteUrl}/og-image.png`; // adjust accordingly
    
    return (
      <>
        <title>MetaForge Meta Tags Generator – Free SEO Tool | allaboutcse.com</title>
        <meta
          name="description"
          content="MetaForge by AllAboutCSE: Instantly generate SEO-friendly HTML meta tags for your web projects. Copy, customize, and preview how your site appears in search results. Improve SEO in seconds."
        />
        <meta property="og:title" content="MetaForge Meta Tags Generator – Free SEO Tool" />
        <meta
          property="og:description"
          content="Generate, customize, and copy essential SEO meta tags for your site. Perfect for webmasters and developers. Powered by AllAboutCSE."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MetaForge Meta Tags Generator" />
        <meta
          name="twitter:description"
          content="Create and copy SEO-ready meta tags. Free, fast, and easy to use. For every web developer."
        />
        <meta name="twitter:image" content={ogImage} />
        <link rel="canonical" href={pageUrl} />
        <meta name="author" content="MetaForge - AllAboutCSE" />
      </>
    );
  }
  