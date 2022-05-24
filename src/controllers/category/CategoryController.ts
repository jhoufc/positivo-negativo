import {Request, Response} from 'express';
import {CategoryService} from '../../services/category/CategoryService';

const categoryService = new CategoryService();


class CategoryController {
    async create(req: Request, res: Response){
        const {name} = req.body;

        const category = await categoryService.create({name});
        return res.json(category)
    }

    async read(req: Request, res: Response){
        const {name} = req.body;

        const category = await categoryService.read({name});

        return res.json(category);
    }

    async update(req: Request, res: Response){
        const {name} = req.body;

        const category = await categoryService.update({name});

        return res.json(category);
    }

    async delete(req: Request, res: Response){
        const {name} = req.body;

        const category = await categoryService.delete({name});

        return res.json(category);
    }
}

export {CategoryController}