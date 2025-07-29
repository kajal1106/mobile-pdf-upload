export async function sendToMockServer(file: File): Promise<Blob | null> {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const res = await fetch("http://localhost:3001/sign-pdf", {
			method: "POST",
			mode: "cors",
			body: formData,
		});

		if (!res.ok) {
			const err = await res.text();
			throw new Error(`Upload failed: ${err}`);
		}

		return await res.blob();
	} catch (error) {
		console.error("Mock server error:", error);
		return null; // We'll handle this in the component
	}
}
