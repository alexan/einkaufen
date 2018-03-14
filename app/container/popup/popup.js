import $ from 'jquery'
let animating = false

export default {
   handler: (firstSlide = 'max', router) => {
      let popups = [
         'max',
         'anna',
         'georg'
      ]
      let open
      animating = false

      $('.popup-head, .popup .popup-headline, .popup-atribute, .button').click((event) => {
         event.preventDefault()
         if(!animating) {
            router.navigate(`shop/${popups[open]}`)
         }
      })   

      const nextPopup = () => {
         if(!animating) {
            open = open + 1
            if(open === popups.length) {
               open = 0
            }
            openPopup(popups[open])
         }
      }

      const prevPopup = () => {
         if(!animating) {
            open = open - 1
            if(open === -1) {
               open = popups.length - 1
            }
            openPopup(popups[open])
         }      
      }
      const speed = 500

      const openPopup = (popup) => {
         open = popups.indexOf(popup)

         const $last =  $('.popup.show')
         const $open =  $(`.popup.${popup}`)
         if(!$open.hasClass('.show')) {
            $last.animate({
               opacity: 0,
            }, speed, () => {
               $last.removeClass('show')
            })   
   
            if($last.length) {
               animating = true
               $open
                  .css({ 'display': 'block', 'opacity': 0, })
                  .animate({
                     opacity: 1,
                  }, speed, () => {
                     $open.css('display', '')   
                     $open.addClass('show')
                     animating = false
                  })
            } else {
               $open.addClass('show')
               $open.css('opacity', 1)
            }

            $('.nav-dots span').removeClass('nav-dot-current')
            $(`.nav-dots .${popup}`).addClass('nav-dot-current')
         }
      }

      $('.nav-arrow-prev').click(() => {
         prevPopup()
      })
      $('.nav-arrow-next').click(() => {
         nextPopup()
      })

      $('.nav-dots span').click(event => {
         if(!animating) {
            if(event.currentTarget.classList.contains('max')) {
               openPopup('max')
            }
            if(event.currentTarget.classList.contains('anna')) {
               openPopup('anna')
            }
            if(event.currentTarget.classList.contains('georg')) {
               openPopup('georg')
            }
         }
      })

      $('body').addClass('popup-open')
      openPopup(firstSlide)
   },
   leave: () => {
      $('body').removeClass('popup-open')
      $('.nav-dots span').removeClass('nav-dot-current')
      $('.popup').removeClass('show')
      $('.popup').css({ 'display': '', 'opacity': '', })
      $('.popup-head, .popup .popup-headline, .popup-atribute, .button').off('click')
      $('.nav-arrow-prev').off('click')
      $('.nav-arrow-next').off('click')
      $('.nav-dots span').off('click')
   },
}