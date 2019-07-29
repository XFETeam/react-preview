import React, {Component} from 'react'

import Preview from 'react-preview'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: ['static/preview_4_l.jpg', 'static/preview_5_l.png', 'static/preview_1_l.jpeg']
    }
  }

  render() {
    return (
      <div>

        {/*method 1*/}
        <Preview loop={true} bgOpacity={0.95} titleStyle={{color: 'pink'}} fullClose={true}>
          <div className="gallery">
            <img src="static/preview_1.jpeg" data-preview-proto='static/preview_1_l.jpeg' data-preview-title='Van Gogh' alt='img' />
            <br />
            <img src="static/preview_2.png" data-preview-proto='static/preview_2_l.png' data-preview-title='Northern Europe' alt='img' />
          </div>
        </Preview>

        {/*method 2*/}
        <Preview animationDuration={300} openButton={{dom: '.open1', index: 0}}>
          <div className="mount" data-preview-proto='static/preview_3_l.jpg' data-preview-src="static/preview_3.jpg" style={{backgroundImage: 'url(static/preview_3.jpg)'}} />
        </Preview>

        <button className="open1">open1</button>

        {/*method 3*/}
        <Preview openButton={{
          dom: '.open2',
          index: 1
        }} list={this.state.list} />

        <button className="open2">open2</button>
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
