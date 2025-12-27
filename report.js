"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
let kondate_g = [
  { id:1,  name:"カレー",    kazu:"６皿分", zai:"・市販のルウ[1/2箱（115g）]・牛肉[（角切り）250g]・玉ねぎ[（中）2個（400g）]・じゃがいも[（中）1・1/2個（230g）]・にんじん[（中）1/2本（100g）]・サラダ油[大さじ1]・水[850ml]・チーズ[適量]", img:"curry.jpg", how:"1.具材を切る．2.具材を炒める．3.煮る．4.ルウを入れて煮込む．"},
  { id:2,  name:"チヂミ",    kazu:"２人分", zai:"・薄力粉[大さじ3]・片栗粉[大さじ1]・ニラ[1/2束]・とろけるスライスチーズ[1枚]・鶏ガラスープの素[小さじ1]・塩[少々]・水[80cc]・ごま油[大さじ1と1/2]・ポン酢しょうゆ[大さじ1]・ごま油[小さじ1]・ラー油[小さじ1]・白いりごま[小さじ2]", img:"tizimi.jpg", how:"1.具材を切る．2.具材と調味料を混ぜる．3.生地を広げ焼く．4.裏返して火が通るまで焼く．"},
  { id:3,  name:"お好み焼き",  kazu:"２人分", zai:"・豚バラ薄切り肉[120g]・サラダ油[大さじ1]・薄力粉[100g]・和風顆粒だし[小さじ1]・水[100cc]・卵[1個]・揚げ玉[大さじ2]・キャベツ[千切り150g]", img:"okonomi.jpg", how:"1.具材を切る．2.具材と調味料を混ぜる．3.生地を広げ焼く．4.裏返して火が通るまで焼く．"},
  { id:4,  name:"オムライス", kazu:"１人分", zai:"・ごはん[どんぶり1杯(200g)]・卵[2個]・ベーコン[2枚]・牛乳[大さじ1]・玉ねぎ[1/4個(50g)]・オリーブオイル[大さじ1]・ケチャップ[大さじ1と1/2]・塩こしょう[少々]", img:"omu.jpg", how:"1.具材を切る．2.玉ねぎとベーコンを炒める．3.ケチャップを入れ炒める．4.ご飯を入れ炒める．5.フライパンを洗うか別のもので卵を流し込み菜箸で大きくかき混ぜながら焼く．"},
  { id:5,  name:"チャーハン", kazu:"１人分", zai:"・ごはん[200g]・長ねぎ[5cm]・溶き卵 [(Mサイズ)1個分]・しょうゆ[小さじ1]・鶏ガラスープの素[小さじ1/2]・塩こしょう[ふたつまみ]・ごま油[大さじ1]", img:"cha-han.jpg", how:"1.具材を切る．2.具材を炒める．3.しんなりしたら溶き卵を入れて炒める．4.卵に火が通ったらごはんを入れて強火で炒める．5.ごはんがほぐれたら調味料を入れ炒め合わせる．"},
  { id:6,  name:"麻婆豆腐",  kazu:"２人分", zai:"・木綿豆腐[1丁]・豚ひき肉[100g]・長ねぎ[1/2本]・にんにく[1かけ]・しょうが[1かけ]・サラダ油[大さじ1]・豆板醤[小さじ1]・ごま油[適量]・細ねぎ(刻み)[適量]・水[200cc]・酒[大さじ1]・鶏ガラスープの素[小さじ1]・砂糖[小さじ1/3]・しょうゆ[大さじ1]・片栗粉[小さじ2]・水[小さじ2]", img:"mabo.jpg", how:"1.具材を切る．2.フライパンに湯をわかし，塩を入れ豆腐を中火で茹でる(約2分)．3.キッチンペーパーでフライパンの水気をふきとる．4.サラダ油を入れて中火で熱し，豚ひき肉を入れてほぐしながら炒め，肉の色が変わるまで炒める．5.ねぎ，にんにく，しょうがを加えて香りが立つまで1分炒める．6.豆板醤を加えて全体がなじむまで1分炒める．7.調味料を加えて煮たったら，ふたをして弱火で7分煮る8.木綿豆腐を入れて2分煮て水溶き片栗粉を溶きながら回し入れ，とろみがつくまで1分程煮る．9.ごま油を回し入れる．"},
];
// 一覧表示
app.get("/kondate", (req, res) => {
  res.render('kd', {data: kondate_g} );
});

