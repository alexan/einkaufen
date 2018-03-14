import $ from 'jquery'
import imagesLoaded from 'imagesloaded'

import './loading/loading.pcss'
import './container.pcss'

import scenes from './scenes.js'

imagesLoaded.makeJQueryPlugin($)

const $container = $('.container')

$container
   .imagesLoaded({ background: '.slide1,.vslide2 .top,.vslide3 .top' })
   .done(() => {
      $container.removeClass('container--loading')
      scenes()
   })
