import React, {Component} from 'react'

import Preview from 'react-preview'

export default class App extends Component {
  render() {
    return (
      <div>
        <Preview>
          <div className="gallery">
            <img src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg" alt='preview' data-proto='https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg' />
            <img src="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg" alt='preview' data-proto='https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg' />
          </div>
        </Preview>
      </div>
    )
  }
}
