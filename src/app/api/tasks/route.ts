/**
 * タスク一覧を取得する
 */
export async function GET() {
  return Response.json({
    tasks: [
      {
        id: 1,
        title: "ポラーノの広場",
        status: "todo",
        deadline: "2025-01-01",
        description:
          "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
        createdAt: "2023-01-01 12:00:00",
        updatedAt: "2023-01-01 12:00:00",
      },
      {
        id: 2,
        title: "Task 2",
        status: "inProgress",
        description: "Description 2",
        deadline: "2025-01-01",
        createdAt: "2023-01-02 12:00:00",
        updatedAt: "2023-01-02 12:00:00",
      },
    ],
  })
}

/**
 * タスクを1件登録する
 */
export async function POST(request: Request) {
  // do something
  return Response.json({
    status: 200,
    message: "success",
  })
}
