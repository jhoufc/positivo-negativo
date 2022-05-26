import {Request, Response} from 'express';
import {CategoryService} from '../../services/category/CategoryService';

const categoryService = new CategoryService();


class CategoryController {
    async create(req: Request, res: Response){
        const {name, icon} = req.body;

        const category = await categoryService.create({name, icon});
        return res.json(category)
    }

    async listAll(req: Request, res: Response){
        return res.json(await categoryService.listAll());
    }

    async update(req: Request, res: Response){
        const {name, category_id} = req.body;

        return res.json(await categoryService.update({name, category_id}));
    }

    async delete(req: Request, res: Response){
        const {category_id} = req.body;
        return res.json(await categoryService.delete({category_id}));
    }
}

export {CategoryController}