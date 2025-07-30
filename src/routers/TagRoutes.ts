import { Router } from "express";
import{listTags,getTags,addTags,editTags,removeTags} from '../controllers/tagController.js';
import { addPostTag, removePostTag } from "../controllers/postsControlerr.js";


const router = Router();

router.get('/',listTags);
router.get('/:id',getTags);
router.post('/',addTags);
router.put('/:id',editTags);
router.delete('/:id',removeTags);
router.post('/:id/tags',addPostTag);
router.delete('/:id/tags',removePostTag);


export default router