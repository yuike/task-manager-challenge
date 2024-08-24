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
        title: "Lorem ipsum dolor sit amet",
        status: "done",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
        deadline: "2025-01-01",
        createdAt: "2023-01-02 12:00:00",
        updatedAt: "2023-01-02 12:00:00",
      },
    ],
  })
}

/**
 * 新規タスクを1件登録する
 */
export async function POST(request: Request) {
  // do something
  console.log("New task", await request.json())
  return Response.json({
    status: 200,
    message: "success",
  })
}
