import { request, Request, Response } from "express";
import { getAllPosts, getPostsId, createPosts,updatePosts,deletePosts} from "../models/postModels.js";
import { getTagsId } from "../models/tags.Model.js";
import { createPostTag, deletePostTag } from "../models/postTag.Model.js";

export const listPosts = async(req:Request,res:Response) =>{
    try {
        const{showDeleted, status,category,tags} = req.query;
        const posts = await getAllPosts(showDeleted as string, status as string, Number(category),tags as string);;
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(404).json({message:'kategoriler listelenemedi'});
    }
}

export const getPosts = async(req:Request,res:Response) =>{
    try {
        const {id} = req.params;
        const posts = await getPostsId(Number(id));
        if(!posts){
            res.status(404).json({message:'Kategori bulunamadi'});
        }else{
            res.json(posts);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({message:'Kategori bulunamadi'})
    }
}


export const addPosts = async(req:Request,res:Response) =>{
    try {
        const newPosts = await createPosts(req.body);
        res.status(201).json(newPosts);
    } catch (error) {
        console.log(error);
        res.status(400).json({message:'Kategori bulunamadi'})
    }
}

export const editPosts = async(req:Request,res:Response) =>{
    try {
        const {id} = req.params;
        const editPosts = await updatePosts(Number(id),req.body);
        res.status(201).json(editPosts);
    } catch (error) {
        console.log(error);
        res.status(404).json({message:'Kategori bulunamadi'});
    }
}

export const removePosts = async(req:Request,res:Response) =>{
    try {
        const {id}  = req.params;
        const removePost = await deletePosts(Number(id));
        res.json(removePost);
    } catch (error) {
        console.log(error);
        res.status(405).json({message:'Kategori bulunamadi'});
    }
}

export const addPostTag = async(req:Request,res:Response) =>{
    try {
        const {id} = req.params;
        const{tagId} = req.body;
        const newItem = createPostTag(Number(id),tagId);
        res.json(newItem);
    } catch (error) {
        console.log(error);
        res.status(400).json({message:'Tag eklenemedi'});
    }
}


export const removePostTag = async(req:Request,res:Response) =>{
    try {
        const {id } = req.params;
        const{tagId} = req.body;
        const Deleted_Item = deletePostTag(Number(id), tagId);
        res.json(Deleted_Item);
    } catch (error) {
        console.log(error);
        res.status(402).json({message:'Tag silinemedi'});
    }
}