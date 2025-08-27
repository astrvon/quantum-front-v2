import { message } from "antd";
import { UploadFile } from "antd/es/upload/interface";

import { compressImageToBase64 } from "@/common/helper/compressImageToBase64";

export type IHandleUploadImageChangeParams = {
  info: { fileList: UploadFile[] };
  setFileList: (files: UploadFile[]) => void;
  setPreview: (preview: string | null) => void;
  // setFormField?: (base64: string) => void; -> this is buggy
};

export const handleUploadImageChange = async ({
  info,
  setFileList,
  setPreview,
}: // setFormField,
IHandleUploadImageChangeParams) => {
  const latestFile = info?.fileList?.slice(-1)[0];
  setFileList(latestFile ? [latestFile] : []);
  if (!latestFile?.originFileObj) {
    setPreview(null);
    // setFormField?.("");
    return;
  }

  try {
    const base64 = await compressImageToBase64(
      latestFile.originFileObj as File,
      0.5
    );

    setPreview(base64);
    // setFormField?.(base64);
  } catch (err) {
    message.error("Failed to compress");
  }
};
