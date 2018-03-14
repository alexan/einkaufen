import 'jquery-ui/themes/base/slider.css'
import 'jquery-ui/themes/base/theme.css'
import Slider from 'jquery-ui/ui/widgets/slider'
import ImageMap from 'image-map/image-map.js'

import './view.pcss'

import $ from 'jquery'

let animating = false
let slider
let open
let reinit
const $target = $('.view .diff_list')
const $before = $('.view .before')
const $afterOuter = $('.view .after-outer')
const $after = $('.view .after')
const $afterHolder = $('.view .after-holder')
const $slider = $('.slider')
let value = 0
let width
let height

let imageMap
let detailImageMap
let packa

const changeImage = pack => {
   $('.view .vr').removeClass('visible')
   $(`.view .vr-${open}-${pack}`).addClass('visible')
   $('.view .pack-container').addClass('show')
   packa = pack
   if(!detailImageMap) {
      detailImageMap = new ImageMap(`.view .vr-detail.vr-${open}-${packa}`)
   } else {
      detailImageMap.selector = $(`.view .vr-detail.vr-${open}-${packa}`).toArray()
      detailImageMap.update()
   }
   
}

$('.tigerino').click(() => {
   changeImage('tigerino')
})
$('.fitline').click(() => {
   changeImage('fitline')
})
$('.yogu').click(() => {
   changeImage('yogu')
})
$('.naturana').click(() => {
   changeImage('naturana')
})

$('.view .vr-pack, .view .close').click(() => {
   $('.view .vr').removeClass('visible')
   $(`.view .vr-${open}`).addClass('visible')
   imageMap.selector = $('.view .after-holder img[usemap].visible').toArray()
   $('.view .pack-container').removeClass('show')
   imageMap.update()
})

const init = (router) => {
   $before.css({ height: '', })
   width = $before.width()
   height = $before.width() / 2 //set aspect
   $before.css({ height, })

   if(!slider) {
      slider = new Slider({
         max: 1,
         step: 0.001,
         value,
         classes: {
            'ui-slider': '',
            'ui-slider-handle': '',
         },
         slide(event, { value: newValue }) {
            value = newValue
            $after.css({ width : afterWidth(), })
         },
         change(event, { value: newValue }) {
            value = newValue
            $after.css({ width : afterWidth(), })
         },
      }).element.appendTo('.view .slider')
   }

   if(reinit) {
      let interval = setInterval(() => {
         value = value + 0.003
         slider.slider('value', value)
         if(value >= 1) {
            value = 1
            clearInterval(interval)
         }
      }, 10)

      reinit = false
   }

   $after
      .css({ width : afterWidth(), height, })
   $afterOuter
      .css({ width, height, })
   $afterHolder
      .css({ width, height, })
   $slider 
      .css({ width, })

   if(!imageMap) {
      imageMap = new ImageMap('.view .after-holder img[usemap].visible')
   } else {
      imageMap.selector = $('.view .after-holder img[usemap].visible').toArray()
      imageMap.update()
   }
   if(detailImageMap) {
      detailImageMap.selector = $(`.view .vr-detail.vr-${open}-${packa}`).toArray()
      detailImageMap.update()
   }
   $('.view .kaufen, .view .detail-area').click(() => {
      router.navigate(`finish/${open}/${packa}`)
   })
}

const afterWidth = () =>  value *  width

const cleanUp = () => {
   $('.view .kaufen, .view .detail-area').off('click')
}

export default {
   handler: (openPerson = 'max', router) => {
      reinit = true
      value = 0
      open = openPerson
      $('body').addClass(`select-${openPerson}`)
      $('body').addClass('view-open')
      $(`.view .vr-${openPerson}`).addClass('visible')

      init(router)

      $(window).on('resize.view', () => {
         cleanUp()
         init(router)
      })
   },
   leave: (openPerson = 'max') => {
      cleanUp()
      $(`.view .vr`).removeClass('visible')
      $('body').removeClass(`select-${openPerson}`)
      $('body').removeClass('view-open')
      $(`.view .vr-${open}-${packa}`).removeClass('visible')
      $('.view .pack-container').removeClass('show')
      $(window).off('.view')
   },
}