// ルーレット (ランダムに1つの添字を選び詳細画面へ)
app.get("/kondate/ruret", (req, res) => {
  const number = Math.floor(Math.random() * kondate_g.length);
  const detail = kondate_g[number];
  res.render('kd_s', {id: number, data: detail});
});

// 追加画面へのリダイレクト
app.get("/kondate/add", (req, res) => {
  res.redirect('/public/kd_add.html');
});

// 新規作成 (POST)
app.post("/kondate", (req, res) => {
  const id = kondate_g.length + 1;
  const name = req.body.name;
  const kazu = req.body.kazu;
  const zai = req.body.zai;
  const img = req.body.img;
  const how = req.body.how;
  kondate_g.push({ id: id, name: name, kazu: kazu, zai: zai, img: img ,how: how});
  res.render('kd', {data: kondate_g});
});

// 詳細表示
app.get("/kondate/data/:number", (req, res) => {
  const number = req.params.number;
  const detail = kondate_g[number];
  res.render('kd_s', {id: number, data: detail});
});

// 削除 (Delete)
app.get("/kondate/delete/:number", (req, res) => {
  kondate_g.splice(req.params.number, 1);
  res.redirect('/kondate');
});

// 編集画面表示 (Edit)
app.get("/kondate/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = kondate_g[number];
  res.render('kd_edit', {id: number, data: detail});
});

// 更新処理 (Update)
app.post("/kondate/update/:number", (req, res) => {
  const num = req.params.number;
  kondate_g[num].name = req.body.name;
  kondate_g[num].kazu = req.body.kazu;
  kondate_g[num].zai = req.body.zai;
  kondate_g[num].img = req.body.img;
  kondate_g[num].how = req.body.how;
  res.redirect("/kondate/data/" + num);
});

