import { request, Request, Response } from "express";
import {getAllTags,getTagsId,createTags ,updateTags,deleteTags} from "../models/tags.Model.js";

export const listTags = async(req:Request,res:Response) =>{
    try {
        const{showDeleted, status,category} = req.query;
        const item = await getAllTags(showDeleted as string, status as string, Number(category));
        res.status(200).json(item);
    } catch (error) {
        console.log(error);
        res.status(404).json({message:'kategoriler listelenemedi'});
    }
}

export const getTags = async(req:Request,res:Response) =>{
    try {
        const {id} = req.params;
        const item = await getTagsId(Number(id));
        if(!item){
            res.status(404).json({message:'Kategori bulunamadi'});
        }else{
            res.json(item);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({message:'Kategori bulunamadi'})
    }
}


export const addTags = async(req:Request,res:Response) =>{
    try {
        const newİtem = await createTags(req.body);
        res.status(201).json(newİtem);
    } catch (error) {
        console.log(error);
        res.status(400).json({message:'Kategori bulunamadi'})
    }
}

export const editTags = async(req:Request,res:Response) =>{
    try {
        const {id} = req.params;
        const editİtem = await updateTags(Number(id),req.body);
        res.status(201).json(editİtem);
    } catch (error) {
        console.log(error);
        res.status(404).json({message:'Kategori bulunamadi'});
    }
}

export const removeTags  = async(req:Request,res:Response) =>{
    try {
        const {id}  = req.params;
        const removeİtem = await deleteTags(Number(id));
        res.json(removeİtem);
    } catch (error) {
        console.log(error);
        res.status(405).json({message:'Kategori bulunamadi'});
    }
}