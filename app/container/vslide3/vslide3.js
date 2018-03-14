import $ from 'jquery'

export default {
   handler: ({ rotateScroll, router, openPerson }) => {
      $('.vslide3 .brillenregal, .vslide3 .regal-container').click(() => {
//         $('body').addClass('flipped')
//         rotateScroll.disableScroll = true
         router.navigate(`view/${openPerson}`)

      })
   },
   leave: ({ rotateScroll }) => {
      $('.vslide3 .brillenregal').off('click')
      $('.vslide3 .brille').off('click')
      $('body').removeClass('flipped')
      rotateScroll.disableScroll = false
   },
}