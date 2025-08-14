import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const AddMovieDialog: React.FC<{ close?: () => void }> = ({ close }) => {
  const [year, setYear] = useState<string>("");
  const [genre, setGenre] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <DialogContent className="rounded-xl bg-white [&>button]:hidden max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-base font-semibold">
          Add New Movie
        </DialogTitle>
        <DialogDescription className="font-base text-sm">
          Please double-check the information before adding a new movie.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {/* First Row - Title and Year */}
        <div className="grid grid-cols-2 gap-4">
          <FloatingLabelInput
            id="title"
            label="Title"
            className="w-full"
            inputClassName="text-sm text-[#193049] font-semibold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <FloatingLabelInput
            id="year"
            label="Year"
            className="w-full"
            inputClassName="text-sm text-[#193049] font-semibold"
            value={year || ""}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2024"
          />
        </div>

        {/* Second Row - Genre and Image Upload */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="!h-auto w-full p-4 text-sm [&_.select-badge]:hidden">
                <SelectValue placeholder="Genre" className="text-sm" />
              </SelectTrigger>

              <SelectContent className="[&_[data-radix-select-item-indicator]]:hidden [&_[data-state=checked]]:bg-transparent [&_[data-state=checked]_svg]:hidden max-h-[200px] overflow-y-auto">
                <SelectGroup>
                  {[
                    { label: "Action", value: "action" },
                    { label: "Adventure", value: "adventure" },
                    { label: "Comedy", value: "comedy" },
                    { label: "Drama", value: "drama" },
                    { label: "Fantasy", value: "fantasy" },
                    { label: "Horror", value: "horror" },
                    { label: "Mystery", value: "mystery" },
                    { label: "Romance", value: "romance" },
                    { label: "Sci-Fi", value: "sci-fi" },
                    { label: "Thriller", value: "thriller" },
                    { label: "Western", value: "western" },
                  ].map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="flex items-center justify-between px-4 py-2 hover:bg-gray-50"
                    >
                      <span>{item.label}</span>
                      {genre === item.value && (
                        <span className="select-badge ml-auto inline-block rounded bg-[#CEEEEE] px-1 text-[10px] font-normal text-[#01A8AB]">
                          Current
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-[#193049]">
              Movie Poster
            </div>

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Movie poster preview"
                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors h-32 flex items-center justify-center">
                <div className="space-y-2">
                  <div className="text-gray-500">
                    <svg
                      className="mx-auto h-8 w-8 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-[#01A8AB] hover:text-[#01A8AB]/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#01A8AB]"
                    >
                      <span>Upload image</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DialogFooter className="mt-6 grid grid-cols-2 gap-2 md:flex">
        <Button
          className="bg-[#E6E6E6] text-[#193049] hover:bg-[#d9d9d9]"
          onClick={() => close?.()}
        >
          Cancel
        </Button>
        <Button className="bg-[#E50000] text-white md:w-[100px] cursor-pointer hover:bg-[#E50000]/80">
          Add Movie
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddMovieDialog;
