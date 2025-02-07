require("dotenv").config();
const { writeFileSync, mkdirSync } = require("fs");
const path = "./src/environments/environment.ts";

const envFileContent = `
export const environment = {
    paypalClientId: '${process.env.PAYPAL_CLIENT_ID}',
    baseApiUrl: '${process.env.BASE_API_URL}',
}    
`;

mkdirSync("./src/environments", { recursive: true });

writeFileSync(path, envFileContent);
