"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";

export const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(3);
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) {
    throw new Error(`Todo with id ${id} not found`);
  }
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });
  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } });
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (error: any) {
    return { message: "Error creating todo" };
  }
};

export const deleteCompleted = async () => {
  try {
    const todo = await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });
    revalidatePath("/dashboard/server-todos");
    return { message: `You have deleted ${todo.count} todos` };
  } catch (error: any) {
    return { message: "Error deleting todos" };
  }
};
