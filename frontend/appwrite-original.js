import { Client, Account, Databases, Storage, ID, Query } from "https://cdn.jsdelivr.net/npm/appwrite/+esm";

const client = new Client();

client
 .setEndpoint("https://sfo.cloud.appwrite.io/v1")
  .setProject("69f8fee5000a6f62c5bc");

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID, Query };