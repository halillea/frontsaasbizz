Project Title: Interactive Startup Valuation Calculator CardObjective: Create a premium, interactive UI component for individual startup profile pages that estimates valuation based on financial data and market multiples.

1. Visual Reference & Style
 Reference File: Valuation-calculator.png (located in root).
 Aesthetic: "High-end" and modern. Focus on clean typography, subtle shadows, and polished transitions.
 Motion Design: Icons must be animated to provide a "live" data feel. Transitions between valuation shifts should be smooth (e.g., numbers counting up/down).

2. Functional Requirements
The component must calculate and display valuations based on two primary variables:
 Base Revenue/Data: Extracted from the startup’s limited financial set (e.g., Annual Sales).
 Base Multiples: The UI should toggle or animate through these industry benchmarks: 2x, 3x, 6x, 8x, 12x, 15x, 18x, 21x.
 AI-Improved Multipliers: A "Premium" or "AI-Optimized" layer that applies these modifiers: 1.2x, 1.6x, 1.8x, 2.2x, 2.8x, 3.2x.

3. Deliverables
 Fully responsive UI component (Desktop/Mobile).
 Animation specs for icons and value transitions.
 Clear logic for how the AI Multiplier interacts with the Base Multiple.

🔍 Suggestions & Clarifying Questions
To reach 95% confidence in this scope, I need to clarify the following:
 The Calculation Logic: Is the "AI Improved" value a multiplier of the base multiple (e.g., $Base \times AI\_Multiplier$) or is it an additive factor?
 User Interaction: Is this calculator automatic (the card cycles through values on its own like a ticker) or interactive (the user clicks or slides to see different valuations)?
 The Financial Input: Which specific data point are we multiplying? Is it "Trailing Twelve Months (TTM) Revenue," "Annual Recurring Revenue (ARR)," or "Gross Sales"?
 Data Source: Does the card need to pull this data from an API/Database in real-time, or is it hard-coded for the design mockup?
 Placement: How much screen real estate does this card have? Is it a sidebar element or a full-width hero section?
