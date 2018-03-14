import $ from 'jquery'
import './finish.pcss'
let rout


$('.finish .again').click(() => {
   rout.navigate(`/`)
})

export default {
   handler: (openPerson = 'max', pack, router) => {
      rout = router
      $('body').addClass(`select-${openPerson}`)
      $('body').addClass(`kauf-${pack}`)
      $('body').addClass('finish-open')
   },
   leave: (openPerson = 'max', pack) => {
      $('body').removeClass(`select-${openPerson}`)
      $('body').removeClass(`kauf-${pack}`)

      $('body').removeClass('finish-open')
   },
}