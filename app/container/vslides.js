import ScrollMagic from 'scrollmagic'
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'
import $ from 'jquery'

import addIndicators from './addIndicators.js'
import RotateScroll from '../rotateScroll.js'
import vslide2 from './vslide2/vslide2.js'
import vslide3 from './vslide3/vslide3.js'

const rotateScroll = new RotateScroll($('.container'))
let horizontalController
export default {
      handler: (openPerson, router) => {
            rotateScroll.disable = false
            rotateScroll.direction = 'horizontal'
            $('body').addClass('vertical-open')
            $('body').addClass(`select-${openPerson}`)

            vslide2.handler({ rotateScroll, openPerson, router, })
            vslide3.handler({ rotateScroll, openPerson, router, })

            if(!horizontalController) {
                  horizontalController = new ScrollMagic.Controller({
                        container: '.container',
                        vertical: false,
                  })
      
                  const triggerHook = '0.2'
                  addIndicators(
                        new ScrollMagic.Scene({
                              duration: '90%',
                              triggerHook,
                        })
                        .setClassToggle('.think', 'show')
                        .addTo(horizontalController),
                        false
                  )
      
                  addIndicators(
                        new ScrollMagic.Scene({
                              triggerElement: '#door-container',
                              offset: -200,
                              triggerHook,
                        })
                        .setTween('#slide-right', { right: 0, })
                        .addTo(horizontalController),
                        false
                  )
      
                  addIndicators(
                        new ScrollMagic.Scene({
                              triggerElement: '#door-container',
                              offset: -200,
                              triggerHook,
                        })
                        .setTween('#slide-left', { left: 0, })
                        .addTo(horizontalController),
                        false
                  )
      
                  addIndicators(
                        new ScrollMagic.Scene({
                              triggerElement: '.brillenregal-trigger',
                              triggerHook: 'onEnter'
                        })
                        .setTween('.brillenregal', { top: '-20vh', })
                        .addTo(horizontalController),
                        false
                  )
            }
      },
      leave: (openPerson) => {
            $('body').removeClass('vertical-open')
            $('body').removeClass(`select-${openPerson}`)
            vslide2.leave({rotateScroll})
            vslide3.leave({rotateScroll})
            rotateScroll.disable = true
      }
}