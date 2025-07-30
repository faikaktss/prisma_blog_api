import prisma from '../config/database.js';
import { SHOW_DELETED ,POST_STATUS} from '../constant.js';


export const getAllPosts = (showDeleted : string, status : string, category:number , tags:string) =>{
    const queryList: any[] = [];
    if(showDeleted === SHOW_DELETED.True){
        queryList.push({deleted_at:{not : null}});
    }else if(showDeleted !== SHOW_DELETED.False){
        queryList.push({deleted_at:null});
    }

    if(category){
        queryList.push({category_id:category});
    }

    if(status === POST_STATUS.PUBLISHED) {
        queryList.push({published_at:{not:null}});
    }else if(status === POST_STATUS.DRAFT){
        queryList.push({published_at:null});
    }

    const tagIds = tags?.split(',').map(id => Number(id));
    queryList.push({
        tags:{
            some:{
                tag_id:{
                    in:tagIds
                }
            }
        }
    })
    return prisma.post.findMany({
        where:{
            AND: [...queryList]
        }
    });
}

export const getPostsId = (id:number)=>{
    return prisma.post.findUnique({where:{id}});
}

export const createPosts = (body:object) =>{
    return  prisma.post.create({data:body})
}
export const updatePosts = (id:number, data:object) =>{
    return  prisma.post.update({
        where: {id},
        data:data
    })
}

export const deletePosts = (id:number) =>{
    return prisma.post.update({
        where:{id},
        data:{deleted_at:new Date()}
    })
}