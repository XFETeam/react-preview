# react-preview ([demo](https://browniu.com/react-preview))

> Image preview in react

[![NPM](https://img.shields.io/npm/v/react-preview.svg)](https://www.npmjs.com/package/react-wxpreview) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash

## 内网
npm install --save react-preview

## 外网
npm install --save react-wxpreview

```

## Usage

```jsx
import React, { Component } from 'react'

import Preview from 'react-preview'

class Example extends Component {
  render () {
    return (
      <div>
        <Preview loop={true} bgOpacity={0.95} >
          <div className="gallery">
            <img src="image_m.jpg" data-preview-proto='image_l.jpg' alt='img'/>
            <div data-preview-src="image_2_m.jpg" data-preview-proto='image_2_l.jpg' />
            <div data-preview-proto='image_2_l.jpg' />
          </div>
        </Preview>
      </div>
    )
  }
}
```

标准的可被查询的标签

```jsx
<img src="image_m.jpg" data-preview-proto='image_l.jpg' alt='img'/>
```

```jsx
<div data-preview-src="image_2_m.jpg" data-preview-proto='image_2_l.jpg' />
```

## Theory

###`data-preview-proto`

组件会寻找体内 jsx中任意位置具有 `data-preview-proto`属性的标签，提取其属性值（链接）组成图集，并为之绑定弹窗触发事件。因此，若要为已有元素赋予弹窗预览的能力就需要添加该属性，属性的值是图片的高分辨率版本(2x)的链接。

### `data-preview-src`

除了`img`外的其他标签**可以**添加另外一个属性`data-preview-src`作为缩略图。

## Props

| Name      | Description                | Defalt | Example   | Type        |
| :-------- | -------------------------- | ------ | :-------- | :---------- |
| loop      | 是否允许图集循环           | false  | true      | boolean     |
| bgOpacity | 背景透明度                 | 0.8    | 0.8       | number(0-1) |
| spacing   | 图集间距                   | 0.12   | 0.12      | Number(0-1) |
| showHideOpacity   | 显示和关闭时是否开启透明渐变    | true   | false      | boolean |
| animationDuration   |  从点击位置弹出的持续时间（设置为0时禁用）    | 300   | 0      | number(ms) |
| maxSpreadZoom   |  双指缩放的最大比率   | 2   | 1      | number |
| rate   | 高分辨率与预览图的比率 | 3  | 3      | number     |
| closeButtonSize | 关闭按钮尺寸 | 50 | 60 | number(px) |

## Q&A

### 多个图集分组

在同一个页面可以使用多个图集分组，分别使用`Preview`组件包裹即可

```jsx
<Preview>
   <img src="some_m.jpg" data-preview-proto='some_l.jpg' alt='anything' />
</Preview>
<Preview>
   <img src="some_m.jpg" data-preview-proto='some_l.jpg' alt='anything' />
</Preview>
```

## Requirements

[PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)

## Update

### 1.0.3

* 异步查询图片尺寸，无需缓存图片或者设置背景样式

### 1.0.2

* 扩展为可查询任意标签
* 优化图集分组的方式，无需传入分组ID

### 1.0.1

* 修复切换图片后无法更新返回位置的错误
* 将`photoSwipe`转为外置依赖

## License

MIT © 西山居 [browniu](https://github.com/browniu)
