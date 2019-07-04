import React, {Component} from 'react'

import Preview from 'react-preview'

export default class App extends Component {
  render() {
    return (
      <div>
        <Preview loop={true} bgOpacity={0.95}>
          <div className="gallery">
            <img src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg" data-preview-proto='https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg' alt='anything' />
            <br />
            <img src="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg" data-preview-proto='https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg' alt='anything' />
            <div className="test">
              <img src="https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg" data-preview-proto='https://farm6.staticflickr.com/5584/14985868676_b51baa4071_h.jpg' alt='anything' />
            </div>
          </div>
        </Preview>
        <Preview animationDuration={0}>
          <div className="bear" data-preview-proto='static/lake_l.jpg' />
          <div className="mount" data-preview-proto='https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg' data-preview-src="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg" />
        </Preview>
      </div>
    )
  }
}
