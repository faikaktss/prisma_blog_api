import prisma from '../config/database.js';

export const getAllComment = (commenter:string, post:number) =>{
    return prisma.comment.findMany();
}

export const getCommentId = (id:number)=>{
    return prisma.comment.findUnique({where:{id}});
}

export const createComment = (body:object) =>{
    return prisma.comment.create({data:body});
}

export const updateComment = (id:number, data:object) =>{
    return prisma.comment.update({
        where: {id},
        data: data
    })
}

export const deleteComment = (id:number) =>{
    return prisma.comment.delete({where:{id}});
}