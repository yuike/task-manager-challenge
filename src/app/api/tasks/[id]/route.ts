import type { NextRequest } from "next/server"

interface Params {
  params: {
    id: number
  }
}

export async function GET(_request: Request, { params }: Params) {
  return Response.json({
    status: 200,
    message: "success",
    task: {
      id: params.id,
      title: "吾輩は猫である",
      status: "todo",
      deadline: "2025-01-01",
      description:
        "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。",
      createdAt: "2023-01-01 12:00:00",
      updatedAt: "2023-01-01 12:00:00",
    },
  })
}

export async function PUT(request: Request, { params }: Params) {
  const body = await request.json()
  console.log("PUT", body)
  // do something
  return Response.json({
    status: 201,
    message: "success",
    task: body,
  })
}
