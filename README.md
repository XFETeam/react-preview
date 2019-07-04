# react-preview ([demo](https://browniu.com/react-preview))

> Image preview in react

[![NPM](https://img.shields.io/npm/v/react-preview.svg)](https://www.npmjs.com/package/react-preview) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-preview
```

or

```bash
yarn add react-preview
```

## Usage

```jsx
import React, { Component } from 'react'

import Preview from 'react-preview'

class Example extends Component {
  render () {
    return (
      <div>
        <Preview>
          <div className="gallery">
            <img src="image_m.jpg" alt='img' data-preview-proto='image_l.jpg' />
            <img src="image_2_m.jpg" alt='img' data-preview-proto='image_2_l.jpg' />
          </div>
        </Preview>
      </div>
    )
  }
}
```

## Theory

组件会寻找体内 jsx中任意位置具有 `data-preview-proto`属性的`img`标签，提取其属性值（链接）组成图集，并为之绑定弹窗触发事件。因此，若要为已有`img`元素赋予弹窗预览的能力就需要添加 `data-preview-proto`属性，属性的值是图片的高分辨率版本(3x)的链接。

## Props

| Name      | Description                | Defalt | Example   | Type        |
| :-------- | -------------------------- | ------ | :-------- | :---------- |
| `gallery` | 图集分组的ID               | ''     | gallery_1 | string      |
| loop      | 是否允许图集循环           | false  | true      | boolean     |
| bgOpacity | 背景透明度                 | 0.8    | 0.8       | number(0-1) |
| spacing   | 图集间距                   | 0.12   | 0.12      | Number(0-1) |
| preload   | 是否允许预加载高分辨率图片 | false  | true      | boolean     |
| rate   | 高分辨率与预览图的比率 | 3  | 3      | number     |

## Events

| Name  | Description | Defalt  |
| :---- | ----------- | ------- |
| Init  | 初始化图集  | nothing |
| close | 关闭图集    | nothing |

## Q&A

### 多个图集分组

在同一个页面使用多个图集分组时必须`props`传入一个**唯一值**作为图集的ID

```jsx
<Preview gallery={'xixi'}>
   <img src="some_m.jpg" data-preview-proto='some_l.jpg' alt='anything' />
</Preview>
<Preview gallery={'haha'}>
   <img src="some_m.jpg" data-preview-proto='some_l.jpg' alt='anything' />
</Preview>
```

## Requirements

[PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)

## Update

### 1.0.1

* 修复切换图片后无法更新返回位置的错误
* 将`photoSwipe`转为外置依赖

## License

MIT © [browniu](https://github.com/browniu)
