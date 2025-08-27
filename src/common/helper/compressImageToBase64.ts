export const compressImageToBase64 = (
  file: File,
  quality = 0.5
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) return reject("File load error");
      img.src = e.target.result as string;
    };

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context error");

        ctx.drawImage(img, 0, 0);

        const base64 = canvas.toDataURL("image/jpeg", quality);
        resolve(base64);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};
