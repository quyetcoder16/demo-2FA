import qrcode from "qrcode";

const generateQRCodeDataURL = (otpAuthUrl) => {
    return new Promise((resolve, reject) => {
      qrcode.toDataURL(otpAuthUrl, (err, dataUrl) => {
        if (err) {
          reject(err);
        } else {
          resolve(dataUrl);
        }
      });
    });
  };

export const createQrCode = async(otpauthURL) => {
    const dataUrl = await generateQRCodeDataURL(otpauthURL);
    return dataUrl;
}