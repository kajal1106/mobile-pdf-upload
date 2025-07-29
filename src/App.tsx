import { useState } from "react";
import PdfUpload from "./components/PdfUpload"; // Component for uploading PDFs
import PdfViewer from "./components/PdfViewer"; // Component for viewing signed PDFs
import Toast from "./components/Toast"; // Toast notification component
import Dialog from "./components/Dialog"; // Dialog popup component
import { sendToMockServer } from "./services/api"; // API service for sending PDF to mock server
import { FiUpload } from "react-icons/fi";

function App() {
	// State to store the URL of the signed PDF
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);

	// Toast state: visibility, message, and type (success/error)
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastType, setToastType] = useState<"success" | "error">("success");

	// Dialog state
	const [showDialog, setShowDialog] = useState(false);

	// Handles the file upload event
	const handleUpload = async (file: File) => {
		try {
			// Send file to mock server and receive signed PDF blob
			const blob = await sendToMockServer(file);

			// Create a URL to preview the signed PDF
			setPdfUrl(URL.createObjectURL(blob));

			// Show success notification
			setToastMessage("✅ PDF signed successfully!");
			setToastType("success");
			setShowToast(true);

			// Show dialog
			setShowDialog(true);
		} catch (err) {
			// If error, display toast with error message
			const errorMsg = err instanceof Error ? err.message : "❌ Upload failed!";
			setToastMessage(errorMsg);
			setToastType("error");
			setShowToast(true);
		}
	};

	return (
		<div className="min-h-screen bg-blue-50 p-4 flex flex-col items-center">
			{/* Header */}
			<header className="w-full flex flex-col items-center gap-2 px-4 mt-4">
				{/* Logo + Heading */}
				<div className="flex items-center justify-center gap-3">
					<div className="bg-blue-100 text-blue-600 rounded-full p-2">
						<FiUpload className="w-5 h-5" />
					</div>
					<h1 className="text-lg font-semibold text-blue-700 text-center">
						Mobile PDF Signing
					</h1>
				</div>

				{/* Subtitle */}
				<p className="text-sm text-gray-600 text-center">
					Upload, sign & preview PDFs on your phone
				</p>
			</header>

			{/* Add vertical space below subtitle */}
			<div className="mt-6">{/* Your upload box container */}</div>

			{/* Upload & PDF preview container */}
			<div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
				<PdfUpload onUpload={handleUpload} /> {/* Upload component */}
				{pdfUrl && <PdfViewer fileUrl={pdfUrl} />} {/* Preview component */}
			</div>

			{/* Toast notification */}
			{showToast && (
				<Toast
					message={toastMessage}
					type={toastType}
					onClose={() => setShowToast(false)}
				/>
			)}

			{/* Dialog popup */}
			{showDialog && (
				<Dialog
					title="PDF Signed ✅"
					description="Your PDF has been signed successfully and is ready to view."
					onClose={() => setShowDialog(false)}
				/>
			)}
		</div>
	);
}

export default App;