let pokemon_g = [
  { id:1,  hatubai:"1996年2月27日", name:"ポケットモンスター 赤・緑",                               sedai:"第1世代",tihou:"カントー地方", gosanke:"フシギダネ,ヒトカゲ,ゼニガメ",hard:"ゲームボーイ,ゲームボーイカラー,ゲームボーイアドバンス"},
  { id:2,  hatubai:"1996年10月15日",name:"ポケットモンスター 青",                                  sedai:"第1世代",tihou:"カントー地方",gosanke:"フシギダネ,ヒトカゲ,ゼニガメ",hard:"ゲームボーイ,ゲームボーイカラー,ゲームボーイアドバンス"},
  { id:3,  hatubai:"1998年9月12日", name:"ポケットモンスター ピカチュウ",                            sedai:"第1世代",tihou:"カントー地方",gosanke:"フシギダネ,ヒトカゲ,ゼニガメ",hard:"ゲームボーイ,ゲームボーイカラー,ゲームボーイアドバンス"},
  { id:4,  hatubai:"1999年11月21日",name:"ポケットモンスター 金・銀",                               sedai:"第2世代",tihou:"ジョウト地方",gosanke:"チコリータ,ヒノアラシ,ワニノコ",hard:"ゲームボーイ,ゲームボーイカラー,ゲームボーイアドバンス"},
  { id:5,  hatubai:"2000年12月14日",name:"ポケットモンスター クリスタルバージョン",                    sedai:"第2世代",tihou:"ジョウト地方",gosanke:"チコリータ,ヒノアラシ,ワニノコ",hard:"ゲームボーイカラー,ゲームボーイアドバンス"},
  { id:6,  hatubai:"2002年11月21日",name:"ポケットモンスター ルビー・サファイア",                      sedai:"第3世代",tihou:"ホウエン地方",gosanke:"キモリ,アチャモ,ミズゴロウ",hard:"ゲームボーイアドバンス"},
  { id:7,  hatubai:"2004年1月29日", name:"ポケットモンスター ファイアレッド・リーフグリーン",            sedai:"第3世代",tihou:"カントー地方",gosanke:"フシギダネ,ヒトカゲ,ゼニガメ",hard:"ゲームボーイアドバンス"},
  { id:8,  hatubai:"2004年9月16日", name:"ポケットモンスター エメラルド",                             sedai:"第3世代",tihou:"ホウエン地方",gosanke:"キモリ,アチャモ,ミズゴロウ",hard:"ゲームボーイアドバンス"},
  { id:9,  hatubai:"2006年9月28日", name:"ポケットモンスター ダイヤモンド・パール",                    sedai:"第4世代",tihou:"シンオウ地方",gosanke:"ナエトル,ヒコザル,ポッチャマ",hard:"ニンテンドーDS"},
  { id:10, hatubai:"2008年9月13日", name:"ポケットモンスター プラチナ",                              sedai:"第4世代",tihou:"シンオウ地方",gosanke:"ナエトル,ヒコザル,ポッチャマ",hard:"ニンテンドーDS"},
  { id:11, hatubai:"2009年9月12日", name:"ポケットモンスター ハートゴールド・ソウルシルバー",            sedai:"第4世代",tihou:"ジョウト地方",gosanke:"チコリータ,ヒノアラシ,ワニノコ",hard:"ニンテンドーDS"},
  { id:12, hatubai:"2010年9月18日", name:"ポケットモンスター ブラック・ホワイト",                      sedai:"第5世代",tihou:"イッシュ地方",gosanke:"ツタージャ,ポカブ,ミジュマル",hard:"ニンテンドーDS"},
  { id:13, hatubai:"2012年6月23日", name:"ポケットモンスター ブラック2・ホワイト2",                    sedai:"第5世代",tihou:"イッシュ地方",gosanke:"ツタージャ,ポカブ,ミジュマル",hard:"ニンテンドーDS"},
  { id:14, hatubai:"2013年10月12日",name:"ポケットモンスター X・Y",                                 sedai:"第6世代",tihou:"カロス地方",gosanke:"ハリマロン,フォッコ,ケロマツ",hard:"ニンテンドー3DS"},
  { id:15, hatubai:"2014年11月21日",name:"ポケットモンスター オメガルビー・アルファサファイア",          sedai:"第6世代",tihou:"ホウエン地方",gosanke:"キモリ,アチャモ,ミズゴロウ",hard:"ニンテンドー3DS"},
  { id:16, hatubai:"2016年11月18日",name:"ポケットモンスター サン・ムーン",                           sedai:"第7世代",tihou:"アローラ地方",gosanke:"モクロー,ニャビー,アシマリ",hard:"ニンテンドー3DS"},
  { id:17, hatubai:"2017年11月17日",name:"ポケットモンスター ウルトラサン・ウルトラムーン",              sedai:"第7世代",tihou:"アローラ地方",gosanke:"モクロー,ニャビー,アシマリ",hard:"ニンテンドー3DS"},
  { id:18, hatubai:"2018年11月16日",name:"ポケットモンスター Let’s Go! ピカチュウ・Let’s Go! イーブイ", sedai:"第7世代",tihou:"カントー地方",gosanke:"ピカチュウ,イーブイ",hard:"Nintendo Switch"},
  { id:19, hatubai:"2019年11月15日",name:"ポケットモンスター ソード・シールド",                        sedai:"第8世代",tihou:"ガラル地方",gosanke:"サルノリ,ヒバニー,メッソン",hard:"Nintendo Switch"},
  { id:20, hatubai:"2021年11月19日",name:"ポケットモンスター ブリリアントダイヤモンド・シャイニングパール", sedai:"第8世代",tihou:"シンオウ地方",gosanke:"ナエトル,ヒコザル,ポッチャマ",hard:"Nintendo Switch"},
  { id:21, hatubai:"2022年1月28日", name:"Pokémon LEGENDS アルセウス",                             sedai:"第8世代",tihou:"シンオウ地方",gosanke:"モクロー,ヒノアラシ,ミジュマル",hard:"Nintendo Switch"},
  { id:22, hatubai:"2022年11月18日",name:"ポケットモンスター スカーレット・ヴァイオレット",              sedai:"第9世代",tihou:"パルデア地方",gosanke:"ニャオハ,ホゲータ,クワッス",hard:"Nintendo Switch"},
  { id:23, hatubai:"2025年10月16日",name:"Pokémon LEGENDS Z-A",                                   sedai:"第9世代",tihou:"カロス地方",gosanke:"チコリータ,ポカブ,ワニノコ",hard:"Nintendo Switch,Nintendo Switch 2"},
];


