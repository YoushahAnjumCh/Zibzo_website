class ApiService {
  private static instance: ApiService;
  private apiUrl: string;

  private constructor() {
    const isDevelopment = process.env.REACT_APP_NODE_ENV === "development";
    const localBaseUrl =
      process.env.REACT_APP_LOCAL_BASE_URL || "http://localhost:4000";
    const serverBaseUrl =
      process.env.REACT_APP_SERVER_BASE_URL ||
      "https://zibzo-server.onrender.com";
    this.apiUrl = isDevelopment ? localBaseUrl : serverBaseUrl;

    if (!this.apiUrl) {
      throw new Error(
        "API URL is not configured. Check your environment variables."
      );
    }
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public getApiUrl(): string {
    return this.apiUrl;
  }

  public getFullUrl(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }
}

export default ApiService;
