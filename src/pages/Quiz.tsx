import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import QuizQuestion from '@/components/QuizQuestion';
import { fetchQuestion, submitAnswer } from '@/services/api';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const navigate = useNavigate();

  // Fetch the first question when component mounts
  useEffect(() => {
    loadNextQuestion();
  }, []);

  const loadNextQuestion = async () => {
    try {
      setIsLoading(true);
      
      // For demo purposes, we'll create a mock question if the API call fails
      let questionData;
      try {
        questionData = await fetchQuestion();
      } catch (error) {
        console.error("Error fetching from API, using mock data", error);
        // Mock data for demonstration
        questionData = getMockQuestion(questionsAnswered);
      }
      
      setCurrentQuestion(questionData);
    } catch (error) {
      console.error("Error loading question:", error);
      toast.error("Failed to load question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async (answer) => {
    try {
      setIsSubmitting(true);
      
      // In a real app, submit to the API
      if (currentQuestion) {
        try {
          await submitAnswer(currentQuestion.id, answer);
        } catch (error) {
          console.error("Error submitting to API, continuing with mock data", error);
        }
      }
      
      // Increment answered questions count
      setQuestionsAnswered(prev => prev + 1);
      
      // If we've answered 5 questions, end the quiz
      if (questionsAnswered >= 4) {
        toast.success("Assessment completed! Thank you for taking the quiz.");
        navigate('/'); // Return to home or redirect to results page
        return;
      }
      
      // Otherwise load the next question
      await loadNextQuestion();
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error("Failed to submit answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock questions for demonstration
  const getMockQuestion = (index) => {
    const mockQuestions = [
      {
        id: '1',
        question: 'Which of the following best describes the purpose of a RESTful API?',
        options: [
          'A way to style web pages',
          'A protocol for transferring files',
          'An architectural style for designing networked applications',
          'A database management system'
        ]
      },
      {
        id: '2',
        question: 'Based on the resume you provided, which programming language have you used most extensively?',
        options: [
          'JavaScript',
          'Python',
          'Java',
          'C++'
        ]
      },
      {
        id: '3',
        question: 'Which of these is NOT a principle of responsive web design?',
        options: [
          'Flexible grid-based layout',
          'Flexible images',
          'Media queries',
          'Fixed pixel widths'
        ]
      },
      {
        id: '4',
        question: 'Which version control system is mentioned in the job requirements?',
        options: [
          'Git',
          'SVN',
          'Mercurial',
          'Perforce'
        ]
      },
      {
        id: '5',
        question: 'What project management methodology is preferred according to the job requirements?',
        options: [
          'Waterfall',
          'Agile',
          'Kanban',
          'Six Sigma'
        ]
      }
    ];
    
    return mockQuestions[index % mockQuestions.length];
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Skill Assessment</h1>
          <p className="mt-2 text-gray-600">
            Question {questionsAnswered + 1} of 5
          </p>
        </div>

        <div className="flex justify-center">
          <QuizQuestion 
            question={currentQuestion} 
            onSubmit={handleSubmitAnswer}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;
