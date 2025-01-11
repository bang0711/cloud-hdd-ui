"use server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadToS3 = async (file: File) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}-${file.name}`, // Unique filename
    Body: file,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(params);
  const signedUrl = await getSignedUrl(client, command);

  const response = await fetch(signedUrl, {
    method: "PUT",
    body: file,
  });

  if (response.ok) {
    // Construct the public URL for the uploaded file
    const publicUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    return { success: true, url: publicUrl };
  } else {
    return { success: false, error: "Upload failed" };
  }
};