app.get("/pokemon", (req, res) => {
  res.render('pkdb', {data: pokemon_g});
});

app.get("/pokemon/data/:number", (req, res) => {
  const number = req.params.number;
  const detail = pokemon_g[number];
  res.render('pkdb_s', {id: number, data: detail});
});

app.get("/pokemon/add", (req, res) => {
  res.redirect('/public/pkdb_add.html');
});

app.post("/pokemon", (req, res) => {
  const id = pokemon_g.length + 1;
  const hatubai = req.body.hatubai;
  const name = req.body.name;
  const sedai = req.body.sedai;
  const tihou = req.body.tihou;
  const gosanke = req.body.gosanke;
  const hard = req.body.hard;
  pokemon_g.push({ id: id, hatubai: hatubai, name: name, sedai: sedai, tihou: tihou, gosanke: gosanke ,hard: hard});
  res.render('pkdb', {data: pokemon_g});
});

// 削除 (Delete)
app.get("/pokemon/delete/:number", (req, res) => {
  pokemon_g.splice(req.params.number, 1);
  res.redirect('/pokemon');
});


// 編集画面表示 (Edit)
app.get("/pokemon/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = pokemon_g[number];
  res.render('pkdb_edit', {id: number, data: detail});
});

app.post("/pokemon/update/:number", (req, res) => {
  const num = req.params.number;
  pokemon_g[num].hatubai = req.body.hatubai;
  pokemon_g[num].name = req.body.name;
  pokemon_g[num].sedai = req.body.sedai;
  pokemon_g[num].tihou = req.body.tihou;
  pokemon_g[num].gosanke = req.body.gosanke;
  pokemon_g[num].hard = req.body.hard;
  res.redirect("/pokemon/data/" + num);
});


