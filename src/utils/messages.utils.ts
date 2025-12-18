/** @format */

export const messages = (data: any[]) => {
  const enhancedData = data.map((stock: any) => {
    const results = stock.results || [];
    const closes = results.map((r: any) => r.c);
    const volumes = results.map((r: any) => r.v);

    return {
      ticker: stock.ticker,
      summary: {
        periods: results.length,
        trend: calculateTrend(closes),
        volatility: calculateVolatility(results),
        volume_profile:
          volumes.length > 0
            ? `Avg volume: ${Math.round(average(volumes)).toLocaleString()}`
            : "No volume data",
      },
    };
  });

  return [
    {
      role: "system",
      content: `# QUANTITATIVE EQUITY ANALYST - PATTERN RECOGNITION MODE

## DATA INPUT (Pre-processed)
${JSON.stringify(enhancedData, null, 2)}

## ANALYTICAL TASKS

### A. PATTERN IDENTIFICATION
Detect and classify price patterns in the data:
1. Trend patterns: Uptrend/Downtrend/Sideways
2. Reversal signals: Double tops/bottoms, breakouts
3. Momentum divergences: Price vs. implied momentum

### B. PROBABILISTIC FORECASTING
For each ticker, estimate:
- Next session close range (with confidence intervals)
- Volatility expansion/contraction probability
- Critical inflection points from the data

### C. RISK-ADJUSTED RECOMMENDATIONS
Apply position sizing based on:
1. Data quality score (days available, completeness)
2. Signal clarity (strong/weak pattern recognition)
3. Correlation avoidance (if multiple tickers show similar patterns)

### D. REPORT STRUCTURE
[Market Structure Overview]
[Pattern Recognition Summary]
[Forward-Looking Scenarios: Bull/Base/Bear Cases]
[Risk-Managed Trade Constructions]

## CONSTRAINTS
- NO EXTERNAL REFERENCES
- NO TICKERS BEYOND: ${data.map((s) => s.ticker).join(", ")}
- UNCERTAINTY QUANTIFICATION REQUIRED for all predictions
- 200 word maximum, institutional tone`,
    },
    {
      role: "user",
      content:
        "Execute full quantitative analysis with pattern-based predictions.",
    },
  ];
};

// Helper functions
function calculateTrend(closes: number[]) {
  if (closes.length < 2) return "insufficient data";
  const first = closes[0];
  const last = closes[closes.length - 1];
  const change = (((last - first) / first) * 100).toFixed(2);
  return `${parseFloat(change) >= 0 ? "+" : ""}${change}%`;
}

function calculateVolatility(results: any[]) {
  const ranges = results.map((r) => ((r.h - r.l) / r.o) * 100);
  const avg = ranges.reduce((a, b) => a + b, 0) / ranges.length;
  return `Avg daily range: ${avg.toFixed(1)}%`;
}

function average(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
