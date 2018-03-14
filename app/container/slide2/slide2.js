import ScrollMagic from 'scrollmagic'
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'
import $ from 'jquery'

import addIndicators from '../addIndicators.js'
import { TimelineMax } from 'gsap';

let paralaxController
export default {
   handler: (router) => {
      if(!paralaxController) {
         paralaxController = new ScrollMagic.Controller({
            container: '.container',
            globalSceneOptions: { 
               triggerHook: 'onEnter', 
               duration: '100%',
               triggerElement: '.slide2',
            },
         })
   
         const tween = new TimelineLite()
         tween.add([
            TweenLite.to('.slide2-paralax', 1, { y: '100%', ease: Linear.easeNone, }),
            TweenLite.to('.heads', 1, { x: '105%', ease: Linear.easeNone, }),
            TweenLite.to('.head img', 1, { rotation: 360 * 2, ease: SlowMo.ease.config(0.7, 0.7, false), }),
         ])

         addIndicators(
            new ScrollMagic.Scene()
               .setTween(tween)
               .addTo(paralaxController),
            false
         )
      }
      
      $('.slide2 .head').click(event => {
         let firstSlide
         if(event.currentTarget.classList.contains('max')) {
            firstSlide = 'max'
         }
         if(event.currentTarget.classList.contains('anna')) {
            firstSlide = 'anna'
         }
         if(event.currentTarget.classList.contains('georg')) {
            firstSlide = 'georg'
         }
         router.navigate(`select?${firstSlide}`)
      })
   },
   leave: () => {
      $('.slide2 .head').off('click')
   },
}