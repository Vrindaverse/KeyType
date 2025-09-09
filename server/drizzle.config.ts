const config = {
  schema: "./drizzle/schema",
  out: "./drizzle/migrations",
  driver: "pg" as any, // bypass type checking
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  } as any,
};
export default config;
