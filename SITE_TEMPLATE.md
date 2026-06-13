# 個人サイト制作フォーマット（AI向け仕様書）

このドキュメントは、今野駿太の個人サイト（https://shunta-tf.github.io/my-website/）で確立した
制作フォーマットをまとめたもの。**次回以降、別のサイトを同じ品質で作るときの設計指針**として
AIエージェントにそのまま渡して使う。

---

## 0. 基本方針

- **フレームワーク不使用**。純粋な HTML / CSS / JS のみ（ビルド工程なし）。
- **GitHub Pages で公開**。git push するだけで反映。
- **白ベース + ブルー差し色**。読みやすさ最優先。装飾は最小限。
- **「AIが量産したテンプレ」に見せない**こと（後述の禁止事項を厳守）。
- 1ファイル1ページ。共通の `css/style.css` と `js/main.js` を全ページで読む。

---

## 1. ファイル構成

```
my-website/
├── index.html        # トップ（ヒーロー / News / 活動概要 / SNS）
├── about.html        # プロフィール（タイムライン / 趣味）
├── adventure.html    # 主要テーマページ（実績・ギャラリー）
├── projects.html     # 取り組み（活動・制作物・組織）
├── blog.html         # 外部ブログ(note)への導線
├── contact.html      # 連絡先・問い合わせ
├── css/style.css     # 全ページ共通スタイル
├── js/main.js        # 全ページ共通スクリプト
├── images/           # 画像（ASCIIパスのみ。後述）
│   ├── hero/         # トップのスライド画像 01-03.jpg
│   ├── cycling/      # ギャラリー用
│   └── trailrun/
├── sitemap.xml       # SEO
├── robots.txt        # SEO
└── README.md         # 更新履歴・更新方法
```

---

## 2. デザインシステム（CSS変数）

`:root` に必ずこのトークンを定義し、**色・余白・角丸はすべて変数経由**で使う。

```css
:root {
  --bg-primary:    #ffffff;   /* 背景（白ベース） */
  --bg-secondary:  #f6f6f4;   /* 交互セクションの背景 */
  --bg-card:       #ffffff;
  --accent:        #1a6fd0;   /* 差し色ブルー（主役） */
  --accent-light:  #4a9eff;
  --accent-dark:   #0d52a8;   /* hover時 */
  --accent-glow:   rgba(26,111,208,0.08);
  --text-primary:  #0e0e1e;   /* 見出し・本文 */
  --text-secondary:#4a5068;   /* 説明文 */
  --text-muted:    #8a90a8;   /* ラベル・補足 */
  --border:        rgba(14,14,30,0.09);
  --header-height: 72px;
  --section-pad:   72px 0;    /* セクション上下余白 */
  --max-width:     1200px;
  --radius:        6px;       /* 角丸は小さく（丸すぎ厳禁） */
  --radius-sm:     4px;
  --shadow:        0 2px 12px rgba(14,14,30,0.07);
  --shadow-hover:  0 6px 20px rgba(14,14,30,0.11);
}
```

### タイポグラフィ
- 見出し（display）: **Montserrat**（英字）
- 本文（日本語）: **Noto Sans JP**
- Google Fonts を `<head>` で preconnect + 読み込み。
- セクション見出し `.section-title` は `clamp(2rem,4.5vw,2.9rem)` / `font-weight:800` / `letter-spacing:-0.03em`。
- 英字ラベルは Montserrat・大文字・`letter-spacing` 広め。

### 余白（レスポンシブで縮小）
| 画面幅 | --section-pad |
|---|---|
| PC | 72px |
| ≤768px | 44px |
| ≤480px | 36px |

---

## 3. 共通レイアウト要素

