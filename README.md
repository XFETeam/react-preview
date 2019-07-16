# react-preview ([demo](https://browniu.com/react-preview))

> Image preview in react

[![NPM](https://img.shields.io/npm/v/react-wxpreview.svg)](https://www.npmjs.com/package/react-wxpreview) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install（**命名冲突请使用 wxpreview 安装**）

```bash

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
        
        {/*method 1-图片元素*/}
        <Preview loop={true} bgOpacity={0.95}>
          <div className="gallery">
            <img src="static/preview_1.jpeg" data-preview-proto='static/preview_1_l.jpeg' alt='anything' />
            <br />
            <img src="static/preview_2.png" data-preview-proto='static/preview_2_l.png' alt='anything' />
          </div>
        </Preview>

        {/*method 2-非图片元素*/}
        <Preview animationDuration={300} button={{dom: '.open1', index: 0}}>
          <div className="mount" data-preview-proto='static/preview_3_l.jpg' data-preview-src="static/preview_3.jpg" style={{backgroundImage: 'url(static/preview_3.jpg)'}} />
        </Preview>

        <button className="open1">open1</button>

        {/*method 3-非包裹*/}
        <Preview button={{
          dom: '.open2',
          index: 1
        }} list={['static/preview_4_l.jpg', 'static/preview_5_l.png']} />

        <button className="open2">open2</button>
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

### `data-preview-proto`

组件会查询体内任意位置具有 `data-preview-proto` 属性的html标签，提取属性值（链接）组成预览图集，并为之绑定弹窗触发事件。为已有元素赋予弹窗预览的能力只需要添加该属性，属性值是图片链接。

### `data-preview-src`

组件会自动把查询到的`img`的`src`属性作为缩略图，其他标签 **还可以（非必要）** 添加另外一个属性`data-preview-src`作为缩略图链接。如果图片资源较大时，建议设置缩略图。

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
| button | 单独绑定的触发按钮 | undefault | {dom:'.button',index:0} | object |
| list | 无需包裹单独传入的图集链接(须配合button使用) | undefault | ['image1.jpg','image2.jpg'] | array |



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

### 1.0.8

* 添加可单独绑定激活事件元素的接口
* 拓展非包裹的画集生成方式
* 优化部分执行逻辑，提高稳定性

### 1.0.7

* 将生产代码编译至ES5

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
