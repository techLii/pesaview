import { getTransactions, checkCollectionExists, getUniqueContributorsCount } from '@/lib/appwrite';
import TransactionTable from '@/components/TransactionTable';
import TotalAmount from '@/components/TotalAmount';
import Link from 'next/link';
import SearchForm from '@/components/SearchForm';

export default async function TransactionsPage({
  searchParams
}: {
    searchParams: Promise<{ search: string }>
}) {
  const { search } = await searchParams;
  const searchTerm = search || '';
  let transactions: string | any[] = [];
  let contributorsCount = 0;
  let error = null;

  try {
    const collectionExists = await checkCollectionExists();

    if (collectionExists) {
        transactions = await getTransactions(searchTerm);
        contributorsCount = await getUniqueContributorsCount();
    } else {
        error = 'The specified collection does not exist or is not accessible.';
    }
  } catch (e) {
    console.error('Error in TransactionsPage component:', e);
    if (e instanceof Error) {
        error = e.message;
    } else if (typeof e === 'object' && e !== null) {
        error = JSON.stringify(e);
    } else {
        error = 'An unknown error occurred';
    }
  }

  return (
      <div className="flex flex-col min-h-screen">
          <header className="px-4 lg:px-6 h-14 flex items-center">
              <Link className="flex items-center justify-center" href="/">
                  <span className="font-bold text-2xl">PesaView</span>
              </Link>
              <nav className="ml-auto flex gap-4 sm:gap-6">
                  <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
                      Home
                  </Link>
              </nav>
          </header>
          <main className="flex-1">
              <div className="container mx-auto py-10 px-4 max-w-4xl">
                  <h1 className="text-2xl font-bold mb-5 text-center">Transactions</h1>
                  <SearchForm initialSearch={searchTerm} />
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                        {process.env.NODE_ENV === 'development' && (
                            <pre className="mt-2 text-sm">{JSON.stringify(error, null, 2)}</pre>
                        )}
                    </div>
                  )}
                  {transactions.length > 0 ? (
                      <>
                          <div className="mb-6 mt-4 text-center">
                              <p className="text-lg font-semibold">Number of Contributors: {contributorsCount}</p>
                          </div>
                          <TotalAmount transactions={transactions} />
                          <div className="mt-8">
                              <TransactionTable transactions={transactions} />
                          </div>
                      </>
                  ) : (
                      <div className="text-center py-4 mt-4">No transactions found.</div>
                  )}
              </div>
          </main>
          <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
              <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 PesaView. All rights reserved.</p>
              <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                  <Link className="text-xs hover:underline underline-offset-4" href="#">
                      Terms of Service
                  </Link>
                  <Link className="text-xs hover:underline underline-offset-4" href="#">
                      Privacy
                  </Link>
              </nav>
          </footer>
      </div>
  );
}

