import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

interface Props {
  // Function to handle the uploaded file
  onUpload: (file: File) => void;
}

const PdfUpload: React.FC<Props> = ({ onUpload }) => {
  // Callback to handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    // Check if the file is a PDF
    if (file && file.type === 'application/pdf') {
      onUpload(file); // Pass the file to the parent component
    } else {
      alert('Only PDF files are supported');
    }
  }, [onUpload]);

  // Set up the dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, // Handle file drop
    accept: { 'application/pdf': ['.pdf'] }, // Only accept PDFs
    multiple: false, // Only one file at a time
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
    >
      {/* Invisible file input element */}
      <input {...getInputProps()} />

      {/* Upload UI */}
      <div className="flex flex-col items-center justify-center gap-2">
        <FaCloudUploadAlt className="text-4xl text-blue-500" />
        <p className="text-sm text-gray-700">
          Drag and drop a PDF here or <span className="underline text-blue-600">click to upload</span>
        </p>
        <p className="text-xs text-gray-400">Supported format: .pdf</p>
      </div>
    </div>
  );
};

export default PdfUpload;
