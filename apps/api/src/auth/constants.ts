// '1234' is a fallback for local dev only, where docker-compose.yml/
// docker-compose.dev.yml don't set JWT_SECRET. Anything reachable outside
// localhost (see docker-compose.prod.yml) must set a real JWT_SECRET.
export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? '1234',
};
