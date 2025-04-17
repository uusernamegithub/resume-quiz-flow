
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { submitFiles } from "@/services/api";

const Index = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [requirementsFile, setRequirementsFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }
    
    if (!requirementsFile) {
      toast.error("Please upload the job requirements");
      return;
    }
    
    try {
      setIsSubmitting(true);
      // In a real app, this would send the files to your backend
      await submitFiles(resumeFile, requirementsFile);
      toast.success("Files uploaded successfully!");
      navigate('/quiz');
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Resume Assessment</h1>
          <p className="mt-3 text-lg text-gray-600">
            Upload your resume and job requirements to take a personalized skill assessment
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <FileUpload 
              label="Upload Resume" 
              accept=".pdf"
              onChange={setResumeFile} 
            />
            <FileUpload 
              label="Upload Job Requirements" 
              accept=".pdf"
              onChange={setRequirementsFile} 
            />
          </div>
          
          <div className="flex justify-center">
            <Button
              type="submit"
              className="px-10 py-6 text-lg bg-theme-blue-500 hover:bg-theme-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Start Assessment"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
