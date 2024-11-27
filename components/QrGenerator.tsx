"use client"
import { useState } from "react";
import QRCode from "qrcode";

export default function QrGenerator() {
  const [text, setText] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const generateQrCode = async () => {
    if (!text) return alert("Please enter some text!");
    try {
      const url = await QRCode.toDataURL(text);
      setQrCodeUrl(url);
    } catch (err) {
      console.error("Failed to generate QR code", err);
    }
  };

  return (
    <div>
      <h2>Create QR Code</h2>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button onClick={generateQrCode}>Generate</button>
      {qrCodeUrl && (
        <div>
          <h3>Your QR Code:</h3>
          <img src={qrCodeUrl} alt="Generated QR Code" />
        </div>
      )}
    </div>
  );
}