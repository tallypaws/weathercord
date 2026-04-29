export const getHost = () => typeof window === "undefined" ? process.env.PROD_HOST ?? "http://localhost:3000" : location.host;
