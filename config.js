/**
 * Normally, it should be filled with environment variables or any other configuration system available depending on target server.
 * However, here we do not need this much complexity so we remain simple and hard coded.
 *
 * @typedef {{app: AppConfig, db: DBConfig}} Config
 * @typedef {{interface: string, port: number}} AppConfig
 * @typedef {{database: string, password: string, port: number, host: string, user: string}} DBConfig
 *
 * @return {Config}
 */
export default function loadConfig() {
  return {
    app: {
      interface: "http://localhost",
      port: 3000
    },
    db: {
      host: 'localhost',
      user: 'babyfoot',
      password: 'babyfoot',
      database: 'babyfoot',
      port: 5432,
    }
  }
}