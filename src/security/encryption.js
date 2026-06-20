import CryptoJS from "crypto-js";

export const encryptData = (data, secretKey) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data),
   secretKey).toString();
  return encryptedData;
}


export const decryptPhone = (encryptedPhone) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPhone, PHONE_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};