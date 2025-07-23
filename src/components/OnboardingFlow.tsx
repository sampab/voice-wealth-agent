import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Camera, CheckCircle, CreditCard, User, Phone, MapPin, Shield, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

export const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    aadharNumber: "",
    fatherName: "",
    phone: "",
    address: "",
    otp: "",
    idScanned: false,
    otpSent: false,
    otpVerified: false,
    biometricVerified: false,
  });

  const steps: OnboardingStep[] = [
    {
      id: "id-scan",
      title: "Scan Your Aadhar Card",
      description: "YONO quick onboarding with Aadhar verification",
      icon: <Camera className="h-6 w-6" />,
      completed: formData.idScanned,
    },
    {
      id: "otp-verification",
      title: "OTP Verification",
      description: "Verify your mobile number with OTP",
      icon: <Shield className="h-6 w-6" />,
      completed: formData.otpVerified,
    },
    {
      id: "biometric",
      title: "Biometric Verification",
      description: "Quick fingerprint verification",
      icon: <Fingerprint className="h-6 w-6" />,
      completed: formData.biometricVerified,
    },
    {
      id: "complete",
      title: "Account Created!",
      description: "Welcome to your new banking experience",
      icon: <CheckCircle className="h-6 w-6" />,
      completed: false,
    },
  ];

  const progress = (currentStep / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const simulateIdScan = () => {
    // Simulate ID scanning process
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        idScanned: true,
        firstName: "Rajesh",
        lastName: "Kumar",
        dateOfBirth: "1990-05-15",
        gender: "Male",
        aadharNumber: "1234 5678 9012",
        fatherName: "Suresh Kumar",
        address: "123 MG Road, Bangalore, Karnataka 560001",
        phone: "+91 98765 43210", // Auto-filled from Aadhar
      }));
    }, 2000);
  };

  const sendOTP = () => {
    setFormData(prev => ({ ...prev, otpSent: true }));
    // Simulate OTP sending
    setTimeout(() => {
      setFormData(prev => ({ ...prev, otp: "123456" }));
    }, 1000);
  };

  const verifyOTP = () => {
    if (formData.otp === "123456") {
      setFormData(prev => ({ ...prev, otpVerified: true }));
    }
  };

  const verifyBiometric = () => {
    // Simulate biometric verification
    setTimeout(() => {
      setFormData(prev => ({ ...prev, biometricVerified: true }));
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-20 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border-2 border-dashed border-primary/40 flex items-center justify-center mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground mb-4">
                Place your Aadhar Card in the frame and tap the camera button
              </p>
            </div>
            <Button 
              variant="trust" 
              size="lg" 
              onClick={simulateIdScan}
              disabled={formData.idScanned}
              className="w-full"
            >
              {formData.idScanned ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  ID Scanned Successfully
                </>
              ) : (
                <>
                  <Camera className="h-5 w-5 mr-2" />
                  Scan Aadhar Card
                </>
              )}
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-4">
                Mobile Number: {formData.phone}
              </div>
              <p className="text-muted-foreground mb-4">
                We'll send a 6-digit OTP to verify your mobile number
              </p>
            </div>
            
            {!formData.otpSent ? (
              <Button 
                variant="trust" 
                size="lg" 
                onClick={sendOTP}
                className="w-full"
              >
                <Shield className="h-5 w-5 mr-2" />
                Send OTP
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter 6-digit OTP</Label>
                  <Input
                    id="otp"
                    value={formData.otp}
                    onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value }))}
                    placeholder="123456"
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                  />
                </div>
                <Button 
                  variant="trust" 
                  size="lg" 
                  onClick={verifyOTP}
                  disabled={formData.otp.length !== 6}
                  className="w-full"
                >
                  {formData.otpVerified ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      OTP Verified
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
                <div className="text-sm text-muted-foreground text-center">
                  Demo OTP: 123456
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center mb-4">
                <Fingerprint className="h-12 w-12 text-primary" />
              </div>
              <p className="text-muted-foreground mb-4">
                Place your finger on the scanner for biometric verification
              </p>
            </div>
            <Button 
              variant="trust" 
              size="lg" 
              onClick={verifyBiometric}
              disabled={formData.biometricVerified}
              className="w-full"
            >
              {formData.biometricVerified ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Biometric Verified
                </>
              ) : (
                <>
                  <Fingerprint className="h-5 w-5 mr-2" />
                  Scan Fingerprint
                </>
              )}
            </Button>
            <div className="text-xs text-muted-foreground text-center">
              Secure biometric authentication as per RBI guidelines
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Welcome, {formData.firstName}!</h3>
              <p className="text-muted-foreground">
                Your account has been created successfully using YONO quick onboarding.
              </p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-sm">Account Details:</h4>
              <div className="text-sm space-y-1 text-left">
                <p>• Aadhar Verified ✓</p>
                <p>• Mobile Verified ✓</p>
                <p>• Biometric Verified ✓</p>
                <p>• Account Status: Active</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Step Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white">
            {steps[currentStep].icon}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{steps[currentStep].title}</h2>
            <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
          </div>
        </div>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button
            variant="trust"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 2 ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    </Card>
  );
};