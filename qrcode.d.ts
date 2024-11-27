declare module 'qrcode' {
    interface QRCodeToDataURLOptions {
      errorCorrectionLevel?: 'low' | 'medium' | 'quartile' | 'high';
      margin?: number;
      scale?: number;
      width?: number;
      color?: {
        dark?: string;
        light?: string;
      };
    }
  
    function toDataURL(
      text: string,
      options?: QRCodeToDataURLOptions
    ): Promise<string>;
  
    function toString(
      text: string,
      options?: QRCodeToDataURLOptions
    ): Promise<string>;
  
    function toFile(
      path: string,
      text: string,
      options?: QRCodeToDataURLOptions
    ): Promise<void>;
  
    export { toDataURL, toString, toFile, QRCodeToDataURLOptions };
  }