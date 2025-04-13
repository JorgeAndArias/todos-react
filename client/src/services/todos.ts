import axios from "axios";
import { Todo, NewTodo, UpdateTodo } from "../types/types";

const apiBaseUrl = '/api';

export const getTodos = async () => {
  const { data } = await axios.get<Todo[]>(`${apiBaseUrl}/todos`);
  return data;
};

export const createTodo = async (todo: NewTodo) => {
  const { data } = await axios.post<Todo>(`${apiBaseUrl}/todos`, todo);
  return data;
}

export const update = async (todo: UpdateTodo) => {
  const { data } = await axios.put(`${apiBaseUrl}/todos/${todo.id}`, todo);
  return data;
}

export const remove = async (id: number) => {
  const { data } = await axios.delete(`${apiBaseUrl}/todos/${id}`);
  return data;
};
