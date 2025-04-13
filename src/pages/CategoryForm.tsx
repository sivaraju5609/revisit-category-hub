
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoriesProvider, useCategories } from "@/contexts/CategoriesContext";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Upload } from "lucide-react";

const CategoryFormContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCategory, addCategory, updateCategory } = useCategories();
  
  const [name, setName] = useState("");
  const [itemCount, setItemCount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    itemCount: "",
    imageUrl: "",
  });

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const category = getCategory(id!);
      if (category) {
        setName(category.name);
        setItemCount(category.itemCount.toString());
        setImageUrl(category.imageUrl);
        setImagePreview(category.imageUrl);
      } else {
        navigate("/dashboard");
      }
    }
  }, [id, getCategory, isEditMode, navigate]);

  const validateForm = () => {
    const newErrors = {
      name: "",
      itemCount: "",
      imageUrl: "",
    };
    
    let isValid = true;
    
    if (!name.trim()) {
      newErrors.name = "Category name is required";
      isValid = false;
    }
    
    if (!itemCount.trim()) {
      newErrors.itemCount = "Item count is required";
      isValid = false;
    } else if (isNaN(Number(itemCount)) || Number(itemCount) < 0) {
      newErrors.itemCount = "Item count must be a positive number";
      isValid = false;
    }
    
    if (!imageUrl.trim() && !imagePreview) {
      newErrors.imageUrl = "Image URL is required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEditMode) {
        await updateCategory(id!, {
          name,
          itemCount: Number(itemCount),
          imageUrl: imageUrl || imagePreview,
        });
      } else {
        await addCategory({
          name,
          itemCount: Number(itemCount),
          imageUrl: imageUrl || imagePreview,
        });
      }
      
      navigate("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a storage service
      // For this demo, we'll use a local URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageUrl(""); // Clear the URL input since we're using the file
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="outline"
        className="mb-6 flex items-center gap-1"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft size={16} />
        <span>Back to Dashboard</span>
      </Button>
      
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Edit Category" : "Add New Category"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditMode
              ? "Update the details of your category"
              : "Add a new category to your e-commerce store"}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Summer Collection"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="itemCount">Item Count</Label>
            <Input
              id="itemCount"
              type="number"
              value={itemCount}
              onChange={(e) => setItemCount(e.target.value)}
              placeholder="e.g. 42"
              min="0"
              className={errors.itemCount ? "border-red-500" : ""}
            />
            {errors.itemCount && (
              <p className="text-red-500 text-xs mt-1">{errors.itemCount}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                if (e.target.value) {
                  setImagePreview(e.target.value);
                }
              }}
              placeholder="https://example.com/image.jpg"
              className={errors.imageUrl ? "border-red-500" : ""}
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Or Upload Image</Label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="space-y-2 text-center">
                <div className="flex justify-center">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex flex-col items-center text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          
          {imagePreview && (
            <div className="space-y-2">
              <Label>Image Preview</Label>
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Category Preview"
                  className="w-full h-full object-cover"
                  onError={() => {
                    setImagePreview("");
                    setErrors({
                      ...errors,
                      imageUrl: "Invalid image URL. Please provide a valid URL.",
                    });
                  }}
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Category"
                : "Create Category"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CategoryForm = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow">
        <CategoriesProvider>
          <CategoryFormContent />
        </CategoriesProvider>
      </div>
    </div>
  );
};

export default CategoryForm;
