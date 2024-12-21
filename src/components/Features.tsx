import { Laptop, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: <Laptop className="h-8 w-8" />,
    title: "Modern Tech Stack",
    description: "Built with React, TypeScript, and Tailwind CSS",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Fast",
    description: "Optimized for performance and speed",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Secure by Default",
    description: "Built with security best practices in mind",
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-gray-600">
            All the tools you need to build amazing products
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;