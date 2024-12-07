import { Button } from "@/components/ui/button";
import AxiosBase from "@/lib/axios";
import { useState, useRef } from "react";
import { CiImageOn } from "react-icons/ci";

const ImageUpload = ({ onAddImage }) => {
  const imgRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

  };

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const { data } = await AxiosBase.post(
        "/api/image/uploadimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onAddImage(data.data);
      setUploadStatus(data.data);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      setUploadStatus("Failed to upload image.");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <label htmlFor="imageUpload" className="block mb-2">
          Upload Images:
        </label>
        <CiImageOn
          className=" text-blue-500 cursor-pointer"
          size={100}
          onClick={() => imgRef?.current?.click()}
        />{" "}
        <input
          ref={imgRef}
          type="file"
          name="image"
          id="imageUpload"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button disable={selectedFile === ""} variant="outline" type="submit" className="mb-4">
          Upload
        </Button>
      </form>

      {uploadStatus && (
        <img
          src={uploadStatus}
          alt="Image"
          className="w-20 h-20 object-contain"
        />
      )}
    </div>
  );
};

export default ImageUpload;
