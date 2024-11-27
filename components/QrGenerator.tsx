"use client"
import { useState } from "react";
import QRCode from "qrcode";

export default function QrGenerator() {
  const [text, setText] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const generateQrCode = async () => {
    if (!text) return alert("Please enter some text!");
    try {
      const options = {
        width: 200,  
        margin: 2,
      };
      const url = await QRCode.toDataURL(text,options);
      setQrCodeUrl(url);
    } catch (err) {
      console.error("Failed to generate QR code", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-black">Create QR Code</h2>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full text-black"
          />
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={generateQrCode}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Generate
          </button>
        </div>
        {qrCodeUrl && (
          <div className="text-center">
            <h3 className="text-xl font-medium mb-2 text-black">Your QR Code:</h3>
            <img src={qrCodeUrl} alt="Generated QR Code" className="mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
}