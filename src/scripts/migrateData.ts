// migrateData.ts
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import clientPromise from '../lib/mongodb.ts';

async function migrateData() {
  try {
    console.log('Starting data migration...');

    const client = await clientPromise;
    const db = client.db('bie-website');
    console.log('Connected to MongoDB');

    const users = db.collection('users');

    // Set status for existing users who don't have one
    const updateResult = await users.updateMany(
      { status: { $exists: false } },
      { $set: { status: 'active' } }
    );
    console.log(`Updated ${updateResult.modifiedCount} users to set status to 'active'.`);

    // upsert superadmin with proper ObjectId
    const superadminId = new ObjectId();
    await users.updateOne(
      { email: 'admin@bie-website.com' },
      {
        $setOnInsert: {
          _id: superadminId,
          name: 'Super Admin',
          username: 'superadmin',
          email: 'admin@bie-website.com',
          password: await bcrypt.hash('admin123', 12),
          role: 'superadmin',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    // upsert admin with proper ObjectId
    const adminId = new ObjectId();
    await users.updateOne(
      { email: 'content@bie-website.com' },
      {
        $setOnInsert: {
          _id: adminId,
          name: 'Content Admin',
          username: 'contentadmin',
          email: 'content@bie-website.com',
          password: await bcrypt.hash('content123', 12),
          role: 'admin',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    console.log('Migration completed! Users ensured with proper ObjectIds and active status.');
    console.log('Superadmin ID:', superadminId.toString());
    console.log('Admin ID:', adminId.toString());
  } catch (error: any) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// ESM-safe run
(async () => {
  await migrateData();
  process.exit(0);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});