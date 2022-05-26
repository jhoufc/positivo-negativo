import { TaskService } from '../../services/task/TaskService';
import { Request, Response } from 'express';
const taskService = new TaskService();

class TaskController {
    async create(req: Request, res: Response) {
        const { name, repeatble, category_id, start_date } = req.body;

        return res.json(await taskService.create({ name, repeatble, category_id,start_date}));

    }

    async listByDate(req: Request, res: Response) {
        const {date} = req.body;
        
        return res.json(await taskService.listByDate({date}));
    }

    async listByCategory(req: Request, res: Response){
        const {category_id} = req.body;

        return res.json(await taskService.listByCategory({category_id}));
    }
}

export { TaskController };