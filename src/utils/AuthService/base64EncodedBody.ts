const base64EncodedBody = (email: string, password: string) => {
  return Buffer.from(`${email}:${password}`, "base64");
};

export default base64EncodedBody;
