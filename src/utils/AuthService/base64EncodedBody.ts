const base64EncodedBody = (email: string, password: string) => {
  return btoa(`${email}:${password}`);
};

export default base64EncodedBody;
