
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

// Define the Category type
export interface Category {
  id: string;
  name: string;
  itemCount: number;
  imageUrl: string;
}

// Mock initial categories data
const initialCategories: Category[] = [
  {
    id: "1",
    name: "Summer Clothes",
    itemCount: 26,
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80"
  },
  {
    id: "2",
    name: "Winter Collection",
    itemCount: 42,
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80"
  },
  {
    id: "3",
    name: "Formal Wear",
    itemCount: 15,
    imageUrl: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80"
  },
  {
    id: "4",
    name: "Casual Outfits",
    itemCount: 38,
    imageUrl: "https://images.unsplash.com/photo-1542060748-10c28b62716f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80"
  },
  {
    id: "5",
    name: "Activewear",
    itemCount: 20,
    imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80"
  },
  {
    id: "6",
    name: "Accessories",
    itemCount: 53,
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80"
  }
];

interface CategoriesContextType {
  categories: Category[];
  loading: boolean;
  getCategory: (id: string) => Category | undefined;
  addCategory: (category: Omit<Category, "id">) => Promise<boolean>;
  updateCategory: (id: string, category: Partial<Omit<Category, "id">>) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load categories from localStorage if available
    const storedCategories = localStorage.getItem("revisitCategories");
    
    if (storedCategories) {
      try {
        setCategories(JSON.parse(storedCategories));
      } catch (error) {
        console.error("Error parsing stored categories:", error);
        setCategories(initialCategories);
      }
    } else {
      // Use initial data if nothing in localStorage
      setCategories(initialCategories);
    }
    
    setLoading(false);
  }, []);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("revisitCategories", JSON.stringify(categories));
    }
  }, [categories, loading]);

  const getCategory = (id: string): Category | undefined => {
    return categories.find(category => category.id === id);
  };

  const addCategory = async (category: Omit<Category, "id">): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCategory: Category = {
        ...category,
        id: Date.now().toString(), // Generate a unique ID
      };
      
      setCategories(prev => [...prev, newCategory]);
      toast.success("Category added successfully!");
      return true;
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category. Please try again.");
      return false;
    }
  };

  const updateCategory = async (id: string, categoryUpdate: Partial<Omit<Category, "id">>): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCategories(prev => 
        prev.map(category => 
          category.id === id 
            ? { ...category, ...categoryUpdate } 
            : category
        )
      );
      
      toast.success("Category updated successfully!");
      return true;
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category. Please try again.");
      return false;
    }
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCategories(prev => prev.filter(category => category.id !== id));
      toast.success("Category deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category. Please try again.");
      return false;
    }
  };

  return (
    <CategoriesContext.Provider 
      value={{ 
        categories, 
        loading, 
        getCategory, 
        addCategory, 
        updateCategory, 
        deleteCategory 
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = (): CategoriesContextType => {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
