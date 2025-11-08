import { Client, Account, Databases, Query } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('mpesa-transactions-id'); // Replace with your Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const DATABASE_ID = 'pesaview-db-id';
export const COLLECTION_ID = 'transactions';
export { ID, Query };