import { GetServerSideProps } from 'next';
import clientPromise from '../lib/mongodb';

interface TestMongoProps {
  isConnected: boolean;
  postCount: number;
}

export default function TestMongo({ isConnected, postCount }: TestMongoProps) {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">MongoDB Connection Test</h1>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <strong>Database Connection:</strong> {isConnected ? 'Connected to MongoDB' : 'NOT connected to MongoDB'}
          </div>
          
          <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
            <strong>Posts in Database:</strong> {postCount}
          </div>
          
          <div className="p-4 bg-gray-100 text-gray-800 rounded-lg">
            <strong>Connection String:</strong> {process.env.MONGODB_URI ? 'Set' : 'Not set'}
          </div>
        </div>
        
        <div className="mt-8">
          <a href="/" className="text-blue-600 hover:text-blue-800">← Back to Homepage</a>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("bie-website");
    
    // Test the connection by counting posts
    const postCount = await db.collection("posts").countDocuments();
    
    return {
      props: {
        isConnected: true,
        postCount,
      },
    };
  } catch (e) {
    console.error('MongoDB connection test failed:', e);
    return {
      props: {
        isConnected: false,
        postCount: 0,
      },
    };
  }
};