let pacas_g = [
  { id: 1,  alfa: "A", romaji:"Agogo",            name:"アゴゴ",                group:"ベル・チャイム系", region:"西アフリカ" },
  { id: 2,  alfa: "A", romaji:"Apito",            name:"アピート",              group:"ホイッスル系",     region:"ブラジル" },
  { id: 3,  alfa: "A", romaji:"Angklung",         name:"アンクルン",             group:"木琴・竹筒系",     region:"インドネシア" },
  { id: 4,  alfa: "V", romaji:"Vibraslap",        name:"ビブラスラップ",          group:"特殊効果系",       region:"アメリカ", },
  { id: 5,  alfa: "W", romaji:"Wind chime",       name:"ウインドチャイム",        group:"ベル・チャイム系", region:"古代インド" },
  { id: 6,  alfa: "W", romaji:"Wood block",       name:"ウッドブロック",          group:"木製打楽器系",     region:"アジア" },
  { id: 7,  alfa: "U", romaji:"Udu drum",         name:"ウドゥドラム",            group:"膜鳴楽器系", region:"ナイジェリア" },
  { id: 8,  alfa: "E", romaji:"Energy Chime",     name:"エナジーチャイム",        group:"ベル・チャイム系", region:"不明" },
  { id: 9,  alfa: "O", romaji:"Ocean drum",       name:"オーシャンドラム",        group:"特殊効果系",       region:"不明" },
  { id: 10, alfa: "C", romaji:"Cowbell",          name:"カウベル",               group:"ベル・チャイム系", region:"アルプス" },
  { id: 11, alfa: "C", romaji:"Caxixi",           name:"カシシ",                 group:"シェイカー系",     region:"ブラジル" },
  { id: 12, alfa: "C", romaji:"Castanet",         name:"カスタネット",             group:"体鳴楽器系",   region:"スペイン" },
  { id: 13, alfa: "C", romaji:"Concert chime",    name:"コンサートチャイム",        group:"ベル・チャイム系", region:"イギリス" },
  { id: 14, alfa: "C", romaji:"Cabasa",           name:"カバサ",                 group:"シェイカー系",     region:"南米" },
  { id: 15, alfa: "C", romaji:"Cajon",            name:"カホン",                 group:"箱型打楽器系",       region:"ペルー" },
  { id: 16, alfa: "K", romaji:"Kalimba",          name:"カリンバ",               group:"鍵盤楽器系",         region:"アフリカ" },
  { id: 17, alfa: "G", romaji:"Ganza",            name:"ガンザ",                 group:"シェイカー系",     region:"ブラジル" },
  { id: 18, alfa: "G", romaji:"Ganban",           name:"ガンバン",               group:"鍵盤楽器系",         region:"インドネシア" },
  { id: 19, alfa: "Q", romaji:"Quijada",          name:"キハーダ",               group:"特殊効果系",       region:"キューバ" },
  { id: 20, alfa: "G", romaji:"Guiro",            name:"ギロ",                   group:"擦奏楽器系",         region:"ラテンアメリカ" },
  { id: 21, alfa: "C", romaji:"Cuica",            name:"クイーカ",               group:"膜鳴楽器系",   region:"ブラジル" },
  { id: 22, alfa: "C", romaji:"Crash cymbal",     name:"クラッシュシンバル",        group:"シンバル系",       region:"トルコ" },
  { id: 23, alfa: "C", romaji:"Claves",           name:"クラベス",               group:"体鳴楽器系",   region:"ラテンアメリカ" },
  { id: 24, alfa: "G", romaji:"Glockenspiel",     name:"グロッケンシュピール",      group:"鍵盤楽器系",         region:"ドイツ" },
  { id: 25, alfa: "G", romaji:"Ghungroo",         name:"グングルー",             group:"鈴系",           region:"インド" },
  { id: 26, alfa: "K", romaji:"Koukin",           name:"口琴",                   group:"特殊楽器系",         region:"不明" },
  { id: 27, alfa: "C", romaji:"Conga",            name:"コンガ",                 group:"太鼓系",           region:"キューバ" },
  { id: 28, alfa: "G", romaji:"Gong,Thai gong",   name:"ゴング（タイゴング）",      group:"銅鑼系",           region:"東南アジア" },
  { id: 29, alfa: "C", romaji:"Concert tom",      name:"コンサートトムトム（トム）",  group:"太鼓系",           region:"不明" },
  { id: 30, alfa: "C", romaji:"Concert bass drum",name:"コンサートバスドラム（大太鼓）",group:"太鼓系",           region:"トルコ" },
  { id: 31, alfa: "S", romaji:"Siren whistle",    name:"サイレンホイッスル",        group:"ホイッスル系",     region:"イギリス" },
  { id: 32, alfa: "S", romaji:"Suspended cymbal", name:"サスペンドシンバル",        group:"シンバル系",       region:"トルコ" },
  { id: 33, alfa: "S", romaji:"Samba whistle",    name:"サンバホイッスル",          group:"ホイッスル系",     region:"ブラジル" },
  { id: 34, alfa: "S", romaji:"Shaker",           name:"シェイカー",             group:"シェイカー系",     region:"アフリカ" },
  { id: 35, alfa: "S", romaji:"Shekere",          name:"シェケレ",               group:"シェイカー系",     region:"アフリカ" },
  { id: 36, alfa: "D", romaji:"Djembe",           name:"ジャンベ",               group:"太鼓系",           region:"西アフリカ" },
  { id: 37, alfa: "X", romaji:"Xylophone",        name:"シロフォン",             group:"鍵盤楽器系",         region:"アフリカ/東南アジア" },
  { id: 38, alfa: "C", romaji:"Cymbal",           name:"シンバル",               group:"シンバル系",       region:"トルコ" },
  { id: 39, alfa: "S", romaji:"Sleigh bell",      name:"スレイベル（鈴）",          group:"鈴系",           region:"欧米" },
  { id: 40, alfa: "S", romaji:"Snare drum",       name:"スネアドラム（小太鼓）",    group:"太鼓系",           region:"古代エジプト" },
  { id: 41, alfa: "S", romaji:"Splash cymbal",    name:"スプラッシュシンバル",      group:"シンバル系",       region:"トルコ" },
  { id: 42, alfa: "S", romaji:"Slide whistle",    name:"スライドホイッスル",        group:"ホイッスル系",     region:"不明" },
  { id: 43, alfa: "S", romaji:"Slap stick",       name:"スラップスティック（ムチ）", group:"特殊効果系",       region:"不明" },
  { id: 44, alfa: "S", romaji:"Slit drum",        name:"スリットドラム（ログドラム）",group:"木製打楽器系",     region:"不明" },
  { id: 45, alfa: "S", romaji:"Surdo",            name:"スルド",                 group:"太鼓系",           region:"ブラジル" },
  { id: 46, alfa: "T", romaji:"Tamtam",           name:"タムタム（銅鑼）",         group:"銅鑼系",           region:"中国" },
  { id: 47, alfa: "T", romaji:"Tambourine",       name:"タンバリン",             group:"フレームドラム系", region:"不明"},
  { id: 48, alfa: "T", romaji:"Tamborim",         name:"タンボリン",             group:"フレームドラム系", region:"ブラジル" },
  { id: 49, alfa: "C", romaji:"China cymbal",     name:"チャイナシンバル",          group:"シンバル系",       region:"中国" },
  { id: 50, alfa: "C", romaji:"China dora",       name:"チャイナドラ",            group:"銅鑼系",           region:"中国" },
  { id: 51, alfa: "T", romaji:"Timpani",          name:"ティンパニ",             group:"太鼓系（鍵盤）",   region:"中東・中央アジア" },
  { id: 52, alfa: "T", romaji:"Timbales",         name:"ティンバレス",            group:"太鼓系（金属）",   region:"キューバ" },
  { id: 53, alfa: "T", romaji:"Tenor drum",       name:"テナードラム（フィールドドラム）",group:"太鼓系",           region:"ヨーロッパ" },
  { id: 54, alfa: "T", romaji:"Temple block",     name:"テンプルブロック（木魚）",   group:"木製打楽器系",     region:"東アジア" },
  { id: 55, alfa: "T", romaji:"TomTom",           name:"トムトム（タム）",         group:"太鼓系",           region:"不明" },
  { id: 56, alfa: "T", romaji:"Triangle",         name:"トライアングル",           group:"体鳴楽器系", region:"不明" },
  { id: 57, alfa: "D", romaji:"Drum set",         name:"ドラムセット",            group:"セット",           region:"アメリカ" },
  { id: 58, alfa: "H", romaji:"Hihat cymbal",     name:"ハイハットシンバル",        group:"シンバル系",       region:"アメリカ" },
  { id: 59, alfa: "B", romaji:"Bass drum",        name:"バスドラム",             group:"太鼓系",           region:"古代文明" },
  { id: 60, alfa: "P", romaji:"Pandeiro",         name:"パンディエロ",            group:"フレームドラム系", region:"ブラジル" },
  { id: 61, alfa: "H", romaji:"Handbell",         name:"ハンドベル",             group:"ベル・チャイム系", region:"イギリス" },
  { id: 62, alfa: "V", romaji:"Vibraphone",       name:"ビブラフォン",            group:"鍵盤楽器系",         region:"アメリカ" },
  { id: 63, alfa: "F", romaji:"Finger cymbal",    name:"フィンガーシンバル",        group:"シンバル系",       region:"不明" },
  { id: 64, alfa: "F", romaji:"Flexatone",        name:"フレクサトーン",          group:"特殊効果系",       region:"イギリス" },
  { id: 65, alfa: "F", romaji:"Fram drum",        name:"フレームドラム",          group:"フレームドラム系", region:"古代文明" },
  { id: 66, alfa: "F", romaji:"Floor tom",        name:"フロアタム",             group:"太鼓系",           region:"アメリカ" },
  { id: 67, alfa: "B", romaji:"Bell tree",        name:"ベルツリー",             group:"ベル・チャイム系", region:"古代文明" },
  { id: 68, alfa: "B", romaji:"Bongo",            name:"ボンゴ",                 group:"太鼓系",           region:"キューバ" },
  { id: 69, alfa: "M", romaji:"Maracas",          name:"マラカス",               group:"シェイカー系",     region:"南米" },
  { id: 70, alfa: "M", romaji:"Marimba",          name:"マリンバ",               group:"鍵盤楽器系",         region:"アフリカ" },
  { id: 71, alfa: "R", romaji:"Ride cymbal",      name:"ライドシンバル",           group:"シンバル系",       region:"トルコ" },
  { id: 72, alfa: "R", romaji:"Ratchet",          name:"ラチェット",             group:"特殊効果系",       region:"不明" },
  { id: 73, alfa: "R", romaji:"Rototom",          name:"ロートタム",             group:"太鼓系",           region:"不明" },
];

