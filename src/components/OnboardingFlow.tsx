import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Camera, CheckCircle, CreditCard, User, Phone, MapPin } from "lucide-react";
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
    phone: "",
    address: "",
    idScanned: false,
  });

  const steps: OnboardingStep[] = [
    {
      id: "id-scan",
      title: "Scan Your Aadhar Card",
      description: "Take a photo of your Aadhar Card for quick verification",
      icon: <Camera className="h-6 w-6" />,
      completed: formData.idScanned,
    },
    {
      id: "personal-info",
      title: "Personal Information",
      description: "Confirm your details from the Aadhar Card scan",
      icon: <User className="h-6 w-6" />,
      completed: !!(formData.firstName && formData.lastName),
    },
    {
      id: "contact",
      title: "Contact Information",
      description: "Add your phone number and address",
      icon: <Phone className="h-6 w-6" />,
      completed: !!(formData.phone && formData.address),
    },
    {
      id: "complete",
      title: "All Set!",
      description: "Your account is ready to use",
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
        firstName: "John",
        lastName: "Doe",
      }));
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
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter last name"
                />
              </div>
            </div>
            {formData.idScanned && (
              <div className="text-sm text-success bg-success/10 p-3 rounded-md">
                ✓ Information automatically filled from your Aadhar Card scan
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="123 Main St, City, State 12345"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Welcome, {formData.firstName}!</h3>
              <p className="text-muted-foreground">
                Your account has been created successfully. You can now start managing your finances.
              </p>
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