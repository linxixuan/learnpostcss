var gulp = require('gulp');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');

gulp.task('default', function() {
    var processors = [
        require('precss'),
		boxShadow,
		// changeColor,
		error
    ];

    gulp.src('./src/**/*.css')
        .pipe(postcss(processors))
        .pipe(rename(function(path) {
            path.extname = ".css"
        }))
        .pipe(gulp.dest('./build'));
});

function boxShadow(css) {
    css.walkDecls(walker);

    function walker(decl) {

		if (decl.prop === 'box-shadow') {
			decl.cloneAfter({ prop: '-moz-' + decl.prop });
			decl.cloneAfter({ prop: '-webkit-' + decl.prop });
		}

		return decl;
    }
};

function changeColor(css) {
    css.walkDecls(walker);

    function walker(decl) {
		if (decl.value.indexOf('red') !== -1) {
			decl.value = decl.value.replace('red', '#f00');
		}

		return decl;
    }
};

function error(css) {
    css.walkDecls(walker);

    function walker(decl) {
		if (decl.value.indexOf('$') !== -1) {
			throw decl.error('do not use variable! ', { word: '$'} );
		}

		return decl;
    }
}
