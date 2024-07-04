import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { PairPrice } from './pair-prices/entities/pair-price.entity';

const config: Options = {
  driver: PostgreSqlDriver,
  dbName: 'bitcoin',
  user: 'user',
  password: 'password',
  host: 'localhost',
  port: 5432,
  entities: [PairPrice],
  migrations: {
    tableName: 'pair_price', // Nombre de la tabla para almacenar las migraciones
    path: './src/migrations', // Ruta al directorio con los archivos de migración
    transactional: true, // Indica si las migraciones deben ejecutarse en transacciones
    disableForeignKeys: true, // Deshabilita las claves foráneas durante las migraciones (opcional)

  },
  debug: true
};

export default config;
