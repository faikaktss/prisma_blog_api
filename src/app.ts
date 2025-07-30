import express from 'express';
import dotenv from 'dotenv';
import categoryRoutes from './routers/categoryRoutes.js';
import postsRoutes from './routers/postsRoutes.js';
import commentsRoutes from './routers/commentsRoutes.js';
import tagRoutes from './routers/TagRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/posts',postsRoutes);
app.use('/api/comments',commentsRoutes);
app.use('/api/tags',tagRoutes);

app.listen(process.env.PORT ||3000 ,()=>{
    console.log('Sunucu ayakta');
})