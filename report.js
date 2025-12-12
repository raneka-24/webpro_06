const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/kondate", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('kondate', {data: kondatemenu} );
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
  // 本来ならここにDBとのやり取りが入る
  res.render('pkdb', {data: pokemon_g});
});


app.get("/pokemon/data", (req, res) => {
  // 1. URLからクエリパラメータのidを取得
  const gameId = parseInt(req.query.id);
  // 2. pokemon_g配列から、一致するidを持つゲームを検索
  const selectedGame = pokemon_g.find(game => game.id === gameId);

  // 3. データが見つかった場合
  if (selectedGame) {
    // テンプレートに個別のゲームデータを展開して渡す
    res.render("pkdb_s", {
      name: selectedGame.name,
      hatubai: selectedGame.hatubai,
      sedai: selectedGame.sedai,
      tihou: selectedGame.tihou,
      gosanke: selectedGame.gosanke,
      hard: selectedGame.hard
    });
  } else {
    res.status(404).send('ゲームが見つかりませんでした。');
  }
});

app.get("/pokemon/add", (req, res) => {
  res.redirect('/public/pkdb_add.ejs');
});

let percussion_ = [
  { id: 1,  gzyuon: "A", romaji:"Agogo",            name:"アゴゴ",                group:"ベル・チャイム系", region:"ヨルバ" },
  { id: 2,  gzyuon: "A", romaji:"Apito",            name:"アピート",              group:"ホイッスル系",     region:"ブラジル" },
  { id: 3,  gzyuon: "A", romaji:"Angklung",         name:"アンクルン",             group:"木琴・竹筒系",     region:"インドネシア" },
  { id: 4,  gzyuon: "V", romaji:"Vibraslap",        name:"ビブラスラップ",          group:"特殊効果系",       region:"アメリカ", },
  { id: 5,  gzyuon: "W", romaji:"Wind chime",       name:"ウインドチャイム",        group:"ベル・チャイム系", region:"-" },
  { id: 6,  gzyuon: "W", romaji:"Wood block",       name:"ウッドブロック",          group:"木製打楽器系",     region:"-" },
  { id: 7,  gzyuon: "U", romaji:"Udu drum",         name:"ウドゥドラム",            group:"膜鳴楽器系", region:"ナイジェリア" },
  { id: 8,  gzyuon: "E", romaji:"Energy Chime",     name:"エナジーチャイム",        group:"ベル・チャイム系", region:"-" },
  { id: 9,  gzyuon: "O", romaji:"Ocean drum",       name:"オーシャンドラム",        group:"特殊効果系",       region:"-" },
  { id: 10, gzyuon: "C", romaji:"Cowbell",          name:"カウベル",               group:"ベル・チャイム系", region:"-" },
  { id: 11, gzyuon: "C", romaji:"Caxixi",           name:"カシシ",                 group:"シェイカー系",     region:"ブラジル" },
  { id: 12, gzyuon: "C", romaji:"Castanet",         name:"カスタネット",             group:"体鳴楽器系",   region:"スペイン" },
  { id: 13, gzyuon: "C", romaji:"Concert chime",    name:"コンサートチャイム",        group:"ベル・チャイム系", region:"-" },
  { id: 14, gzyuon: "C", romaji:"Cabasa",           name:"カバサ",                 group:"シェイカー系",     region:"南米" },
  { id: 15, gzyuon: "C", romaji:"Cajon",            name:"カホン",                 group:"箱型打楽器系",       region:"ペルー" },
  { id: 16, gzyuon: "K", romaji:"Kalimba",          name:"カリンバ",               group:"鍵盤楽器系",         region:"アフリカ" },
  { id: 17, gzyuon: "G", romaji:"Ghungroo",         name:"ガングルー",             group:"鈴系",           region:"インド" },
  { id: 18, gzyuon: "G", romaji:"Ganza",            name:"ガンザ",                 group:"シェイカー系",     region:"ブラジル" },
  { id: 19, gzyuon: "G", romaji:"Ganban",           name:"ガンバン",               group:"鍵盤楽器系",         region:"インドネシア" },
  { id: 20, gzyuon: "Q", romaji:"Quijada",          name:"キハーダ",               group:"特殊効果系",       region:"キューバ" },
  { id: 21, gzyuon: "G", romaji:"Guiro",            name:"ギロ",                   group:"擦奏楽器系",         region:"ラテンアメリカ" },
  { id: 22, gzyuon: "C", romaji:"Cuica",            name:"クイーカ",               group:"膜鳴楽器系",   region:"ブラジル" },
  { id: 23, gzyuon: "C", romaji:"Crash cymbal",     name:"クラッシュシンバル",        group:"シンバル系",       region:"-" },
  { id: 24, gzyuon: "C", romaji:"Claves",           name:"クラベス",               group:"体鳴楽器系",   region:"ラテンアメリカ" },
  { id: 25, gzyuon: "G", romaji:"Glockenspiel",     name:"グロッケンシュピール",      group:"鍵盤楽器系",         region:"-" },
  { id: 26, gzyuon: "K", romaji:"Koukin",           name:"口琴",                   group:"特殊楽器系",         region:"-" },
  { id: 27, gzyuon: "C", romaji:"Conga",            name:"コンガ",                 group:"太鼓系",           region:"キューバ" },
  { id: 28, gzyuon: "G", romaji:"Gong,Thai gong",   name:"ゴング（タイゴング）",      group:"銅鑼系",           region:"東南アジア" },
  { id: 29, gzyuon: "C", romaji:"Concert tom",      name:"コンサートトムトム（トム）",  group:"太鼓系",           region:"-" },
  { id: 30, gzyuon: "C", romaji:"Concert bass drum",name:"コンサートバスドラム（大太鼓）",group:"太鼓系",           region:"-" },
  { id: 31, gzyuon: "S", romaji:"Siren whistle",    name:"サイレンホイッスル",        group:"ホイッスル系",     region:"-" },
  { id: 32, gzyuon: "S", romaji:"Suspended cymbal", name:"サスペンドシンバル",        group:"シンバル系",       region:"-" },
  { id: 33, gzyuon: "S", romaji:"Samba whistle",    name:"サンバホイッスル",          group:"ホイッスル系",     region:"ブラジル" },
  { id: 34, gzyuon: "S", romaji:"Shaker",           name:"シェイカー",             group:"シェイカー系",     region:"-" },
  { id: 35, gzyuon: "S", romaji:"Shekere",          name:"シェケレ",               group:"シェイカー系",     region:"アフリカ" },
  { id: 36, gzyuon: "D", romaji:"Djembe",           name:"ジャンベ",               group:"太鼓系",           region:"西アフリカ" },
  { id: 37, gzyuon: "X", romaji:"Xylophone",        name:"シロフォン",             group:"鍵盤楽器系",         region:"アフリカ/東南アジア" },
  { id: 38, gzyuon: "C", romaji:"Cymbal",           name:"シンバル",               group:"シンバル系",       region:"-" },
  { id: 39, gzyuon: "S", romaji:"Sleigh bell",      name:"スレイベル（鈴）",          group:"鈴系",           region:"-" },
  { id: 40, gzyuon: "S", romaji:"Snare drum",       name:"スネアドラム（小太鼓）",    group:"太鼓系",           region:"-" },
  { id: 41, gzyuon: "S", romaji:"Splash cymbal",    name:"スプラッシュシンバル",      group:"シンバル系",       region:"-" },
  { id: 42, gzyuon: "S", romaji:"Slide whistle",    name:"スライドホイッスル",        group:"ホイッスル系",     region:"-" },
  { id: 43, gzyuon: "S", romaji:"Slap stick",       name:"スラップスティック（ムチ）", group:"特殊効果系",       region:"-" },
  { id: 44, gzyuon: "S", romaji:"Slit drum",        name:"スリットドラム（ログドラム）",group:"木製打楽器系",     region:"-" },
  { id: 45, gzyuon: "S", romaji:"Surdo",            name:"スルド",                 group:"太鼓系",           region:"ブラジル" },
  { id: 46, gzyuon: "T", romaji:"Tamtam",           name:"タムタム（銅鑼）",         group:"銅鑼系",           region:"中国" },
  { id: 47, gzyuon: "T", romaji:"Tambourine",       name:"タンバリン",             group:"フレームドラム系", region:"-"},
  { id: 48, gzyuon: "T", romaji:"Tamborim",         name:"タンボリン",             group:"フレームドラム系", region:"ブラジル" },
  { id: 49, gzyuon: "C", romaji:"China cymbal",     name:"チャイナシンバル",          group:"シンバル系",       region:"中国" },
  { id: 50, gzyuon: "C", romaji:"China dora",       name:"チャイナドラ",            group:"銅鑼系",           region:"中国" },
  { id: 51, gzyuon: "T", romaji:"Timpani",          name:"ティンパニ",             group:"太鼓系（鍵盤）",   region:"-" },
  { id: 52, gzyuon: "T", romaji:"Timbales",         name:"ティンバレス",            group:"太鼓系（金属）",   region:"キューバ" },
  { id: 53, gzyuon: "T", romaji:"Tenor drum",       name:"テナードラム（フィールドドラム）",group:"太鼓系",           region:"-" },
  { id: 54, gzyuon: "T", romaji:"Temple block",     name:"テンプルブロック（木魚）",   group:"木製打楽器系",     region:"東アジア" },
  { id: 55, gzyuon: "T", romaji:"TomTom",           name:"トムトム（タム）",         group:"太鼓系",           region:"-" },
  { id: 56, gzyuon: "T", romaji:"Triangle",         name:"トライアングル",           group:"体鳴楽器系", region:"-" },
  { id: 57, gzyuon: "D", romaji:"Drum set",         name:"ドラムセット",            group:"セット",           region:"-" },
  { id: 58, gzyuon: "H", romaji:"Hihat cymbal",     name:"ハイハットシンバル",        group:"シンバル系",       region:"-" },
  { id: 59, gzyuon: "B", romaji:"Bass drum",        name:"バスドラム",             group:"太鼓系",           region:"-" },
  { id: 60, gzyuon: "P", romaji:"Pandeiro",         name:"パンディエロ",            group:"フレームドラム系", region:"ブラジル" },
  { id: 61, gzyuon: "H", romaji:"Handbell",         name:"ハンドベル",             group:"ベル・チャイム系", region:"イギリス" },
  { id: 62, gzyuon: "V", romaji:"Vibraphone",       name:"ビブラフォン",            group:"鍵盤楽器系",         region:"-" },
  { id: 63, gzyuon: "F", romaji:"Finger cymbal",    name:"フィンガーシンバル",        group:"シンバル系",       region:"-" },
  { id: 64, gzyuon: "F", romaji:"Flexatone",        name:"フレクサトーン",          group:"特殊効果系",       region:"-" },
  { id: 65, gzyuon: "F", romaji:"Fram drum",        name:"フレームドラム",          group:"フレームドラム系", region:"古代" },
  { id: 66, gzyuon: "F", romaji:"Floor tom",        name:"フロアタム",             group:"太鼓系",           region:"-" },
  { id: 67, gzyuon: "B", romaji:"Bell tree",        name:"ベルツリー",             group:"ベル・チャイム系", region:"-" },
  { id: 68, gzyuon: "B", romaji:"Bongo",            name:"ボンゴ",                 group:"太鼓系",           region:"キューバ" },
  { id: 69, gzyuon: "M", romaji:"Maracas",          name:"マラカス",               group:"シェイカー系",     region:"-" },
  { id: 70, gzyuon: "M", romaji:"Marimba",          name:"マリンバ",               group:"鍵盤楽器系",         region:"-" },
  { id: 71, gzyuon: "R", romaji:"Ride cymbal",      name:"ライドシンバル",           group:"シンバル系",       region:"-" },
  { id: 72, gzyuon: "R", romaji:"Ratchet",          name:"ラチェット",             group:"特殊効果系",       region:"-" },
  { id: 73, gzyuon: "R", romaji:"Rototom",          name:"ロートトム",             group:"太鼓系",           region:"-" },
];

app.get("/pacas", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('pacas', {data: dougu} );
});






app.listen(8080, () => console.log("Example app listening on port 8080!"));