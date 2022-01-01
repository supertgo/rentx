/* eslint-disable no-console */
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

import createConnection from '../index';

async function create() {
  const connection = await createConnection();
  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdimin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXXXX')
    `
  );

  await connection.close();
}

create().then(() => console.log('Admin user created'));
