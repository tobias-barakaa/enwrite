// controllers/articleUploadController.js
import cloudinary from '../../../utils/cloudinary';
import knex from '../../../db/db';


import { Request, Response } from 'express';

export const uploadArticleFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { article_id, user_id } = req.body;
      const uploaded_by = (req.user as any)?.userId;
  
      // Validate the request parameters
      if (!article_id || !user_id) {
        res.status(400).json({ error: 'article_id and user_id are required' });
        return;
      }
  
      // Check if a file is uploaded
      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }
  
      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const fileUrl = result.secure_url;
      const publicId = result.public_id;
  
      // Insert the file record into the database
      const [fileRecord] = await knex('article_upload')
        .insert({
          file_url: fileUrl,
          public_id: publicId,
          recipient_id: user_id,
          uploaded_by: uploaded_by,
          order_article_id: article_id,
          status: 'Processing',
        })
        .returning('*');
  
      // Respond with the inserted record's ID and file URL
      res.json({ id: fileRecord.id, fileUrl: fileRecord.file_url });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  };
  


 
// const getUploadedArticleFiles = async (req, res) => {
//   try {
//     // Extract user information
//     const recipient_id = req.user?.userId;
//     const userRole = req.user?.role;
//     console.log(recipient_id, 'this is recipient_id', userRole, 'this is userRole')

//     // Ensure the user is logged in
//     if (!recipient_id) {
//       return res.status(400).json({
//         status: 400,
//         error: 'Bad Request',
//         message: 'User ID is required. Please ensure you are logged in and try again.',
//         type: 'Client Error'
//       });
//     }

//     // Base query to fetch uploaded article files
//     let query = knex('article_upload')
//       .where({ recipient_id }) // Filter by recipient_id to match the logged-in user
//       .join('create', 'article_upload.article_id', 'create.id') // Join with the 'create' table (articles)
//       .select(
//         'article_upload.id as file_id',
//         'article_upload.file_url',
//         'article_upload.public_id',
//         'article_upload.recipient_id',
//         'article_upload.uploaded_by',
//         'article_upload.article_id',
//         'article_upload.created_at',
//         'create.title',
//         'create.description',
//         'create.keywords',
//         'create.complexity',
//         'create.word_count',
//         'create.duration',
//         'create.quantity',
//         'create.language',
//         'create.cost',
//         'create.status',
//         'create.created_at as article_created_at',
//         'create.updated_at as article_updated_at'
//       );

//     // For non-admin users, restrict the columns further
//     // if (userRole !== 'admin') {
//     //   query = query.select('article_upload.article_id'); // Limit columns for non-admins
//     // }

//     // Execute the query
//     const files = await query;

//     // Check if any files are found
//     if (files.length === 0) {
//       return res.status(404).json({
//         status: 404,
//         error: 'Not Found',
//         message: 'No files found for the specified user.',
//         type: 'Client Error'
//       });
//     }

//     // Return the result as a JSON response
//     res.json(files);
//   } catch (error) {
//     console.error('Error fetching uploaded files:', error);

//     // Handle unexpected errors gracefully
//     res.status(500).json({
//       status: 500,
//       error: 'Internal Server Error',
//       message: 'An unexpected error occurred while fetching the uploaded files. Please try again later.',
//       type: 'Server Error'
//     });
//   }
// };

