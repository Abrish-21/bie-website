const { execSync } = require('child_process');
const path = require('path');

console.log('Running data migration...');

try {
  // Run the TypeScript migration script
  execSync('npx ts-node src/scripts/migrateData.ts', {
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('Migration completed successfully!');
} catch (error) {
  console.error('Migration failed:', error.message);
  process.exit(1);
}

