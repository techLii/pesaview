import { Client, Databases, Query } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('mpesa-transactions-id');

export const databases = new Databases(client);

export async function getTransactions(searchTerm: string = '') {
  try {
    let queries = [
      Query.orderDesc('$createdAt'),
      Query.limit(100)
    ];

    if (searchTerm) {
      queries.push(Query.search('name', searchTerm));
    }

    const response = await databases.listDocuments(
      'pesaview-db-id',
      'colle-id',
      queries
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch transactions: ${error.message}`);
    } else {
      throw new Error('Failed to fetch transactions: Unknown error');
    }
  }
}

export async function getTransactionsForPerson(name: string) {
  try {
      const response = await databases.listDocuments(
          'pesaview-db-id',
          'colle-id',
          [
              Query.equal('name', name),
              Query.orderDesc('$createdAt'),
              Query.limit(100)
          ]
      );
      return response.documents;
  } catch (error) {
      console.error(`Error fetching transactions for ${name}:`, error);
      throw error;
  }
}

export async function checkCollectionExists() {
  try {
    await databases.listDocuments('pesaview-db-id', 'colle-id', [Query.limit(1)]);
    return true;
  } catch (error) {
    console.error('Error checking collection:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      if (error.message.includes('404')) {
        return false;
      }
    }
    throw error; // Re-throw the error if it's not a 404
  }
}

export async function getUniqueContributorsCount() {
  try {
    const response = await databases.listDocuments(
      'pesaview-db-id',
      'colle-id',
      [
        Query.select(['name']),
        Query.limit(100000) // Set a high limit to ensure we get all unique names
      ]
    );
    const uniqueNames = new Set(response.documents.map(doc => doc.name));
    return uniqueNames.size;
  } catch (error) {
    console.error('Error fetching unique contributors count:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch unique contributors count: ${error.message}`);
    } else {
      throw new Error('Failed to fetch unique contributors count: Unknown error');
    }
  }
}

