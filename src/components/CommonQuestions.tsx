
import React from 'react';
import { Button } from './ui/button';

interface CommonQuestionsProps {
  onQuestionClick: (question: string) => void;
  isLoading: boolean;
  isSlackSummary: boolean;
}

const CommonQuestions = ({ onQuestionClick, isLoading, isSlackSummary }: CommonQuestionsProps) => {
  const companyQuestions = [
    "What's the health score for Acme Ltd?",
    "Show me all open support tickets for McDonald's",
    "What's the ARR for our top 5 customers?",
    "Which customers have churned in the last quarter?",
    "Show me expansion opportunities for existing accounts"
  ];

  const slackQuestions = [
    "Summarize yesterday's #general channel discussion",
    "What were the key decisions from the product meeting?",
    "Extract action items from the customer feedback thread",
    "Summarize the engineering standup conversation",
    "What issues were discussed in #support channel?"
  ];

  const questions = isSlackSummary ? slackQuestions : companyQuestions;

  return (
    <div className="mb-8">
      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">
          {isSlackSummary ? 'Common Slack Summaries' : 'Common Questions'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => onQuestionClick(question)}
              disabled={isLoading}
              className="text-left justify-start h-auto p-4 whitespace-normal text-wrap hover:bg-accent/50"
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonQuestions;
