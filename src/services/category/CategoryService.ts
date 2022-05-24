interface CategoryRequest{
    name: string;
}
class CategoryService{
    async create({name}: CategoryRequest){
        return {create: name};
    }

    async read({name}: CategoryRequest){
        return {read: name};
    }

    async update({name}: CategoryRequest){
        return {update: name}
    }

    async delete({name}: CategoryRequest){
        return {delete: name}
    }
}

export {CategoryService}