export interface OrderArticleRequestBody {
    title: string;
    description: string;
    keywords: string[]; 
    word_count?: string; 
    duration?: string; 
    content_type: string;
    complexity?: "General" | "Advanced" | "Expert";  
    language?: "American English" | "British English" | "Canadian English" | "Australian English"; 
    quantity?: number; 
    cost?: number; 
  }
  
  export interface OrderArticleResponse {
    message: string;
    orderId: number;
  }

  export interface getArticleByIdResponse {
    message: string;
    order: any

  }
  


  export interface OrderArticleErrorResponse {
    message: string;
    error: any; 

  }