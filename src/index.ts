import { sendAPI } from "./apis/send-api";
import { createClient } from "./helpers/client";
import { HttpService } from "./helpers/http-service";
import { CredentialOptions } from "./helpers/types";

let PROJECT_ID = "";
let PROJECT_SECRET = "";
let BASE_URL = "https://api.smtpexpress.com";

function createHttpService() {
  return new HttpService({
    headers: {
      Authorization: `Bearer ${PROJECT_SECRET}`,
    },
  });
}

function globalSetCredentials(credentials: CredentialOptions) {
  PROJECT_SECRET = credentials.projectSecret;
  PROJECT_ID = credentials.projectId;
}

const globalSendApi = sendAPI(createHttpService());

export {
  createClient,
  globalSendApi as sendAPI,
  globalSetCredentials as setCredentials,
};
