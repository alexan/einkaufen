import $ from 'jquery'

export default {
   handler: () => {
      $('.vslide2 .verpackung, .vslide2  .bubble-text').each((i, element) => {
         const $element = $(element)
         $element.css('animation-delay', `${Math.random() * 2}s`)
      })
   },
   leave: () => {
      
   },
}