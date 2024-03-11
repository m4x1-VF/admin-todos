import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as yup from "yup";
import { Todo } from "@prisma/client";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  return await prisma.todo.findFirst({
    where: {
      id,
    },
  });
};

export async function GET(request: Request, segments: Segments) {
  const { id } = segments.params;
  const todo = await getTodo(id);
  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, segments: Segments) {
  const { id } = segments.params;
  const todo = await getTodo(id);
  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  try {
    const { description, complete } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        description,
        complete,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error: any) {
    return NextResponse.json({ error: error.errors }, { status: 400 });
  }
}
