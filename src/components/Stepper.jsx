import { Heading1 } from "lucide-react";
import React, { useState } from "react";

const StepperComponent = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center w-full px-48 py-2">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <React.Fragment key={index}>
          {/* Line before the circle */}
          {index > 0 && (
            <div
              className={`flex-1 h-1 ${
                currentStep >= index ? "bg-black" : "bg-gray-300"
              }`}
            ></div>
          )}

          {/* Step Circle */}
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              currentStep >= index
                ? "bg-black text-white"
                : "border-gray-300 text-gray-500"
            }`}
          >
            {index + 1}
          </div>

          {/* Line after the circle */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 ${
                currentStep > index ? "bg-black" : "bg-gray-300"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Stepper = ({ step0, steps, currentStep, setCurrentStep }) => {
  return (
    <div className="w-full p-4">
      <StepperComponent steps={steps} currentStep={currentStep} />
      {currentStep > 0 ? null : (
        <div className="flex justify-center w-full">{step0[1]}</div>
      )}
      <div className="flex justify-center w-full">{steps[currentStep + 1]}</div>
    </div>
  );
};

export default Stepper;