### head（全ページ共通テンプレ）
```html
<meta charset="UTF-8">
<meta name="google-site-verification" content="（Search Consoleの値）" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="（ページ固有の説明。検索結果に出る）">
<title>ページ名 — サイト名</title>
<link rel="canonical" href="（このページの絶対URL）">
<!-- OGP / Twitter Card（SNSシェア時のプレビュー） -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="（サイト名）">
<meta property="og:locale" content="ja_JP">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:url" content="（絶対URL）">
<meta property="og:image" content="（絶対URLの画像 1200x630推奨）">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="（絶対URLの画像）">
<!-- フォント -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
```
トップ(index)のみ `<body class="home-page">` を付け、`</head>`直前に Person 構造化データ(JSON-LD)を入れる。

### ヘッダー / ナビ
- 固定ヘッダー `.header`（スクロールで `.scrolled` → 白背景+blur）。
- PC: `.nav-links`、モバイル: `.nav-hamburger` + `.nav-mobile`（JSで開閉）。
- **全ページでナビ項目を揃える**。ページ追加時は全ファイルのナビを更新する。
- トップだけヒーロー画像の上に白文字ナビ（`.home-page .header:not(.scrolled)` で色指定）。

### セクションの型
```html
<section class="section [bg-alt]">
  <div class="container">
    <div class="section-header fade-in">
      <span class="section-label">English Label</span>
      <h2 class="section-title">日本語見出し</h2>
      <p class="section-subtitle">補足（任意）</p>
    </div>
    <!-- コンテンツ -->
  </div>
</section>
```
- `bg-alt` を交互に付けて背景に明暗のリズムを作る。
- `.section-label::before` で見出し上に短いブルーのアクセント線（共通シグネチャー）。

### フッター
- `.footer-grid`（ブランド / Navigation / Follow の3カラム）。モバイルで1カラム。

---

## 4. インタラクション（共通モチーフ）

**「ブルーのラインがホバーで出現」**をサイト全体の統一言語にする。
- カード: ホバーで上部にブルー線 + `translateY(-3px)` + 影。
- ニュース項目: ホバーで左にブルー縦線（`scaleY` で出現、レイアウトずれなし）。
- SNSカード: ホバーで上部ブルー線 + 浮き上がり。
- ボタン: ホバーで `translateY(-2px)` + 影。

JS（`js/main.js`）の機能:
- ページf-in（`body.page-loaded`）
- 固定ヘッダーのscrolled切替
- ハンバーガーメニュー開閉
- IntersectionObserver による `.fade-in` のスクロール表示
- ヒーロースライドショー（`setInterval`で6秒ごと、`.active`クラス + CSS opacity transition）
- プログレスバー、アクティブナビ判定、問い合わせフォームのバリデーション

---

## 5. レスポンシブ

ブレークポイント: **1024px / 768px / 480px**。
- 1024: グリッドを3→2カラム、フッター2カラム。
- 768: ナビをハンバーガーに、グリッド1カラム、余白縮小、ヒーロー縮小、ニュース縦積み。
- 480: さらに余白・フォント縮小。
- ヒーローはモバイルで中央寄せ・テキスト白・高さ控えめ。

---

## 6. 画像の扱い（重要・ハマりどころ）

1. **日本語ファイル名・日本語フォルダ名は使わない**。GitHub Pagesで表示されない。
   → 必ず `images/hero/01.jpg` のような **ASCIIパスにコピーしてからHTMLで参照**。
2. **iPhoneのHEIC形式に注意**。拡張子が `.jpg` でも中身がHEICだとブラウザで表示されない。
   - 判定: ファイル先頭バイトに `ftypheic` があればHEIC。
   - 変換（Windows / PowerShell, WICコーデック使用。ffmpegが使えない環境向け）:
     ```powershell
     Add-Type -AssemblyName PresentationCore, WindowsBase
     $decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create(
       (New-Object System.Uri("in.heic")),
       [System.Windows.Media.Imaging.BitmapCreateOptions]::PreservePixelFormat,
       [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad)
     $enc = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
     $enc.QualityLevel = 92
     $enc.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($decoder.Frames[0]))
     $fs = [System.IO.File]::Create("out.jpg"); $enc.Save($fs); $fs.Close()
     ```
   - 変換後、先頭が `FF D8 FF`（JPEG）になっていることを確認。
