export class LocalstorageService {
  get(key: string) {
    return localStorage.getItem(key);
  }
  set(key: string, value: string) {
    return localStorage.setItem(key, value);
  }
}

const localStorageService = new LocalstorageService();
export default localStorageService;
