"use client";

import { useUploadThing } from "@client/utils/uploadthing";

interface BlogImageUploaderProps {
  images: Array<string>;
  setImages: (urls: Array<string>) => void;
}

export default function BlogImageUploader({ images, setImages }: BlogImageUploaderProps) {
  const { isUploading, startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      const newUrls = res.map((file) => file.ufsUrl);
      setImages([...images, ...newUrls]);
    },
    onUploadError: (error: Error) => {
      alert(`Upload failed: ${error.message}`);
    },
  });

  // trigger upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      await startUpload(selectedFiles);
    }
  };

  const removeImage = (url: string) => {
    const updatedImages = images.filter((img) => img !== url);
    setImages(updatedImages);
  };
  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-center">
        <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <p className="font-redhat text-sm text-gray-500">{isUploading ? "Uploading..." : "Click to select and upload images"}</p>
          </div>
          <input type="file" className="hidden" multiple onChange={handleFileChange} disabled={isUploading} />
        </label>
      </div>

      {/* Preview */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((url) => (
          <div key={url} className="flex flex-col items-center">
            <img key={url} src={url} alt="Blog upload" className="h-32 w-full rounded object-cover" />
            <button onClick={() => removeImage(url)} className="mt-2 w-full rounded bg-red-500 px-2 py-1 text-white">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
