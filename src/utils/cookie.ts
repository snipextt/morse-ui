export class Cookie {
  static get(key: string) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(key));
    if (cookie) {
      return cookie.split("=")[1];
    }
  }
  static set(key: string, value: string) {
    document.cookie = `${key}=${value}`;
  }
}
