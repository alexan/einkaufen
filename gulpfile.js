const gulp = require('gulp')
const imagemin = require('gulp-imagemin')

const imageminPngquant = require('imagemin-pngquant')
const imageminZopfli = require('imagemin-zopfli')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminGiflossy = require('imagemin-giflossy')

gulp.task('imagemin', () =>
	gulp.src('images/**/*')
		.pipe(imagemin([
			//png
			imageminPngquant({
				 speed: 1,
				 quality: 98 //lossy settings
			}),
			imageminZopfli({
				 more: true
			}),
			//gif
			// imagemin.gifsicle({
			//     interlaced: true,
			//     optimizationLevel: 3
			// }),
			//gif very light lossy, use only one of gifsicle or Giflossy
			imageminGiflossy({
				 optimizationLevel: 3,
				 optimize: 3, //keep-empty: Preserve empty transparent frames
				 lossy: 2
			}),
			//svg
			imagemin.svgo({
				 plugins: [{
					  removeViewBox: false
				 }]
			}),
			//jpg lossless
			imagemin.jpegtran({
				 progressive: true
			}),
			//jpg very light lossy, use vs jpegtran
			imageminMozjpeg({
				 quality: 90
			})
	  ]))
		.pipe(gulp.dest('app/images'))
)