
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CategoriesProvider, useCategories } from "@/contexts/CategoriesContext";
import CategoryCard from "@/components/CategoryCard";
import Navbar from "@/components/Navbar";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const DashboardContent = () => {
  const { categories, loading } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [searchTerm, categories]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Category Management</h1>
          <p className="text-gray-600 mt-1">Manage your e-commerce categories</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64 md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <Link to="/categories/add">
            <Button className="flex items-center gap-1">
              <Plus size={18} />
              <span>Add Category</span>
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-100 h-64 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl font-medium text-gray-600 mb-4">
            {searchTerm ? "No categories found matching your search" : "No categories found"}
          </p>
          {!searchTerm && (
            <Link to="/categories/add">
              <Button>Add Your First Category</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow">
        <CategoriesProvider>
          <DashboardContent />
        </CategoriesProvider>
      </div>
    </div>
  );
};

export default Dashboard;
