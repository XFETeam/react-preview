import React, {Component} from 'react'
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'

import 'photoswipe/dist/photoswipe.css'
// import 'photoswipe/dist/default-skin/default-skin.css'

export default class ExampleComponent extends Component {
  render() {
    return (
      <div className={'react-preview'}>

        {this.props.children}

        <div className="my-gallery">
          <figure>
            <a href="static/gallery_1.png" data-size="1523x908" style={{tapHighlightColor: 'transparent'}}>
              <img src="static/gallery_1_s.png" width={'250px'} />
            </a>
          </figure>

          <figure>
            <a href="static/gallery_2.png" data-size="1520x978">
              <img src="static/gallery_2_s.png" width="250" />
            </a>
          </figure>
        </div>

        <div className='pswp' tabIndex='-1' role='dialog' aria-hidden='true'>
          <div className='pswp__bg' style={{opacity: 0}} />
          <div className='pswp__scroll-wrap'>
            <div className='pswp__container'>
              <div className='pswp__item' />
              <div className='pswp__item' />
              <div className='pswp__item' />
            </div>

            <div className='pswp__ui pswp__ui--hidden' style={{opacity: 1}}>

              <div className='pswp__top-bar'>

                <div className='pswp__counter' style={{display: 'none'}} />

                <button className='pswp__button pswp__button--close' title='Close (Esc)'>close</button>

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
      </div>
    )
  }

  componentDidMount() {
    // this.photoView()
    this.browniuView()
  }

  browniuView() {
    [...document.querySelector('.react-preview').querySelectorAll('img[data-proto]')].map(dom => {
      // console.log(dom)
      // console.log(dom.height)
      dom.setAttribute('style', 'cursor: pointer')
      // moni
      let items = [{
        msrc: 'static/gallery_1_s.png',
        src: 'static/gallery_1.png',
        h: 908,
        w: 1523
      },{
        msrc: 'static/gallery_2_s.png',
        src: 'static/gallery_2.png',
        h: 908,
        w: 1523
      },]
      let options = {}
      let pswpElement = document.querySelectorAll('.pswp')[0]
      dom.onclick = () => {
        // openPhotoSwipe(1, galleryElements[0], true, true)
        console.log('xixi')
        let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, items, options)
        gallery.init()
      }
    })
  }

  photoView() {
    (function initPhotoSwipeFromDOM(gallerySelector) {

      // parse slide data (url, title, size ...) from DOM elements
      // (children of gallerySelector)
      function parseThumbnailElements(el) {
        let thumbElements = el.childNodes,
          numNodes = thumbElements.length,
          items = [],
          figureEl,
          linkEl,
          size,
          item

        for (let i = 0; i < numNodes; i++) {

          figureEl = thumbElements[i] // <figure> element

          // include only element nodes
          if (figureEl.nodeType !== 1) {
            continue
          }

          linkEl = figureEl.children[0] // <a> element

          size = linkEl.getAttribute('data-size').split('x')

          // create slide object
          item = {
            src: linkEl.getAttribute('href'),
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10)
          }

          if (figureEl.children.length > 1) {
            // <figcaption> content
            item.title = figureEl.children[1].innerHTML
          }

          if (linkEl.children.length > 0) {
            // <img> thumbnail element, retrieving thumbnail url
            item.msrc = linkEl.children[0].getAttribute('src')
          }

          item.el = figureEl // save link to element for getThumbBoundsFn
          // console.log(item)
          items.push(item)
        }

        return items
      }

      // find nearest parent element
      let closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn))
      }

      // triggers when user clicks on thumbnail
      let onThumbnailsClick = function (e) {
        // console.log(e)
        e = e || window.event
        e.preventDefault ? e.preventDefault() : e.returnValue = false

        let eTarget = e.target || e.srcElement
        // console.log(eTarget)
        // find root element of slide
        let clickedListItem = closest(eTarget, function (el) {
          return (el.tagName && el.tagName.toUpperCase() === 'FIGURE')
        })
        // console.log(clickedListItem)

        if (!clickedListItem) {
          return
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        let clickedGallery = clickedListItem.parentNode
        let childNodes = clickedListItem.parentNode.childNodes
        let numChildNodes = childNodes.length
        let nodeIndex = 0
        let index
        // console.log(clickedGallery)
        for (let i = 0; i < numChildNodes; i++) {
          if (childNodes[i].nodeType !== 1) {
            continue
          }

          if (childNodes[i] === clickedListItem) {
            index = nodeIndex
            break
          }
          nodeIndex++
        }

        if (index >= 0) {
          // open PhotoSwipe if valid index found
          openPhotoSwipe(index, clickedGallery)
        }
        return false
      }

      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      let photoswipeParseHash = function () {
        let hash = window.location.hash.substring(1),
          params = {}

        if (hash.length < 5) {
          return params
        }

        let lets = hash.split('&')
        for (let i = 0; i < lets.length; i++) {
          if (!lets[i]) {
            continue
          }
          let pair = lets[i].split('=')
          if (pair.length < 2) {
            continue
          }
          params[pair[0]] = pair[1]
        }

        if (params.gid) {
          params.gid = parseInt(params.gid, 10)
        }

        return params
      }

      let openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {

        let pswpElement = document.querySelectorAll('.pswp')[0]
        let gallery
        let options
        let items

        items = parseThumbnailElements(galleryElement)
        // console.log(items)

        // define options (if needed)
        options = {

          // define gallery index (for URL)
          galleryUID: galleryElement.getAttribute('data-pswp-uid'),

          getThumbBoundsFn: function (index) {
            // See Options -> getThumbBoundsFn section of documentation for more info
            let thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
              pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
              rect = thumbnail.getBoundingClientRect()

            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }

        }

        // PhotoSwipe opened from URL
        if (fromURL) {
          if (options.galleryPIDs) {
            // parse real index when custom PIDs are used
            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
            for (let j = 0; j < items.length; j++) {
              if (items[j].pid == index) {
                options.index = j
                break
              }
            }
          } else {
            // in URL indexes start from 1
            options.index = parseInt(index, 10) - 1
          }
        } else {
          options.index = parseInt(index, 10)
        }

        // exit if index not found
        if (isNaN(options.index)) {
          return
        }

        if (disableAnimation) {
          options.showAnimationDuration = 0
        }

        // Pass data to PhotoSwipe and initialize it
        console.log(pswpElement, items, options)
        // gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, items, options)
        // gallery.init()

      }

      // loop through all gallery elements and bind events
      let galleryElements = document.querySelectorAll(gallerySelector)

      for (let i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1)
        galleryElements[i].onclick = onThumbnailsClick
      }

      // browniu
      [...document.querySelector('.react-preview').querySelectorAll('img[data-proto]')].map(dom => {
        console.log(dom)
        // console.log(dom.height)
        dom.setAttribute('style', 'cursor: pointer')
        dom.onclick = onThumbnailsClick
      })

      // Parse URL and open gallery if it contains #&pid=3&gid=1
      //       // let hashData = photoswipeParseHash()
      //       // if (hashData.pid && hashData.gid) {
      //       //   console.log('xixi')
      //       // }
      // openPhotoSwipe(1, galleryElements[0], true, true)
    })('.my-gallery')
  }
}
