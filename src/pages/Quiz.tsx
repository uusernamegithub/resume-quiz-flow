// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { ArrowRight, Loader2 } from "lucide-react";

// const Quiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [questionsAnswered, setQuestionsAnswered] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadNextQuestion();
//   }, []);

//   const loadNextQuestion = async () => {
//     try {
//       setIsLoading(true);
//       const res = await fetch('/evalverse/mcq');
//       if (!res.ok) throw new Error("Failed to fetch question");
//       const questionData = await res.json();
//       setCurrentQuestion(questionData);
//     } catch (error) {
//       console.error("Error fetching question:", error);
//       setCurrentQuestion(null);  // Handle error case
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const submitAnswer = async (answer) => {
//     try {
//       setIsSubmitting(true);
//       const res = await fetch('/evalverse/mcq/eval', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ candidate_answer: answer })
//       });

//       const data = await res.json();
//       if (data.result) {
//         alert('Correct Answer!');
//         await resetDifficulty();
//       } else {
//         alert('Incorrect Answer!');
//       }

//       setQuestionsAnswered((prev) => prev + 1);

//       if (questionsAnswered >= 4) {
//         alert("MCQ assessment completed!");
//         navigate('/hr-question');
//         return;
//       }

//       await loadNextQuestion();
//       setSelectedAnswer(null);

//     } catch (error) {
//       console.error("Error submitting answer:", error);
//       alert("Failed to submit answer");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const resetDifficulty = async () => {
//     const res = await fetch('/evalverse/mcq/reset', { method: 'POST' });
//     if (res.ok) {
//       console.log("Difficulty reset successfully");
//     } else {
//       console.log("Failed to reset difficulty");
//     }
//   };

//   const handleSubmit = () => {
//     if (selectedAnswer !== null) {
//       submitAnswer(selectedAnswer);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
//         <p className="ml-2 text-lg">Loading question...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 p-4">
//       <div className="w-full max-w-4xl">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Skill Assessment</h1>
//           <p className="mt-2 text-gray-600">
//             Question {questionsAnswered + 1} of 5
//           </p>
//         </div>

//         <div className="flex justify-center">
//           {currentQuestion ? (
//             <Card className="w-full max-w-2xl">
//               <CardHeader>
//                 <CardTitle className="text-xl font-semibold">{currentQuestion.question}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
//                   {currentQuestion.options.map((option, index) => (
//                     <div key={index} className="flex items-start space-x-2 p-3 rounded-md hover:bg-slate-50">
//                       <RadioGroupItem id={`option-${index}`} value={option} className="mt-1" />
//                       <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-normal">
//                         {option}
//                       </Label>
//                     </div>
//                   ))}
//                 </RadioGroup>
//               </CardContent>
//               <CardFooter className="justify-end">
//                 <Button 
//                   onClick={handleSubmit} 
//                   disabled={selectedAnswer === null || isSubmitting}
//                   className="bg-theme-blue-500 hover:bg-theme-blue-600"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Submitting
//                     </>
//                   ) : (
//                     <>
//                       Next Question
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </>
//                   )}
//                 </Button>
//               </CardFooter>
//             </Card>
//           ) : (
//             <div className="flex justify-center items-center h-32">
//               <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
//               <p className="ml-2 text-lg">Loading question...</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const navigate = useNavigate();

  // Static Question Data
  const currentQuestion = {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"]
  };

  const submitAnswer = async (answer) => {
    try {
      setIsSubmitting(true);
      // Simulate submission (in a real app, replace this with a real API call)
      const isCorrect = answer === "Paris";  // Static check for correct answer

      if (isCorrect) {
        alert('Correct Answer!');
        await resetDifficulty();
      } else {
        alert('Incorrect Answer!');
      }

      setQuestionsAnswered((prev) => prev + 1);

      if (questionsAnswered >= 4) {
        alert("MCQ assessment completed!");
        navigate('/hr-question');
        return;
      }

      // Reset for next question (for now, using static question again)
      setSelectedAnswer(null);

    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit answer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetDifficulty = async () => {
    // Simulate difficulty reset (replace with API if needed)
    console.log("Difficulty reset successfully");
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      submitAnswer(selectedAnswer);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2 text-lg">Loading question...</p>
      </div>
    );
  }

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
          {currentQuestion ? (
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 rounded-md hover:bg-slate-50">
                      <RadioGroupItem id={`option-${index}`} value={option} className="mt-1" />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-normal">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="justify-end">
                <Button 
                  onClick={handleSubmit} 
                  disabled={selectedAnswer === null || isSubmitting}
                  className="bg-theme-blue-500 hover:bg-theme-blue-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting
                    </>
                  ) : (
                    <>
                      Next Question
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="ml-2 text-lg">Loading question...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