3. ヒーロー画像はCSSで `opacity` を下げ、暗いグラデーション `.hero-overlay` を重ねて文字を読ませる。

---

## 7. 「AIっぽさ」を避ける禁止事項

このサイトは下記を**意図的に排除**している。再現時も守る。
- ❌ ピル型（`border-radius:100px`）のバッジ・ラベル → 角丸は3〜6px。
- ❌ グラデーション背景・放射状ブロブ・斜めclip-path。
- ❌ カードの常時表示グラデーション上線、光るドット、強い影。
- ❌ hover時の大きな拡大（`scale`）や派手なリフト。
- ❌ 青の大文字・超ワイドletter-spacingのラベルを多用（テンプレ感が出る）。
- ✅ 代わりに: フラットな配色、控えめな角丸、タイポgrafィの強弱、ブルーを「効かせる」一点投入、ホバー時のみの控えめなアクセント線。

---

## 8. コンテンツ作成の原則

- 事実は正確に。数値・日付・期間はユーザーに確認して確定（推測で書かない）。
- 日付は絶対表記（「昨年」ではなく「2025.08」）。News は新しい順。
- キャッチコピー的な煽り文は控えめに（本人が嫌うことが多い）。
- 英語の肩書き風見出し + 日本語の補足、の組み合わせが好相性。

---

## 9. デプロイ & 更新フロー

```powershell
# 初回のみ: git init → GitHub にリポジトリ作成 → push → Settings > Pages を有効化
# 以降の更新:
git add .
git commit -m "変更内容"
git push
```
- push後 1〜2分で反映。
- コミットメッセージ末尾に Co-Authored-By を付与。
- `README.md` に更新履歴を残す。

---

## 10. SEO / Google検索登録（公開後の手順）

### サイト側に置くファイル
- `robots.txt`（全許可 + サイトマップURL明記）
  ```
  User-agent: *
  Allow: /
  Sitemap: https://（ドメイン）/（パス）/sitemap.xml
  ```
- `sitemap.xml`（全ページのURL・lastmod・priority）
- 全ページに OGP / Twitter Card / canonical（§3参照）
- トップに JSON-LD `Person`（名前・別名・URL・所属・SNSの sameAs）

### Google Search Console での申請手順
1. https://search.google.com/search-console で **「URLプレフィックス」** プロパティを追加
   （github.io では「ドメイン」プロパティは使えない）。
2. **所有権確認**: 「HTMLタグ」方式 → 表示された `<meta name="google-site-verification">` を
   **全ページの`<head>`に追加してpush** → 反映後に「確認」。
3. **サイトマップ送信**: メニュー「サイトマップ」で `sitemap.xml` と入力
   （**先頭スラッシュなし**。`/sitemap.xml` はドメインルートを指すのでNG）。
   - 直後は「取得できませんでした」になることがあるが**正常**。数時間〜1〜2日で「成功」に変わる。再送信しない。
4. **インデックス登録リクエスト**: 「URL検査」で各ページURLを入力 → 「インデックス登録をリクエスト」。
   主要ページを1つずつ実施すると早い。
5. 反映確認: Google検索で `site:（ドメイン）/（パス）` 。数日〜2週間で出てくる。

---

## 11. 新規サイトを作るときのチェックリスト

- [ ] `:root` のデザイントークンをこの仕様で定義
- [ ] Montserrat + Noto Sans JP を読み込み
- [ ] 全ページ共通の head / header / footer をテンプレ化
- [ ] ナビ項目を全ページで統一
- [ ] 画像は ASCIIパス・JPEG（HEICは変換）
- [ ] レスポンシブ 1024/768/480 を確認
- [ ] 禁止事項（§7）に抵触していないか目視レビュー
- [ ] robots.txt / sitemap.xml / OGP / canonical / JSON-LD を設置
- [ ] GitHub Pages 公開 → Search Console 登録
