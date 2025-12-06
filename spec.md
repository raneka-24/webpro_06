#　開発者用仕様書(仮)
## 育てる献立一覧
### 1. データ構造
#### 1.1. 機能
利用者が追加・編集・削除することで成長する献立データを保持し，詳細情報を管理する．
#### 1.2. データ
|| データ型 | 説明 |
|:-|:-|:-|
| id   | number | ID	         　　|
| name | string | 献立名	      　　|
| cal  | number | カロリー	        　|   
| bun  | string | 分類	例: 洋食，主菜 |
| zai  | string | 材料               |
### 2. ページ遷移
| 目的 | リソース名 | HTTPメソッド | 遷移先 |
| :- | :- | :- | :- |
| 一覧表示 | /kondate            | GET  | kondate.ejs      | 
| 新規作成 | /kondate/add        | GET  | kondate_add.ejs  |
| 　追加　 | /kondate	         | POST | /kondate         |
| 詳細表示 | /kondate/:id        | GET  | kondate_s.ejs    |
| 　編集　 | /kondate/edit/:id   | GET  | kondate_edit.ejs |
| 　更新　 | /kondate/update/:id | POST | /kondate         |
| 　削除　 | /kondate/delete/:id | POST | /kondate         |
## ポケモンゲームシリーズ発売履歴管理一覧
### 1. データ構造
#### 1.1. 機能
各ポケモンゲームの発売日，世代，地方，御三家，対応ハードウェアなどの情報を保持し，管理する．
#### 1.2. データ
|| データ型 | 説明 |
|:-|:-|:-|
| id      | number | ID                          |
| hatubai | string | 発売日                       |
| name    | string | ゲームの名称                  |
| sedai   | string | 世代                       　|
| tihou   | string | 舞台となる地方             　　|
| gosanke | string | 最初に選ぶ3匹のポケモン(御三家)　|
| hard    | string | 対応ハードウェア             　|
### 2. ページ遷移
| 目的 | リソース名 | HTTPメソッド | 遷移先 |
|:-|:-|:-|:-|
| 一覧表示 | /pokemon            | GET  | pkdb.ejs      |
| 新規作成 | /pokemon/add        | GET  | pkdb_add.ejs  |
| 　追加　 | /pokemon            | POST | /pokemon      |
| 詳細表示 | /pokemon/:id        | GET  | pkdb_s.ejs    |
| 　編集　 | /pokemon/edit/:id   | GET  | pkdb_edit.ejs |
| 　更新　 | /pokemon/update/:id | POST | /pokemon/:id  |
| 　削除　 | /pokemon/delete/:id | POST | /pokemon      |
## パーカッションの楽器一覧
### 1. データ構造
#### 1.1. 機能
打楽器の日本語名，ローマ字名，楽器のグループ，起源となる地域などの静的な情報を保持し，管理する．
#### 1.2. データ
|| データ型 | 説明 |
|:-|:-|:-|
| id     | number | ID              |
| gzyuon | string | ローマ字名の頭文字 |
| romaji | string | ローマ字名      　|
| name   | string | 日本語名      　　|
| group  | string | 分類さ           |
| region | string | 起源となる地域 　　|
### 2. ページ遷移
| 目的| リソース名 | HTTPメソッド | 遷移先 |
|:-|:-|:-|:-|
| 一覧表示 | /pacas            | GET  | pacas.ejs      |
| 新規作成 | /pacas/add        | GET  | pacas_add.ejs  |
| 　追加　 | /pacas            | POST | /pacas         |
| 詳細表示 | /pacas/:id        | GET  | pacas_s.ejs    |
| 　編集　 | /pacas/edit/:id   | GET  | pacas_edit.ejs |
| 　更新　 | /pacas/update/:id | POST | /pacas/:id     |
| 　削除　 | /pacas/delete/:id | POST | /pacas         |