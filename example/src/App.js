import React, {Component} from 'react'

import Preview from 'react-preview'

export default class App extends Component {
  render() {
    return (
      <div>

        {/*method 1*/}
        <Preview loop={true} bgOpacity={0.95} titleStyle={{color: 'pink'}}>
          <div className="gallery">
            <img src="static/preview_1.jpeg" data-preview-proto='static/preview_1_l.jpeg' data-preview-title='Van Gogh' />
            <br />
            <img src="static/preview_2.png" data-preview-proto='static/preview_2_l.png' data-preview-title='Northern Europe' />
          </div>
        </Preview>

        {/*method 2*/}
        <Preview animationDuration={300} button={{dom: '.open1', index: 0}}>
          <div className="mount" data-preview-proto='static/preview_3_l.jpg' data-preview-src="static/preview_3.jpg" style={{backgroundImage: 'url(static/preview_3.jpg)'}} />
        </Preview>

        <button className="open1">open1</button>

        {/*method 3*/}
        <Preview button={{
          dom: '.open2',
          index: 1
        }} list={['static/preview_4_l.jpg', 'static/preview_5_l.png', {
          src: 'static/preview_1_l.jpeg',
          title: 'something'
        }]} />

        <button className="open2">open2</button>
      </div>
    )
  }
}
