// controllers/articleUploadController.js
import cloudinary from '../../../utils/cloudinary';
import knex from '../../../db/db';
import PDFParser from 'pdf-parse';
import axios from 'axios';


import { Request, Response } from 'express';
import { AuthenticatedRequest, UploadedArticle } from '../../../types/orderArticleType';

interface RequestUser {
    userId: string;
    role?: string;
  }
  
  export const uploadArticleFile = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('everything here.:', req.body);
      const { article_id, user_id, status } = req.body;
      // const uploaded_by = (req.user as unknown as RequestUser)?.userId;
      const uploaded_by = req.user?.id;
      console.log('uploaded by', uploaded_by);
  
      // Validate all required fields
      if (!article_id || !user_id || !uploaded_by) {
        res.status(400).json({ 
          error: 'Missing required fields', 
          details: {
            article_id: !article_id ? 'Missing article_id' : null,
            user_id: !user_id ? 'Missing user_id' : null,
            uploaded_by: !uploaded_by ? 'User not authenticated' : null
          }
        });
        return;
      }
  
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(article_id) || !uuidRegex.test(user_id) || !uuidRegex.test(uploaded_by)) {
        res.status(400).json({ 
          error: 'Invalid UUID format', 
          details: {
            article_id: !uuidRegex.test(article_id) ? 'Invalid article_id format' : null,
            user_id: !uuidRegex.test(user_id) ? 'Invalid user_id format' : null,
            uploaded_by: !uuidRegex.test(uploaded_by) ? 'Invalid uploaded_by format' : null
          }
        });
        return;
      }
  
      // Check if a file is uploaded
      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }
  
      // Verify the file exists and has a path
      if (!req.file.path) {
        res.status(400).json({ error: 'Invalid file upload' });
        return;
      }
  
      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      
      if (!result || !result.secure_url || !result.public_id) {
        res.status(500).json({ error: 'Failed to upload file to Cloudinary' });
        return;
      }
  
      // Insert the file record into the database
      const [fileRecord] = await knex('article_upload')
        .insert({
          file_url: result.secure_url,
          public_id: result.public_id,
          recipient_id: user_id,
          uploaded_by: uploaded_by,
          order_article_id: article_id,
          status: 'Processing',
        })
        .returning('*');
  
      if (!fileRecord) {
        res.status(500).json({ error: 'Failed to create database record' });
        return;
      }
  
      res.json({ 
        id: fileRecord.id, 
        fileUrl: fileRecord.file_url,
        status: fileRecord.status
      });
  
    } catch (error) {
      console.error('Upload error:', error);
      
      // Provide more specific error messages based on the error type
      if (error instanceof Error) {
        if (error.message.includes('foreign key constraint')) {
          res.status(400).json({ 
            error: 'Invalid reference', 
            details: 'One or more IDs do not reference existing records' 
          });
          return;
        }
      }
      
      res.status(500).json({ 
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };


 



export const getUploadedArticles = async (req: Request, res: Response): Promise<void> => {    
    try {
      const recipient_id = req.user?.id;
  
      if (!recipient_id) {
        res.status(400).json({
          status: 400,
          error: 'Bad Request',
          message: 'User ID is required. Please ensure you are logged in and try again.',
          type: 'Client Error',
        });
      }
  
      const query = knex<UploadedArticle>('article_upload')
        .where('article_upload.recipient_id', recipient_id)
        .join('order_article', 'article_upload.order_article_id', 'order_article.id')
        .select({
          file_id: 'article_upload.id',
          file_url: 'article_upload.file_url',
          public_id: 'article_upload.public_id',
          recipient_id: 'article_upload.recipient_id',
          uploaded_by: 'article_upload.uploaded_by',
          order_article_id: 'article_upload.order_article_id',
          created_at: 'article_upload.created_at',
          title: 'order_article.title',
          description: 'order_article.description',
          keywords: 'order_article.keywords',
          complexity: 'order_article.complexity',
          word_count: 'order_article.word_count',
          duration: 'order_article.duration',
          quantity: 'order_article.quantity',
          language: 'order_article.language',
          cost: 'order_article.cost',
          status: 'order_article.status',
          article_created_at: 'order_article.created_at',
          article_updated_at: 'order_article.updated_at',
        });
      const files = await query;
  
      if (files.length === 0) {
        res.status(404).json({
          status: 404,
          error: 'Not Found',
          message: 'No files found for the specified user.',
          type: 'Client Error',
        });
      }
  
      res.status(200).json({
        status: 200,
        data: files,
        message: 'Files retrieved successfully',
        type: 'Success',
      });
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
  
      res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: 'An unexpected error occurred while fetching the uploaded files. Please try again later.',
        type: 'Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };




  export const getPDFContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const recipient_id = req.user?.id;
  
      if (!recipient_id) {
        res.status(400).json({
          status: 400,
          error: 'Bad Request',
          message: 'User ID is required. Please ensure you are logged in.',
          type: 'Client Error',
        });
        return;
      }
  
      // Get the article details from the database
      const articles = await knex('article_upload')
        .join('order_article', 'article_upload.order_article_id', 'order_article.id')
        .where({
          'article_upload.recipient_id': recipient_id
        })
        .select('article_upload.file_url', 'order_article.title');
  
      if (!articles.length) {
        res.status(404).json({
          status: 404,
          error: 'Not Found',
          message: 'No articles found for this user.',
          type: 'Client Error',
        });
        return;
      }
  
      // Initialize an array to hold the PDF contents
      const pdfContents = [];
  
      // Loop through the articles and fetch the PDF content for each
      for (const article of articles) {
        const response = await axios.get(article.file_url, {
          responseType: 'arraybuffer'
        });
  
        const data = await PDFParser(response.data);
        pdfContents.push({
          title: article.title,
          content: data.text,
          fileUrl: article.file_url
        });
      }
  
      res.status(200).json({
        status: 200,
        data: pdfContents,
        message: 'PDF content extracted successfully',
        type: 'Success',
      });
  
    } catch (error) {
      console.error('Error extracting PDF content:', error);
      res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: 'Failed to extract PDF content',
        type: 'Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
  