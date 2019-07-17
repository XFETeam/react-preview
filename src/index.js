import React, {Component} from 'react'
import {createPortal} from 'react-dom'
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'

import 'photoswipe/dist/photoswipe.css'
import './styles.css'

export default class Preview extends Component {

  static defaultProps = {
    loop: false,
    spacing: 0.12,
    bgOpacity: 0.8,
    showHideOpacity: true,
    animationDuration: 300,
    maxSpreadZoom: 2,
    rate: 2,
    closeButtonSize: 50,
    button: undefined,
    list: undefined,
    titleStyle: {}
  }

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

                  <span style={{
                    height: this.props.closeButtonSize + 'px',
                    width: this.props.closeButtonSize + 'px'
                  }} className='pswp__button pswp__button--close' title='close' />

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

                <div className='pswp__caption' style={this.props.titleStyle}>
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
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.src = src
      img.onload = () => resolve([img.height, img.width])
      img.onerror = reject
    })
  }

  geneItem(images) {
    return Promise.all(
      images.map(async (image, index) => {
        let msrc = image.getAttribute('data-preview-src') || image.getAttribute('data-preview-proto')
        let title = image.getAttribute('data-preview-title') || undefined
        if (image.tagName.toLowerCase() === 'img') msrc = image.src || image.getAttribute('data-preview-proto')
        const bgSize = await this.getImgSize(msrc)
        return {
          msrc: msrc,
          src: image.getAttribute('data-preview-proto'),
          title: title,
          h: bgSize[0] * this.props.rate,
          w: bgSize[1] * this.props.rate
        }
      })
    )

  }

  async initView() {
    let images = [...this.ref.current.querySelectorAll('[data-preview-proto]')]

    if (this.props.list) {
      images = this.props.list.map(image => {
        let src = image
        if (typeof image === 'object') src = image.src
        let img = new Image()
        img.src = src
        img.setAttribute('data-preview-proto', src)
        if (image.title) img.setAttribute('data-preview-title', image.title)
        return img
      })
    } else {
      images.map((image, index) => {
        image.style.cursor = 'pointer'
        image.onclick = (e) => {
          e.preventDefault ? e.preventDefault() : e.returnValue = false
          this.geneView(images, index)
        }
      })
    }

    if (this.props.button) {
      let button = document.querySelector(this.props.button.dom)
      if (button) button.onclick = () => this.geneView(images, this.props.button.index || 0)
    }
  }

  async geneView(images, index) {
    let items = await this.geneItem(images)
    const pswpElement = document.querySelector('.pswp')
    this.swiper = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, items, {
      loop: this.props.loop,
      spacing: this.props.spacing,
      bgOpacity: this.props.bgOpacity,
      showHideOpacity: this.props.showHideOpacity,
      showAnimationDuration: this.props.list ? 0 : this.props.animationDuration,
      hideAnimationDuration: this.props.list ? 0 : this.props.animationDuration,
      maxSpreadZoom: this.props.maxSpreadZoom,
      closeOnVerticalDrag: false,
      index: index,
      history: false,
      getThumbBoundsFn: (index) => {
        let thumbnail = images[index]
        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
        let rect = thumbnail.getBoundingClientRect()
        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
      }
    })
    this.swiper.init()
  }
}
