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




 export interface RequestUser {
    userId: string;
    role: string;
  }
  
export  interface UploadedArticle {
    file_id: string;
    file_url: string;
    public_id: string;
    recipient_id: string;
    uploaded_by: string;
    article_id: string;
    created_at: Date;
    title: string;
    description: string;
    keywords: string[];
    complexity: string;
    word_count: number;
    duration: string;
    quantity: number;
    language: string;
    cost: number;
    status: string;
    article_created_at: Date;
    article_updated_at: Date;
  }

  export interface AuthenticatedRequest extends Request {
    user?: RequestUser;
  }