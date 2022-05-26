import Category from '../../models/CategoryModel';
import Task from '../../models/TaskModel';

//#region 
interface CategoryRequest {
    name: string;
    icon: string;
}

interface UpdateCategoryRequest {
    name: string;
    category_id: string;
}

interface CategoryIdRequest {
    category_id: string;
}

//#endregion

class CategoryService {
    async create({ name, icon }: CategoryRequest) {
        if (!name) throw new Error("Bad Request !");
        const exist = await Category.findOne({ name });
        if (exist) throw new Error("Category already exists !");

        const category = await Category.create({ name, icon });

        return { category: category };
    }

    async listAll() {
        return { list: await Category.find() }
    }

    async update({ name, category_id }: UpdateCategoryRequest) {
        if (!name) throw new Error("Bad Request !");

        const exists = await Category.findOne({ name });

        if (exists) throw new Error(`Category: ${name} already exists !`);

        const category = await Category.findById(category_id);

        if (!category) throw new Error("Bad Request !");

        category.name = name;

        const ret = await Category.updateOne({ _id: category_id }, category);

        return { category: ret }
    }

    async delete({ category_id }: CategoryIdRequest) {
        if (!category_id) throw new Error("Bad Request !");
        const category = await Category.findById(category_id);

        if (!category) throw new Error('Bad Request !');
        const exists = await Task.findOne({ category_id: category_id });
        console.log(exists);
        
        if (exists) throw new Error(`Category: ${category.name} have tasks references !`);

        const del = await Category.deleteOne({ _id: category_id })

        return { delete_object: del }
    }
}

export { CategoryService }