import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 p-4">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Assessment</h1>
          <p className="text-gray-600 mb-8">Upload your resume and job requirements to start the assessment</p>
        </div>

        <div className="space-y-4">
          <FileUpload 
            label="Resume" 
            accept=".pdf" 
            onChange={(file) => {/* handle resume upload */}} 
          />
          
          <FileUpload 
            label="Job Requirements" 
            accept=".pdf" 
            onChange={(file) => {/* handle requirements upload */}} 
          />

          <div className="flex justify-center space-x-4">
            <Link to="/quiz">
              <Button variant="default" className="w-full">
                Start Assessment (Test Mode)
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
