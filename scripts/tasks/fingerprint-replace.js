module.exports = function (gulp, plugins, consts) {
    return function () {
        var manifest = require(plugins.path.join(consts.VERSIONED_DIST, 'rev-manifest'));
        var cssPath = plugins.path.join(consts.VERSIONED_DIST, 'style-guide.css');
        var docsHtmlPath = plugins.path.join(consts.VERSIONED_DIST, 'docs', '*.html');

        gulp.src(cssPath)
            .pipe(plugins.fingerprint(manifest, {prefix: '../'}))
            .pipe(gulp.dest(consts.VERSIONED_DIST));

        return gulp.src(docsHtmlPath)
            .pipe(plugins.fingerprint(manifest, {
                prefix: '../../',
                regex: /(?:url\(["']?(.*?)['"]?\)|src=["'](.*?)['"]|src=([^\s\>]+)(?:\>|\s)|data=["'](.*?)['"]|href=["'](.*?)['"]|href=([^\s\>]+)(?:\>|\s))/g
            }))
            .pipe(gulp.dest(plugins.path.join(consts.VERSIONED_DIST, 'docs')));
    }
};