# Shunta Konno — Official Website

今野駿太の個人公式サイト。  
公開URL: https://shunta-tf.github.io/my-website/

---

## 更新履歴

### 2026-06-15
- レビュー指摘を反映した改善
  - ヒーローにタグライン＋CTA（About / Contact）を追加
  - 全ページに skip-link と `<main>` ランドマークを追加（アクセシビリティ）
  - ハンバーガーメニューに `aria-expanded` の状態同期を追加
  - 装飾絵文字を `aria-hidden`、SNSの `𝕏` を通常テキストに修正
  - `prefers-reduced-motion` 対応、パララックスを requestAnimationFrame で間引き
  - フッターナビに Projects を追加、コピーライトを 2025–2026 に更新
  - 画像へ `loading="lazy"`、ヒーロー先頭画像を preload
  - YouTube（準備中）リンクを削除、未送信のお問い合わせフォーム関連コードを除去
- デザインをプロフェッショナル基調に調整（多層シャドウ・ダークフッター・寒色ニュートラル）

### 2026-06-09
- サイト公開（GitHub Pages）
- Wixサイトからヒーロー・プロフィール画像を移行
- 北米大陸横断プロジェクトを完走済みに更新
- トレイルランニングセクション追加（スカイライントレイル菅平 30km 優勝）

---

## ファイル構成

```
my-website/
├── index.html        # HOME
├── about.html        # ABOUT
├── adventure.html    # 冒険
├── blog.html         # BLOG
├── contact.html      # CONTACT
├── css/style.css     # 共通スタイル
├── js/main.js        # 共通JS
└── images/           # 画像
```

---

## 更新方法

```powershell
# 変更後にプッシュ
git add .
git commit -m "更新内容"
git push
```

プッシュ後、1〜2分でサイトに反映されます。
