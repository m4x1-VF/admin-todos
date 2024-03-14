import { Todo } from "@prisma/client";

const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  //await sleep(2);
  const body = { complete };
  const response = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const todo = await response.json();
  return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const todo = await response.json();
  return todo;
};

export const deleteCompletedTodos = async (): Promise<void> => {
  const response = await fetch("/api/todos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const todo = await response.json();
  return todo;
};
