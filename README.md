# 環境構築

- [pnpm](https://pnpm.io/ja/)を使用します。  
インストールしていない場合はインストールしてください。  
インストール方法は問いません。

- 依存関係をインストールします。

  ```bash
  pnpm install
  ```

## 開発環境

### 起動

```bash
pnpm dev
```

### テスト

- 監視モードでテストを実行
  ```bash
  pnpm test:watch
  ```

- ファイルを指定して監視モードでテストを実行

  ```bash
  pnpm test:watch /path/to/foo.test.tsx
  ```

- 全ファイルに対しテストを実行
  ```bash
  pnpm test
  ```

### Storybook

```bash
pnpm storybook
```


