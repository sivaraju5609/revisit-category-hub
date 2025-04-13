
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Manage Your E-Commerce Categories with Ease
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Revisit provides a powerful yet simple way to organize and manage 
                  your clothing categories for a seamless shopping experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                    <Button size="lg" className="w-full sm:w-auto">
                      {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  {!isAuthenticated && (
                    <Link to="/login">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="order-1 md:order-2 animate-scale-in">
                <div className="relative">
                  <div className="absolute -z-10 top-0 left-0 w-3/4 h-3/4 bg-primary/10 rounded-full blur-3xl"></div>
                  <img
                    src="https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80"
                    alt="E-commerce categories"
                    className="rounded-lg shadow-xl w-full object-cover h-[300px] md:h-[400px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Powerful Category Management
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to organize your e-commerce store effectively
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join Revisit today and take control of your e-commerce categories
            </p>
            <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
              <Button size="lg">
                {isAuthenticated ? "Go to Dashboard" : "Get Started for Free"}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Revisit</h2>
              <p className="text-gray-400 mt-2">
                E-commerce category management made simple
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Revisit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature data
const features = [
  {
    icon: <CheckCircle2 size={32} />,
    title: "Easy Category Creation",
    description: "Create and organize product categories with our intuitive interface.",
  },
  {
    icon: <CheckCircle2 size={32} />,
    title: "Visual Management",
    description: "Upload images and visually manage your product categories.",
  },
  {
    icon: <CheckCircle2 size={32} />,
    title: "Inventory Tracking",
    description: "Keep track of how many items are in each category for better inventory management.",
  },
];

export default Index;
