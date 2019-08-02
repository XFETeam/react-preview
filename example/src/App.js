import React, {Component} from 'react'

import Preview from 'react-preview'
import axiso from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: ['static/preview_4_l.jpg', 'static/preview_5_l.png', 'static/preview_1_l.jpeg'],
      serve: ['https://test-ws.xoyo.com/jx3/trcarnival190708/get_work_by_id?work_id=1&__ts__=1564744528769&callback=__xfe2', 'http://test-ws.xoyo.com/jx3/trcarnival190708/get_work_by_id?work_id=22&__ts__=1564746489989&callback=__xfe2']
    }
  }

  render() {
    return (
      <div>

        {/*method 1*/}
        <Preview loop={true} bgOpacity={0.95} titleStyle={{color: 'pink'}} fullClose={false}>
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
        <button onClick={async () => {
          this.setState({list: await this.getList(this.state.serve[0])})
          setTimeout(() => window.wxPreviewActive())
        }}>open3
        </button>

        {/*异步更新数据-JS激活*/}
        <button onClick={async () => {
          this.setState({list: await this.getList(this.state.serve[1])})
          setTimeout(() => window.wxPreviewActive())
        }}>open4
        </button>
      </div>
    )
  }

  getList(port) {
    return new Promise((resolve) => {
      axiso.get(port).then(async (res) => {
        res = res.data.split('__xfe2(')[1].split(');')[0]
        res = JSON.parse(res)
        res = res.data.works_list
        res = await Promise.all(res.map(e => e.image_url))
        resolve(res)
      })
    })
  }

}
