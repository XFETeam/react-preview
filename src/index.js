import React, {Component} from 'react'
import {createPortal} from 'react-dom'
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'

import 'photoswipe/dist/photoswipe.css'
import './styles.css'

export default class ExampleComponent extends Component {
  constructor(props) {
    super(props)
    this.dom = document.createElement('div')
    document.body.appendChild(this.dom)
    this.ref = React.createRef()
  }

  render() {
    const {children} = this.props
    return (
      <div ref={this.ref} className={'react-preview'}>
        {children}
        {createPortal(
          <div className='pswp' tabIndex='-1' role='dialog' aria-hidden='true'>
            <div className='pswp__bg' />
            <div className='pswp__scroll-wrap'>
              <div className='pswp__container' style={{padding: '20px'}}>
                <div className='pswp__item' />
                <div className='pswp__item' />
                <div className='pswp__item' />
              </div>
              <div className='pswp__ui pswp__ui--hidden' style={{opacity: 1}}>

                <div className='pswp__top-bar'>

                  <div className='pswp__counter' />

                  <span className='pswp__button pswp__button--close' title='Close (Esc)' onClick={() => {
                    console.log('close')
                  }} />

                  <div className='pswp__preloader'>
                    <div className='pswp__preloader__icn'>
                      <div className='pswp__preloader__cut'>
                        <div className='pswp__preloader__donut' />
                      </div>
                    </div>
                  </div>

                </div>

                <div className='pswp__share-modal pswp__share-modal--hidden pswp__single-tap'>
                  <div className='pswp__share-tooltip' />
                </div>

                <div className='pswp__caption'>
                  <div className='pswp__caption__center' />
                </div>
              </div>
            </div>
          </div>
          , this.dom
        )}
      </div>
    )
  }

  componentDidMount() {
    this.initView()
  }

  componentWillUnmount() {
    if (this.swiper) this.swiper.destroy()
    document.body.removeChild(this.dom)
  }

  getImgSize(src) {
    if (src && src != 'none') {
      let img = new Image()
      src = src.split('url("')[1].split('")')[0]
      img.src = src
      return [img.height, img.width]
    } else {
      return 0
    }
  }

  initView() {
    let images = [...this.ref.current.querySelectorAll('[data-preview-proto]')]

    let items = () => images.map((image) => {
      let bgSrc = getComputedStyle(image).backgroundImage
      return {
        msrc: image.src || image.getAttribute('data-preview-src') || image.getAttribute('data-preview-proto'),
        src: image.getAttribute('data-preview-proto'),
        h: image.height ? image.height * 2 : this.getImgSize(bgSrc)[0] * 2,
        w: image.width ? image.width * 2 : this.getImgSize(bgSrc)[1] * 2
      }
    })

    images.map((image, index) => {
      image.setAttribute('style', 'cursor: pointer')
      let pswpElement = document.querySelectorAll('.pswp')[0]
      image.onclick = (e) => {
        e.preventDefault ? e.preventDefault() : e.returnValue = false
        this.swiper = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, items(), {
          loop: false,
          index: index,
          spacing: 0.12,
          bgOpacity: 0.8,
          getThumbBoundsFn: (index) => {
            let thumbnail = images[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        })
        this.swiper.init()
      }
    })
  }
}
