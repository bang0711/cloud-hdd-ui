import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
export async function POST(request: Request) {
  const { contentType, fileData } = await request.json();

  try {
    // Generate a unique file key
    const fileKey = `uploads/${uuidv4()}`;

    // Decode base64 file data
    const buffer = Buffer.from(fileData, "base64");

    // Prepare the upload parameters
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: fileKey,
      Body: buffer,
      ContentType: contentType,
      ACL: "public-read", // Make the file publicly readable if needed
    };

    // Upload file directly to S3
    const command = new PutObjectCommand({});
    await client.send(command);

    // Return the public URL of the uploaded file
    const fileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileKey}`;
    return new Response(JSON.stringify({ fileUrl }), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ error: "An unknown error occurred" }), { status: 500 });
  }
}
