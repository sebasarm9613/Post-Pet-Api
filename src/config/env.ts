process.loadEnvFile();
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  NODE_ENV: get('NODE_ENV').required().asString(),
  PASSWORD_DATABASE: get('PASSWORD_DATABASE').required().asString(),
  USERNAME_DATABASE: get('USERNAME_DATABASE').required().asString(),
  DATABASE: get('DATABASE').required().asString(),
  PORT_DATABASE: get('PORT_DATABASE').required().asPortNumber(),
  HOST_DATABASE: get('HOST_DATABASE').required().asString(),
  JWT_KEY: get('JWT_KEY').required().asString(),
  JWT_EXPIRE_IN: get('JWT_EXPIRE_IN').required().asString(),
};
