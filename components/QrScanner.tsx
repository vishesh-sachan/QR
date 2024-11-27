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
      false // Disable verbose logging
    );

    scanner.render(
      (decodedText) => {
        setScannedData(decodedText);
        scanner.clear(); // Stop scanning after a successful scan
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
    }
  };

  return (
    <div>
      <h2>Scan QR Code</h2>
      <div id="qr-reader" style={{ width: "100%" }}></div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginTop: "10px" }}
      />
      {scannedData && <p>Scanned Data: {scannedData}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}