app.get("/pacas", (req, res) => {
  pacas_g.sort((a, b) => {
    if (a.alfa < b.alfa) return -1;
    if (a.alfa > b.alfa) return 1;
    return 0;
  });

  res.render('pcs', {data: pacas_g} );
});

app.get("/pacas/data/:id", (req, res) => {
  const targetId = parseInt(req.params.id); 
  const detail = pacas_g.find(item => item.id === targetId);
    res.render('pcs_s', {id: targetId, data: detail});
});

app.get("/pacas/add", (req, res) => {
  res.redirect('/public/pcs_add.html');
});

app.post("/pacas", (req, res) => {
  const id = pacas_g.length + 1;
  const romaji = req.body.romaji;
  const alfa = req.body.alfa;
  const name = req.body.name;
  const group = req.body.group;
  const region = req.body.region;
  pacas_g.push({ id: id, alfa: alfa, romaji: romaji, name: name, group: group, region: region});
  res.render('pcs', {data: pacas_g});
});

// 削除 (Delete)
app.get("/pacas/delete/:id", (req, res) => {
  const targetId = parseInt(req.params.id);
  const index = pacas_g.findIndex(item => item.id === targetId);
  pacas_g.splice(index, 1);
  res.redirect('/pacas');
});


// 編集画面表示 (Edit)
app.get("/pacas/edit/:id", (req, res) => {
  const targetId = parseInt(req.params.id);
  const detail = pacas_g.find(item => item.id === targetId);
  res.render('pcs_edit', {id: targetId, data: detail});
});

app.post("/pacas/update/:id", (req, res) => {
  const targetId = parseInt(req.params.id);
  const paca = pacas_g.find(item => item.id === targetId);
  paca.alfa = req.body.alfa;
  paca.romaji = req.body.romaji;
  paca.name = req.body.name;
  paca.group = req.body.group;
  paca.region = req.body.region;
  res.redirect("/pacas/data/" + targetId);
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));