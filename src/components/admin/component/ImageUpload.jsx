import AxiosBase from "@/lib/axios";
import { useState } from "react";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null); // Store selected file
  const [uploadStatus, setUploadStatus] = useState(""); // Store upload status or URL

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Update selected file state
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
      console.log(data);
      setUploadStatus(data.data);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      setUploadStatus("Failed to upload image.");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <label htmlFor="imageUpload">Upload Product Image:</label>
        <input
          type="file"
          name="image"
          id="imageUpload"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>

      {uploadStatus && (
        <img
          // src={process.env.backendUrl + uploadStatus}
          src={uploadStatus}
          alt="Image"
          className="w-20 h-20 object-contain"
        />
      )}
    </div>
  );
};

export default ImageUpload;
