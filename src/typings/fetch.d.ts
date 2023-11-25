declare module "./fetchmethod.js" {
     function customFetch(
          endpoint: string,
          fetchMethod: string,
          ContentType?: string,
          body?: any
     ): Promise<any>; // Define the types as needed
     export = customFetch;
}
