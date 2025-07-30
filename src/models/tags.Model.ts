import prisma from '../config/database.js';


export const getAllTags = (showDeleted : string, status : string, category:number) =>{
    return prisma.tag.findMany();
}

export const getTagsId = (id:number)=>{
    return prisma.tag.findUnique({where:{id}});
}

export const createTags = (body:object) =>{
    return  prisma.tag.create({data:body})
}
export const updateTags = (id:number, data:object) =>{
    return  prisma.tag.update({
        where: {id},
        data:data
    })
}

export const deleteTags = (id:number) =>{
    return prisma.tag.delete({where:{id}});
}