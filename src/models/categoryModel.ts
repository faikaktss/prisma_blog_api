import prisma from '../config/database.js';
import { SHOW_DELETED } from '../constant.js';

export const getAllCategories = (showDeleted:string)=>{
    const queryList: any[] = [];
    if(showDeleted === SHOW_DELETED.True){
        queryList.push({deleted_at:{not : null}});
    }else if(showDeleted !== SHOW_DELETED.False){
        queryList.push({deleted_at:null});
    }


    return prisma.category.findMany({
        where:{
            AND: [...queryList]
        }
    });
}

export const getCategoryById = (id: number) => {
    return prisma.category.findUnique({where:{id}});
}


export const createCategory = (body:object) =>{
    return prisma.category.create({data:body});
}

export const updateCategory = (id:number , data:object) =>{
    return prisma.category.update({
        where : {id},
        data: data
    })
}

export const deleteCategory = (id:number) =>{
    return prisma.category.update({
        where:{id},
        data: {deleted_at: new Date()}
    })
}