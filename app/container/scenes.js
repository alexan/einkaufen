import Navigo from 'navigo'

import popup from './popup/popup.js'
import slide2 from './slide2/slide2.js'
import vslides from './vslides.js'
import view from './view/view.js';
import finish from './finish/finish.js';

const root = null
const useHash = true
const hash = '#!'
const router = new Navigo(root, useHash, hash)

export default () => {
   router
   .on('select', (params, query) => {
      popup.handler(query, router)
   }, {
      leave: popup.leave,
   })
   .on('shop/:with',(params, query) => {
      vslides.handler(params.with, router)
   }, {
      leave(params) {
         vslides.leave(params.with)
      },
   })
   .on('view/:with',(params, query) => {
      view.handler(params.with, router)
   }, {
      leave(params) {
         view.leave(params.with)
      },
   })
   .on('finish/:with/:packa',(params, query) => {
      finish.handler(params.with, params.packa, router)
   }, {
      leave(params) {
         finish.leave(params.with, params.packa)
      },
   })
   .on('*', () => {
      slide2.handler(router)
   },{
      leave: slide2.leave,
   })
   .resolve()
}