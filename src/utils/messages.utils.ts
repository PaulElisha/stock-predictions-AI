/** @format */

export const messages = (data: any, marketContext = "neutral") => {
  const tickers = data.map((stock: { ticker: string }) => stock.ticker);
  const dataPoints = data[0]?.results?.length || 0;

  return [
    {
      role: "system",
      content: `You are a senior trading analyst who translates complex market data into actionable insights for investors.

# ANALYTICAL MINDSET
- Think like: 40% Wall Street investor, 40% quantitative analyst, 20% financial educator
- Translate all technical concepts into plain English (e.g., "momentum" → "buying/selling pressure")
- Focus on WHY things happened, not just WHAT happened
- Connect individual stock movements to broader market psychology

# ADAPTIVE STRUCTURE
Based on ${tickers.length} tickers and ${dataPoints} days of data:
${
  tickers.length <= 3
    ? "- Dedicate substantial analysis to each stock (150+ words per ticker)"
    : "- Focus on patterns and sector themes, with concise individual analysis"
}

# REPORT PHILOSOPHY
1. **Context First**: Start with market sentiment and sector dynamics
2. **Story Over Statistics**: What narrative is the data telling?
3. **Psychology**: What are investors thinking/feeling about this stock?
4. **Forward-Looking**: Where could this go next, and why?
5. **Practical Advice**: Specific, actionable recommendations

# FORBIDDEN
- Excessive financial jargon without explanation
- Empty phrases like "consult a financial advisor"
- Pure data regurgitation without interpretation
- Mentioning tickers not in: ${tickers.join(", ")}

# DATA TO INTERPRET
${JSON.stringify(
  data.map((stock: any) => ({
    ticker: stock.ticker,
    days_of_data: stock.results?.length || 0,
    price_story: stock.results
      ? `From ${stock.results[0]?.o} to ${
          stock.results[stock.results.length - 1]?.c
        }`
      : "No data",
    volatility_profile: stock.results
      ? calculateVolatilityProfile(stock.results)
      : "Unknown",
    investor_sentiment_hints: stock.results
      ? inferSentiment(stock.results)
      : "No data",
  })),
  null,
  2
)}

# HELPER INTERPRETATIONS (for your thinking process):
${data
  .map((stock: any) =>
    stock.results
      ? `
${stock.ticker} Data Tells Us:
• Trend Direction: ${
          stock.results[0]?.o < stock.results[stock.results.length - 1]?.c
            ? "Bullish"
            : "Bearish"
        }
• Investor Behavior: ${
          stock.results.some((r: any) => r.h - r.l > r.o * 0.03)
            ? "Nervous/Volatile"
            : "Confident/Stable"
        }
• Market Position: ${
          calculateRelativeStrength(stock.results) > 1
            ? "Outperforming"
            : "Under pressure"
        }`
      : `No data for ${stock.ticker}`
  )
  .join("\n")}`,
    },
    {
      role: "user",
      content: `Analyze these ${tickers.length} stocks as if explaining to an intelligent investor who wants the full picture.

Current market environment: ${marketContext}

Please provide:
1. The market story these stocks are telling
2. Psychological drivers behind the price action
3. Detailed analysis of each ticker's trajectory and why it matters
4. Concrete predictions with reasoning
5. Portfolio-level recommendations

Make it insightful, not just descriptive.`,
    },
  ];
};

// Optional helper functions (could be implemented separately)
function calculateVolatilityProfile(results: any[]): string {
  const ranges = results.map((r) => (r.h - r.l) / r.o);
  const avg = ranges.reduce((a, b) => a + b, 0) / ranges.length;
  if (avg < 0.015) return "Very Calm";
  if (avg < 0.03) return "Normal Fluctuation";
  if (avg < 0.05) return "Elevated Volatility";
  return "High Volatility";
}

function inferSentiment(results: any[]): string {
  const closes = results.map((r) => r.c);
  const volumes = results.map((r) => r.v || 0);
  const lastMove = closes[closes.length - 1] - closes[closes.length - 2];
  const lastVolume = volumes[volumes.length - 1];
  const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;

  if (lastMove > 0 && lastVolume > avgVolume) return "Bullish conviction";
  if (lastMove < 0 && lastVolume > avgVolume) return "Bearish conviction";
  if (Math.abs(lastMove) < 0.01) return "Indecision/Consolidation";
  return "Mixed signals";
}

function calculateRelativeStrength(results: any[]): number {
  // Simplified relative strength calculation
  const changes = results
    .slice(1)
    .map((r, i) => (r.c - results[i].c) / results[i].c);
  return changes.reduce((a, b) => a + b, 0) / changes.length;
}
