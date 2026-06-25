import random
import re
from typing import Dict, Any

def calculate_chatbot_roi(
    current_support_volume_per_month: int,
    avg_cost_per_ticket: float,
    expected_deflection_rate: float,
    chatbot_monthly_cost: float,
    implementation_cost: float = 0.0
) -> Dict[str, Any]:
    """
    Calculates the ROI of implementing a chatbot based on support volume and costs.
    
    Args:
        current_support_volume_per_month: Number of tickets per month.
        avg_cost_per_ticket: Cost of handling a single ticket manually.
        expected_deflection_rate: Percentage (0.0 to 1.0) of tickets expected to be handled by the bot.
        chatbot_monthly_cost: The recurring monthly cost of the chatbot software/maintenance.
        implementation_cost: One-time cost to implement the chatbot.
        
    Returns:
        A dictionary containing the calculated savings, costs, and ROI metrics.
    """
    
    if not (0.0 <= expected_deflection_rate <= 1.0):
        raise ValueError("Deflection rate must be between 0.0 and 1.0")

    deflected_tickets = current_support_volume_per_month * expected_deflection_rate
    monthly_savings_gross = deflected_tickets * avg_cost_per_ticket
    monthly_savings_net = monthly_savings_gross - chatbot_monthly_cost
    
    annual_savings_net = (monthly_savings_net * 12) - implementation_cost
    
    # Calculate months to break even on implementation cost (if any)
    months_to_break_even = 0
    if implementation_cost > 0 and monthly_savings_net > 0:
        months_to_break_even = implementation_cost / monthly_savings_net
        
    annual_roi_percentage = 0.0
    total_annual_cost = (chatbot_monthly_cost * 12) + implementation_cost
    
    if total_annual_cost > 0:
        annual_roi_percentage = (annual_savings_net / total_annual_cost) * 100

    return {
        "monthly_deflected_tickets": int(deflected_tickets),
        "monthly_gross_savings": round(monthly_savings_gross, 2),
        "monthly_net_savings": round(monthly_savings_net, 2),
        "annual_net_savings": round(annual_savings_net, 2),
        "annual_roi_percentage": round(annual_roi_percentage, 2),
        "months_to_break_even": round(months_to_break_even, 1)
    }

def analyze_conversation(transcript: str) -> Dict[str, Any]:
    """
    Analyzes a chat transcript to determine sentiment, intent, and resolution status.
    This function uses a mock analysis logic to simulate an LLM call.
    
    Args:
        transcript: The full chat transcript string.
        
    Returns:
        A dictionary containing the analysis results.
    """
    
    transcript_lower = transcript.lower()
    
    # Mock Sentiment Analysis
    positive_words = ['great', 'thanks', 'awesome', 'good', 'excellent', 'helpful', 'solved', 'appreciate']
    negative_words = ['bad', 'terrible', 'awful', 'angry', 'frustrated', 'useless', 'unhelpful', 'issue', 'problem', 'fail']
    
    pos_count = sum(1 for word in positive_words if word in transcript_lower)
    neg_count = sum(1 for word in negative_words if word in transcript_lower)
    
    sentiment = "Neutral"
    if pos_count > neg_count:
        sentiment = "Positive"
    elif neg_count > pos_count:
        sentiment = "Negative"
        
    # Mock Intent Detection
    intents = {
        "Password Reset": ["password", "reset", "login", "forgot", "credentials"],
        "Billing Inquiry": ["bill", "invoice", "charge", "payment", "credit card", "refund"],
        "Technical Support": ["error", "bug", "crash", "not working", "broken", "connect"],
        "Product Inquiry": ["how to", "features", "pricing", "upgrade", "plan"]
    }
    
    detected_intent = "General Inquiry"
    max_matches = 0
    
    for intent, keywords in intents.items():
        matches = sum(1 for kw in keywords if kw in transcript_lower)
        if matches > max_matches:
            max_matches = matches
            detected_intent = intent
            
    # Mock Resolution Status
    resolution_keywords = ["resolved", "fixed", "solved", "all set", "good to go", "thank you", "thanks"]
    escalation_keywords = ["agent", "human", "representative", "manager", "escalate"]
    
    status = "Unresolved"
    if any(kw in transcript_lower for kw in resolution_keywords):
        status = "Resolved"
    elif any(kw in transcript_lower for kw in escalation_keywords):
        status = "Escalated"
        
    # Mock confidence scores
    confidence = round(random.uniform(0.75, 0.98), 2)
    
    return {
        "sentiment": sentiment,
        "primary_intent": detected_intent,
        "resolution_status": status,
        "analysis_confidence": confidence,
        "summary": f"User engaged in a {detected_intent.lower()} interaction. The sentiment was {sentiment.lower()} and the issue appears to be {status.lower()}."
    }
