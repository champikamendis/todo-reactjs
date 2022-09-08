import axios from 'axios';

export const fetchMyTodos = async () => {
    const res = await axios.get('http://localhost:8000/dev/todo/fetchMyTodos');
    console.log("Fetched data:", res.data)

    return res.data;
}

export const addTodo = async (name, _id) => {
    const res = await axios.post('http://localhost:8000/dev/todo/add', {
        _id,
        name,
    });

    return res.data;
}

export const updateTodo = async (_id, name) => {
    console.log("idddddddd", _id);
    console.log("name", name);
    const res = await axios.put('http://localhost:8000/dev/todo/edit', {
        _id,
        name,
    });

    return res.data;
}

export const deleteTodo = async (_id) => {
    console.log(_id);
    const res = await axios.delete(`http://localhost:8000/dev/todo/delete/${_id}`);
    console.log(res.data);
    return res.data;
}