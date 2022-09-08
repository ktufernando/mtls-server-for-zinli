import axios, { AxiosError } from "axios";
import https from "https";
import fs from "fs";

const getRequestWithCertificate = async () => {
  try {
    const cert = fs.readFileSync("certs/my_client.pem");
    const key = fs.readFileSync("certs/my_client.key");
    const hostName = "zwfqaqysxb.execute-api.sa-east-1.amazonaws.com/production";
    const httpsAgent = new https.Agent({
      cert,
      key,
      rejectUnauthorized: false,
    });

    const response = await axios.get(`https://${hostName}/api/test`, {
      httpsAgent,
    });
    console.log(response.data);
  } catch (e: any) {
    const error = e as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      console.log("### Native error");
      console.log(error);
    } else {
      if (error.request) {
        console.log("### Request error");
        console.log(error.request);
      }
      if (error.response) {
        console.log("### Response error");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  }
};

getRequestWithCertificate();