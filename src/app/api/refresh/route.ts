import { NextResponse } from "next/server";

export async function GET() {
  try {
    // We fetch real live latest news using Google News RSS
    const rssUrl = "https://news.google.com/rss/search?q=AI+Artificial+Intelligence+Agentic+LLM&hl=en-US&gl=US&ceid=US:en";
    const res = await fetch(rssUrl, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch RSS feed");
    
    const xml = await res.text();
    
    // Simple regex parser for RSS <item>
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    
    while ((match = itemRegex.exec(xml)) !== null && items.length < 15) {
      const itemContent = match[1];
      
      const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
      const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
      const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const sourceMatch = itemContent.match(/<source[^>]*>([\s\S]*?)<\/source>/);
      
      if (titleMatch && linkMatch) {
        // Strip out CDATA and encode artifacts
        const title = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, '$1').replace(/&amp;/g, '&');
        const link = linkMatch[1];
        const date = pubDateMatch ? new Date(pubDateMatch[1]).toISOString() : new Date().toISOString();
        const source = sourceMatch ? sourceMatch[1] : "Industry News";
        
        // Infer dynamic tags from the title
        const tags = ["AI"];
        if (title.toLowerCase().includes("openai")) tags.push("OpenAI");
        if (title.toLowerCase().includes("google") || title.toLowerCase().includes("gemini")) tags.push("Google");
        if (title.toLowerCase().includes("agent")) tags.push("Agentic");
        if (title.toLowerCase().includes("nvidia")) tags.push("NVIDIA");
        if (title.toLowerCase().includes("market") || title.toLowerCase().includes("stock")) tags.push("Market");
        
        let impact = "low";
        if (title.toLowerCase().includes("breakthrough") || title.toLowerCase().includes("gpt-5")) impact = "critical";
        else if (title.toLowerCase().includes("release") || title.toLowerCase().includes("launch")) impact = "high";
        else impact = "indicator";

        let category = "Industry Impact";
        if (title.toLowerCase().match(/model|release|launch/)) category = "Model Release";
        else if (title.toLowerCase().match(/market|stock|earnings/)) category = "Market Analysis";
        else if (title.toLowerCase().match(/adopt|partner|enterprise/)) category = "Enterprise Adoption";

        items.push({
          title,
          url: link,
          date,
          source,
          category,
          impact,
          summary: `Latest intelligence regarding ${title} as reported by ${source}.`,
          tags
        });
      }
    }

    return NextResponse.json({
      status: "success",
      timestamp: new Date().toISOString(),
      articles: items
    });
    
  } catch (error) {
    console.error("News Refresh Error:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
