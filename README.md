react-preview ([demo](https://browniu.com/react-preview))

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
        
        {/*method 1-图片元素查询*/}
        <Preview loop={true} bgOpacity={0.95} fullClose={true}>
          <div className="gallery">
       			<img src="static/preview_1.jpeg" data-preview-proto='static/preview_1_l.jpeg' data-preview-title='Van Gogh' />
            <br />
            <img src="static/preview_2.png" data-preview-proto='static/preview_2_l.png' data-preview-title='Northern Europe' />
          </div>
        </Preview>

        {/*method 2-非图片元素查询*/}
        <Preview animationDuration={300} button={{dom: '.open1', index: 0}}>
          <div className="mount" data-preview-proto='static/preview_3_l.jpg' data-preview-src="static/preview_3.jpg" style={{backgroundImage: 'url(static/preview_3.jpg)'}} />
        </Preview>

        <button className="open1">open1</button>

        {/*method 3-非包裹式调用*/}
        <Preview openButton={{
          dom: '.open2',
          index: 1
        }} list={this.state.list} />
				{/*异步更新数据-JS激活*/}
        <button className="open2x" onClick={() => {
          this.setState({list: ['static/preview_2_l.png']})
          fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(() => {
              window.wxPreviewActive()
            })
        }}>open2x
        </button>
        {/*异步更新数据-JS激活*/}
        <button className="open2y" onClick={() => {
          this.setState({list: ['static/preview_4_l.jpg']})
          setTimeout(() => {
            window.wxPreviewActive()
          }, 50)
        }}>open2y
        </button>
      </div>
    )
  }
}
```

标准的可被查询的标签

```jsx
<img src="image_m.jpg" data-preview-proto='image_l.jpg' data-preview-title='image' />
```

```jsx
<div data-preview-src="image_2_m.jpg" data-preview-proto='image_2_l.jpg' data-preview-title='image' />
```

## Theory

### **`data-preview-proto`** (必须携带的参数)

组件会查询体内任意位置具有 `data-preview-proto` 属性的html标签，提取属性值（链接）组成预览图集，并为之绑定弹窗触发事件。为已有元素赋予弹窗预览的能力只需要添加该属性，属性值是图片链接。

### `data-preview-src`（可选）

组件会自动把查询到的`img`的`src`属性作为缩略图，其他标签 **还可以（非必要）** 添加另外一个属性`data-preview-src`作为缩略图链接。如果图片资源较大时，建议设置缩略图。

### `data-preview-title`（可选）

组件会读取属性值作为当前图片附带的标题信息，提供默认显示样式，可通过`titleStyle`覆盖自定义样式

## Props

| Name      | Description                | Defalt | Example   | Type        |
| :-------- | -------------------------- | ------ | :-------- | :---------- |
| loop      | 是否允许图集循环           | false  | true      | boolean     |
| bgOpacity | 背景透明度                 | 0.8    | 0.8       | number(0-1) |
| spacing   | 图集间距                   | 0.12   | 0.12      | Number(0-1) |
| showHideOpacity   | 显示和关闭时是否开启透明渐变    | true   | false      | boolean |
| fromPosition |  从点击位置弹出的持续时间（设置为0时禁用）    | true | false | number(ms) |
| maxSpreadZoom   |  双指缩放的最大比率   | 2   | 1      | number |
| rate   | 高分辨率与预览图的比率 | 3  | 3      | number     |
| closeListen | 关闭图集时的回调函数 | undefalut | ()=>{console.log('close')} | function |
| closeButtonSize | 自定义默认关闭按钮尺寸 | 50 | 60 | number(px) |
| fullClose | 移动端遮罩层点击触发关闭（对性能有一定影响） | false | fullClose={true} | boolean |
| openButton | 单独绑定的触发按钮 | undefault | {dom:'.button',index:0} | object |
| list | 无需包裹单独传入的图集链接 | undefault | ['image1.jpg',{src:'image2.jpg',tit:'something'}] | array |
| titleStyle | 图片标题的自定义样式 | {} | {color:'pink'} | object |

## Event

激活组件

| Name                     | Description      |
| ------------------------ | ---------------- |
| window.wxPreviewActive() | 全局激活图集事件 |

图集被打开的时候会注册下列全局事件，关闭的时候会自动销毁，请在图集打开状态下进行调用

| Name                               | Description          |
| ---------------------------------- | -------------------- |
| window.wxPreview.close()           | 全局关闭图集事件     |
| window.wxPreview.destroy()         | 全局销毁图集事件     |
| window.wxPreview.getCurrentIndex() | 获取当前活动元素序列 |



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

### 1.1.3

* 移动端开放遮罩层关闭接口

### 1.1.2

* 新增全局激活事件
* 新增全局关闭/销毁/查询索引事件
* 内置自更新机制，列表数据变更时自动重载组件

### 1.0.9

* 可添加图片标题
* 提供自定义标题样式接口
* 提供图集关闭时的回调接口
* 从点击位置弹出属性：更改 `animationDuration` 为 `fromPosition`

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
