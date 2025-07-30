import prisma from '../config/database.js';


export const createPostTag = (postId:number,tagId:number) =>{
    return prisma.postTag.create({ data: { post_id: postId, tag_id: tagId } })
}


export const deletePostTag = (postId:number,tagId:number) =>{
    return prisma.postTag.delete({
        where:{
            post_id_tag_id:{
                post_id:postId,
                tag_id:tagId
            }
        }
    });
}