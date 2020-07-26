---
template: post
title: Gatsbyのstarterで作成したサイトの見た目を変える vol.1
slug: /posts/20200725-gatsby
draft: false
date: 2020-07-25T13:24:37.551Z
description: |-
  Gatsbyのstarterを利用して作成したこのサイトの見た目を少しずつ変更していく。
  まずはトップページの記事一覧ページの見た目を変更する。
category: Dev
tags:
  - Dev
  - Gatsby
---
作るだけ作って約1年放置していたものをちょっとずつ手を加えて、フロントエンドなにもわからんマンからちょっとレベルアップを図ろうという計画。
まずは、このBlogサイトの見た目を変更していくことにした。

このBlogサイトは、Gatsby.jsを利用し、lumenのテンプレートを利用している。
見た目はシンプルで好みだが、シンプル過ぎたり、codeの記述あたりが気に入らなかったりと細かいところを修正していきたいなと思っていたので修正をしていく。

導入は下記のようなコマンドを実行し、行った。

```bash
$ gatsby new <Blog名> https://github.com/alxshelepenok/gatsby-starter-lumen.git
```

まずは、下記のことにチャレンジをする。

* 日付表示の変更
* タイトルやカテゴリータグのDesign変更

## 日付表示の変更

変更前は、`format('MMMM YYYY')` で表記がされていた。これを `YYYY/MM/DD` の表記に直していきたい。
Chromeのデベロッパーモードを利用し、 `src/components/Feed/Feed.js` あたりを修正すれば良さそうとあたりを付けて修正していく。

ローカルで下記を実行すると `http://localhost:8000/` で修正内容を参考することができ、修正内容を保存するとリアルタイムで変更されるのでデバッグするときなど便利なので、なにか修正する場合は必ず実行しておくこと。

```bash
$ gatsby develop
```

Feed.jsの下記を変更すると、日付の表示を `YYYY/MM/DD` に変更可能。
```git:title=src/components/Feed/Feed.js
- {moment(edge.node.frontmatter.date).format('MMMM YYYY')}
+ {moment(edge.node.frontmatter.date).format('YYYY/MM/DD')}
```

色合いも変更したいのでCSSも変更する。
`src/components/Feed/Feed.module.scss` のtimeのcolorを変更する。
```css:title=src/components/Feed/Feed.module.scss
&-time {
  font-size: $typographic-small-font-size;
  color: $color-gray;
  font-weight: 600;
  text-transform: uppercase;
}
```

## タイトルやカテゴリータグのDesign変更
変更前は殺風景な感じのDesignだったので色をつけたりし、見た目を変更する
変更箇所はさっきのCSSと同じ `src/components/Feed/Feed.module.scss` でtitleの部分に追記する。
```css:title=src/components/Feed/Feed.module.scss
&-title {
  (略)
  padding: 0.1em 0.4em;
  color: #494949;
  background: #f4f4f4;
  border-left: solid 5px #627da1;
  border-bottom: solid 3px #d7d7d7;
  border-radius: 0.2em;
}

&-category {
  &-link {
    font-size: 0.7em;
    background: #f0f8ff;
    color: $color-gray;
    font-weight: normal;
    text-transform: uppercase;
    padding: 0.2em;
    border: solid 0.1em #f0f8ff;
    border-radius: 0.8em;

    &:hover,
    &:focus {
      color: $color-primary;
      border-bottom: 1px solid $color-primary;
    }
}
```

# 雑感
少しの変更だけど、見やすくなったのではないと思う。
ファイル構成とか全くわからん状態から始まったけど、少し理解できた気がする。
フロント系はちょっと変えるだけで見た目の変化が目に見えて分かるのでちょっと楽しい気がする。

