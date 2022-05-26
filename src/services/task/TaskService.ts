import Task from '../../models/TaskModel';

interface TaskIdRequest {
    task_id: string;
}

interface TaskCreateRequest {
    name: string;
    repeatble: boolean;
    category_id: string;
    start_date: Date;
}

interface ByDateRequest {
    date: string;
}

interface TaskCategoryRequest {
    category_id: string;
}
class TaskService {
    async create({ name, repeatble, category_id, start_date }: TaskCreateRequest) {
        if (!name || !repeatble || !category_id || !start_date) throw new Error('Bad Request !');
        const task = await Task.create({ name, repeatble, category_id, start_date });
        return { task: task };
    }

    async listByDate({ date }: ByDateRequest) {
        if (!date) throw new Error('Bad Request !');
        // const dtFilter = new Date(parseInt(ano), parseInt(mes)-1,parseInt(dia));
        
        const dtInicio = new Date(`${date}`);
        const dtFim = new Date(`${date}T01:01`);
        const list = await Task.find({ start_date: { $gte: dtInicio, $lt: dtFim } });
        return { list: list, dt_inicio: dtInicio, dt_fim: dtFim };
    }

    async listByCategory({ category_id }: TaskCategoryRequest) {
        if (!category_id) throw new Error('Bad Request !');
        const list = await Task.find({ category_id }).populate('category_id');

        return { list: list }
    }
}

export { TaskService }