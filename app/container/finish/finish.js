import $ from 'jquery'
import './finish.pcss'

export default {
   handler: (openPerson = 'max', pack, router) => {

      $('.finish .again').click(() => {
         router.navigate(`/`)
      })
      $('body').addClass(`select-${openPerson}`)
      $('body').addClass(`kauf-${pack}`)
      $('body').addClass('finish-open')
   },
   leave: (openPerson = 'max', pack) => {
      $('body').removeClass(`select-${openPerson}`)
      $('body').removeClass(`kauf-${pack}`)

      $('body').removeClass('finish-open')
      $('.finish .again').off('click')
   },
}