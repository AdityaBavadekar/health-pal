import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function initialiseAndCheckConnection() {
    try {
        const command = new ListBucketsCommand({});
        const response = await s3.send(command);
        return {
            success: true,
            buckets: response.Buckets || [],
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || "Failed to connect to S3",
        };
    }
}

async function testS3Connection() {
    const result = await initialiseAndCheckConnection();
    if (result.success) {
        console.log("[#] Connected to S3!");
    } else {
        console.error("[!] Failed to connect to S3:", result.error);
    }
}

export default s3;
export { testS3Connection };
