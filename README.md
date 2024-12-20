# SC-System Frontend
学校用チャットボットのフロントエンド
## 使用言語・FW
Next.js・React.js・MaterialUI・TypeScript

## 始め方 〜作業をする前に読むこと〜

### 始めてやる方へ

1.担当範囲の確認  
-> まず、チームリーダーにフロントエンドのどの部分を担当すればよいか確認してください  

2.リポジトリのクローン  
-> ターミナルを開き、以下のコマンドを入力してリモートリポジトリの内容をローカルにクローンします：  
```
git clone https://github.com/KTC-Security-Circle/SC-system-frontend.git //ブランチの作成  
cd SC-system-frontend                                                   //ブランチの移動
```
---
3.ブランチの作成・vscodeの起動  
-> ターミナルで以下のコマンドを入力してブランチを作成し、移動します：  
```
git branch                                // ブランチの一覧表示  
git checkout -b  feature/担当内容を英単語で  // ブランチの作成・移動  
code .                                    // VSCodeを開く
```
---
4. VSCode内での環境構築

.envファイルを作成して以下のコードを入力してください。
```
NEXT_PUBLIC_BACKEND_DEV_URL= "http://localhost:7071"
```
---
次に、拡張機能であるdevcontainerをインストールしましょう  
<img width="494" alt="devcontainer" src="https://github.com/user-attachments/assets/694fbf70-a370-4694-a09a-1b18ec5ae2f3">  

画像にある`Reopen in Container`のボタンを押しましょう  
または、左下の青いアイコンを押してコンテナーを開きましょう
> 初回はビルドを挟むので、時間がかかります。 自動で仮想環境が作成され、少し待てば作業環境の構築が完了します。 開発をする際はProjectsからIssueを立てて作業に取り組んでください。

---
### 普段と異なる環境で作業を行う時 
#### リポジトリのクローン  
->ターミナルを開き、以下のコマンドを入力します：  
```
git clone --branch 作成したブランチ名 https://github.com/KTC-Security-Circle/SC-system-frontend.git
```
### 注意点  
以前に、他のPCで作業していた場合、リモートリポジトリとローカルリポジトリの内容が異なることがあります
その場合は、以下のコマンドを実行してください：  
```
git fetch origin                  // リモートリポジトリから変更を取得  
git merge origin/作成したブランチ名  // ローカルブランチにマージ
```
コンフリクトが発生した場合は、自己解決するか連絡すること 

## 自分の変更をコミットする時  
1.ターミナルを開く  
-> VSCodeではなく、ターミナルを極力使用してください  

2.変更のステージングとコミット  
-> 以下のコマンドを入力して変更をステージングし、コミットします：  
```
git add .                         
git status  
git commit -m "作業内容を日本語で入力"  
git push origin 作成したブランチ名
```
### コミットの頻度  
コミットは細かく行ってください  
多くの変更を一度にコミットすると、コミットメッセージからどの変更が何か分かりにくくなります  
以上の手順を参考に作業を進めてください  
初めての方でも簡単にリポジトリをクローンし、ブランチを作成して作業を始めることができます
