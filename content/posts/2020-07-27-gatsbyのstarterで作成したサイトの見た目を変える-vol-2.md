---
template: post
title: Gatsbyのstarterで作成したサイトの見た目を変える vol.2
slug: /posts/20200727-gatsby
draft: false
date: 2020-07-27T07:00:00.000Z
description: |
  Gatsbyのstarterを利用して作成したこのサイトの見た目を少しずつ変更していく第2段。
  今回は、codeスタイルを変更してみる。
category: Dev
tags:
  - Dev
  - Gatsby
  - prismjs
---
[前回の記事](https://dehio.work/posts/20200725-gatsby)では、トップページの見た目を変更した。
今回は、個別ページの記事を書いたときのcodeスタイルをデフォルトのものから変更してみる。

デフォルトで設定されているBackgroundの色があまり好きではなかったのが変更したい一番のモチベーション。
変更する項目は以下の3つ。
- 背景色をコンソール画面のように黒色にしたい
- codeに合わせてsyntaxハイライトが着くようにしたい
- タイトルが表示されるようにしたい

## デフォルトの設定箇所
いったいデフォルトではどこのCSSで設定がされているのかを調べてみた。
`code[class*="language-"]` の場所で書かれていることはChromeのデベロッパーツールからわかった。
さて、これはどこで設定されているのか。
github上で検索をし、`static/css/prismjs/theme.min.css` に書かれていることを発見。
このcssは`gatsby-browser.js` から呼ばれている。

このCSSを変更するとcodeスタイルの変更が出来そうだ。

## prismjsとは
そもそもこのprismjsとは何者なのか。
[prismjsの公式ページ](https://prismjs.com/) にアクセスしてみると、JavaScriptとCSSがセットになったライブラリらしいということが分かった。
公式ページや各種Blogなどをみるとやりたいことが全て実現出来そうなライブラリであることが分かったので導入してみる。

## 導入について
gatsbyのスターターを用いて作成していると最初から導入はされている。
ここでは手動で再度インストールする場合があるかもしれないのでコマンドを記載しておく。
```bash
// npm
$ npm install -S prismjs gatsby-remark-prismjs 

// yarn
$ yarn add gatsby-transformer-remark gatsby-remark-prismjs prismjs 
```

`CSS` については [prism.js](https://prismjs.com/) のページから好きなテーマや必要な言語、プラグインを選択し、CSSファイルとしてダウンロードする。
ダウンロードしたCSSを `static/css/prismjs/download.css` などの場所に設置し、`gatsby-browser.js` に設置場所を追記する。このとき、theme.min.cssの表記を削除しておく。
```javascript:title=gatsby-browser.js
require('./static/css/prismjs/download.css');
```

これで `prism.js` が導入でき、モダンな感じのcodeスタイルに出来たはず。
次は、codeにタイトルを設定できるようにする。

## タイトルの設定方法
タイトルを表示させるようなプラグインがすでにあるのでそれを導入する。
```bash
$ yarn add gatsby-remark-prismjs-title
```

`gatsby-config.js` 内の `gatsby-transformer-remark` 内にタイトルを表示させるプラグイン `gatsby-remark-code-titles` を記載する。
`gatsby-transformer-remark` 内で書かれているプラグインの一番上に書かれないと効かないようなので一番に必ず書くこと。
```javascript:title=gatsby-config.js
・・・（略)・・・
{
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-code-titles',
          'gatsby-remark-prismjs',
・・・（略)・・・
}
```

`CSS`にも `gatsby-code-title` を追記する。
codeで使用するCSSなので、ここではprismjsで使用しているCSSに追記するようにする。
```CSS:title=static/css/prismjs/download.css
.gatsby-code-title {
  display: block;
  position: relative;
  background: #9bcad0;
  width: auto;
  top: 10px;
  text-align: left;
  text-indent: .5em;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
}

.gatsby-code-title span {
  display: inline;
  position: relative;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  color: #eee;
  background: #777;
  border-top-left-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
  padding: 3px;
  top: 1px;
}
```

結果、codeスタイルで書かれた箇所がモダンな感じにすることが出来た。
