import { MongoClient, Db, Document } from 'mongodb';

// MongoDB connection string
// Set MONGODB_URI in .env.local file to override this default
// Format: mongodb+srv://USERNAME:PASSWORD@cluster-1.lnfudjh.mongodb.net/?appName=Cluster-1
// Note: If password contains special characters like @, #, %, etc., they must be URL-encoded
// @ = %40, # = %23, % = %25, etc.
const uri = process.env.MONGODB_URI || 'mongodb+srv://shajibislam3004:jm5mo3ag3dLvtSP1@cluster-1.lnfudjh.mongodb.net/?appName=Cluster-1';
const dbName = process.env.MONGODB_DB_NAME || 'sahin-chemistry';

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Helper function to get database
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

// Helper function to get collections
export async function getCollection<T extends Document>(collectionName: string) {
  const db = await getDatabase();
  return db.collection<T>(collectionName);
}

