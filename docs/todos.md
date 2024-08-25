# TODO

- CI/CD環境の構築
- Visual Regression Testの導入
- Playwright等によるE2Eテスト
- ID降順に並び替えて表示
- ScaffDogなどを使ったファイルのscaffold
- `Completed`のページに`status: done`のものを表示する
- register/update/remove処理の共通化
- updatedAtに入れるタイミングを意識しなくていいように、atomに変化があった時、常に更新するようにする

## バックエンド実装後について

今回はバックエンドのmock代わりにNext.jsのRoute Handlersを使っています。  
APIの実装もNext.jsで行うならばこのまま再利用すればいいが、必ずしもバックエンドにこれを使うとは限りません。  
もし異なるサーバー上とのやり取りが発生する場合は、そのドメイン名を`.env`ファイルに定義し、`/api/*`で始まるコードの先頭につけて実行するようにしてください。  
例) [GET]`/api/tasks`を`https://api.example.com`から取得する場合

```
// .env
NEXT_PUBLIC_API_ENDPOINT_URL=https://api.example.com
```

```ts
`${NEXT_PUBLIC_API_ENDPOINT_URL}/api/tasks`
```

※Next.jsではClientサイドで実行される場合、定義する環境変数はprefixとして`NEXT_PUBLIC_`をつける必要があります。  
[Bundling Environment Variables for the Browser](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser)


## FIXME

- JotaiとMSWを組み合わせてStorybook上で実行するとうまく動かないことがある。  
  Storybook上の画面の更新やplayのrerunで正常に動くことは確認しているが、Vitest上ではうまくplayできないことの方が多い。  
  回避策としてユーザーインタラクションを伴う結合テストレベルの操作をVitest上で再現することで正常に動くことを確認している。  