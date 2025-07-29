import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set the worker source for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  // The URL or object representing the PDF file to be viewed
  fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  // State to hold the number of pages in the PDF
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div className="mt-4 bg-white shadow rounded p-2 max-w-full overflow-auto">
      {/* Document component loads and parses the PDF */}
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)} // Set total pages on load
      >
        {/* Render each page using the Page component */}
        {Array.from(new Array(numPages), (_, i) => (
          <Page key={i} pageNumber={i + 1} width={300} /> // Render page with fixed width
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
