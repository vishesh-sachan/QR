"use client"
import { useEffect, useState } from "react";
import { Html5Qrcode, Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

export default function QrScanner() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setScannedData(decodedText);
        scanner.clear();
      },
      (err) => {
        setError(`Error: ${err}`);
      }
    );

    return () => {
      scanner.clear().catch((err) => console.error("Failed to clear scanner", err));
    };
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("qr-reader");
    try {
      const result = await html5QrCode.scanFile(file, false);
      setScannedData(result);
    } catch (err) {
      setError("Error scanning image");
      console.error("Failed to generate QR code", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4 text-black">Scan QR Code</h2>
      <div id="qr-reader" className="w-full max-w-md bg-white p-4 rounded shadow-md"></div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mt-4 p-2 border border-gray-300 rounded text-black"
      />
      {scannedData && <p className="mt-4 text-green-600 text-black">Scanned Data: {scannedData}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}