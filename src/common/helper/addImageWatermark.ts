const DEFAULT_PATH_WATERMARK = "/static/logo-white.png";

export async function addImageWatermarkFromUrl(
  base64Image: string,
  watermarkUrl = DEFAULT_PATH_WATERMARK
) {
  const brightness = await analyzeBrightness(base64Image);
  if (watermarkUrl === DEFAULT_PATH_WATERMARK) {
    watermarkUrl =
      brightness === "dark" ? DEFAULT_PATH_WATERMARK : "/static/logo-black.png";
  }

  return new Promise<string>((resolve) => {
    const img = new Image();
    const watermark = new Image();

    img.src = base64Image;
    watermark.src = watermarkUrl;
    watermark.crossOrigin = "anonymous";
    img.crossOrigin = "anonymous";

    img.onload = () => {
      watermark.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Canvas not supported");
        }

        const borderRadius = 4; // 4px for rounded-sm
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.save();

        // Draw the rounded mask for the original image
        ctx.beginPath();
        ctx.moveTo(borderRadius, 0);
        ctx.lineTo(canvas.width - borderRadius, 0);
        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, borderRadius);
        ctx.lineTo(canvas.width, canvas.height - borderRadius);
        ctx.quadraticCurveTo(
          canvas.width,
          canvas.height,
          canvas.width - borderRadius,
          canvas.height
        );
        ctx.lineTo(borderRadius, canvas.height);
        ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - borderRadius);
        ctx.lineTo(0, borderRadius);
        ctx.quadraticCurveTo(0, 0, borderRadius, 0);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        // Draw the watermark
        ctx.save();
        const padding = 10;

        const maxWatermarkWidth = canvas.width * 0.2; // 20% of width
        const maxWatermarkHeight = canvas.height * 0.2; // 20% of height

        // const watermarkWidth = img.width * 0.2;
        let watermarkWidth = maxWatermarkWidth;
        let watermarkHeight =
          (watermark.height / watermark.width) * watermarkWidth;

        if (watermarkHeight > maxWatermarkHeight) {
          watermarkHeight = maxWatermarkHeight;
          watermarkWidth =
            (watermark.width / watermark.height) * watermarkHeight;
        }

        ctx.globalAlpha = 0.35; // watermark opacity

        // Watermark rounded clipping
        // ctx.beginPath();
        // ctx.moveTo(padding + borderRadius, padding);
        // ctx.lineTo(padding + watermarkWidth - borderRadius, padding);
        // ctx.quadraticCurveTo(
        //   padding + watermarkWidth,
        //   padding,
        //   padding + watermarkWidth,
        //   padding + borderRadius,
        // );
        // ctx.lineTo(
        //   padding + watermarkWidth,
        //   padding + watermarkHeight - borderRadius,
        // );
        // ctx.quadraticCurveTo(
        //   padding + watermarkWidth,
        //   padding + watermarkHeight,
        //   padding + watermarkWidth - borderRadius,
        //   padding + watermarkHeight,
        // );
        // ctx.lineTo(padding + borderRadius, padding + watermarkHeight);
        // ctx.quadraticCurveTo(
        //   padding,
        //   padding + watermarkHeight,
        //   padding,
        //   padding + watermarkHeight - borderRadius,
        // );
        // ctx.lineTo(padding, padding + borderRadius);
        // ctx.quadraticCurveTo(padding, padding, padding + borderRadius, padding);
        // ctx.closePath();
        // ctx.clip();

        // Position the watermark at bottom-right with no bottom padding
        const x = canvas.width - watermarkWidth - padding; // no padding at bottom
        const y = canvas.height - watermarkHeight;

        ctx.drawImage(watermark, x, y, watermarkWidth, watermarkHeight);

        ctx.restore();
        ctx.globalAlpha = 1.0;

        const finalBase64 = canvas.toDataURL("image/png");
        resolve(finalBase64);
      };
    };
  });
}

async function analyzeBrightness(
  base64Image: string
): Promise<"light" | "dark"> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Image;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      const sampleSize = 10; // Small sample for speed
      canvas.width = sampleSize;
      canvas.height = sampleSize;

      // Draw scaled-down version
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
      const { data } = imageData;

      let totalBrightness = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Common formula for perceived brightness
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        totalBrightness += brightness;
      }

      const avgBrightness = totalBrightness / (sampleSize * sampleSize);

      // If average brightness > 128 → light, else dark
      resolve(avgBrightness > 128 ? "light" : "dark");
    };
  });
}
