import 'jquery-mousewheel'
import debounce from 'debounce'

class RotateScroll {

   constructor($element) {
      this.$element = $element
      this.direction = 'vertical'

      this.$element.mousewheel((event, delta) => this.onMousewheel(event, delta))
      this.$element.on('touchstart', (event) => this.onTouchstart(event))
      this.$element.on('touchmove', (event) => this.onTouchmove(event))
      this.verticalCallback = () => {}
      this.horizontalCallback = () => {}
      this.callback = () => {}
      this.disable = false
      this.disableScroll = false
   }

   onMousewheel(event, delta) {
      if(!this.disable) {
         if(!this.disableScroll) {
            this.addClass(delta)
            if(this.direction === 'vertical') {
               this.$element.scrollTop(this.$element.scrollTop() - delta)
            } else {
               this.$element.scrollLeft(this.$element.scrollLeft() - delta)
            }
            this.triggerCallback()
         }
         event.preventDefault()
         event.stopPropagation()
      }
   }

   onTouchstart(event) {
      if(!this.disable || !this.disableScroll) {
         this.lastY = event.originalEvent.touches[0].clientY
      }
   }

   onTouchmove(event) {
      if(!this.disable) {
         if(!this.disableScroll) {
            let currentY = event.originalEvent.touches[0].clientY
            let delta = currentY - this.lastY 
            this.addClass(delta)
            if(this.direction === 'vertical') {
               this.$element.scrollTop(this.$element.scrollTop() - delta)
            } else {
               this.$element.scrollLeft(this.$element.scrollLeft() - delta)
            }
            this.triggerCallback()
      
            this.lastY = currentY
         }
         event.preventDefault()
         event.stopPropagation()
      }
   }

   addClass(delta) {
      this.$element.removeClass('forward-horizontal')
      this.$element.removeClass('backward-horizontal')
      this.$element.removeClass('forward-vertical')
      this.$element.removeClass('backward-vertical')

      if(delta > 0) {
         this.$element.addClass(this.direction === 'vertical' ? 'backward-vertical' : 'backward-horizontal')
      } else {
         this.$element.addClass(this.direction === 'vertical' ? 'forward-vertical' : 'forward-horizontal')
      }
   }

   triggerCallback() {
      this.callback()
      if(this.direction === 'vertical') {
         const scroll = this.$element.scrollTop()
         if(scroll <= 0) {
            this.verticalCallback()
         }
      } else {
         const scroll = this.$element.scrollLeft()
         if(scroll <= 0) {
            this.horizontalCallback()
         }
      }
   } 

   toggleDirection() {
      if(this.direction === 'vertical') {
         this.direction = 'horizontal'
      } else {
         this.direction = 'vertical'
      }
   }
}

export default class extends RotateScroll {

   constructor($element) {
      super($element)
      this.addClass = debounce(super.addClass, 25, true)
   }
}