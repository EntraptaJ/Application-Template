import './setup';
import { createConnection } from 'typeorm';
import { getConnectionArgs } from 'API/Library/getDbConnection';

export default async function() {
  const connection = await createConnection(getConnectionArgs(true));
  await connection.dropDatabase();
  await connection.synchronize();
  await connection.close();
}
