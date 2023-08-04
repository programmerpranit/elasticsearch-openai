import { Client } from "@elastic/elasticsearch";

export const elasticClient = new Client({
  cloud: {
    id: process.env.CLOUD_ID,
  },
  auth: {
    username: process.env.CLOUD_USER,
    password: process.env.CLOUD_PASS,
  },
});
