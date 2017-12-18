const
    fs = require( 'fs' ),
    path = require( 'path' ),
    Browserify = require( 'browserify' ),
    UglifyJS = require( 'uglify-js' );

/**
 *
 * @param {string} bundleName Output file name (without file ending)
 * @param {string} bundleDir Target directory for the bundle
 * @param {string[]} files Input files to bundle
 * @param {object=} tsArgs Arguments for TypeScript (overrides tsconfig.json). For example, { target: 'es5' }
 * @return {Promise}
 */
function buildBundle( bundleName, bundleDir, files, tsArgs ) {

    return new Promise( ( resolve, reject ) => {

        try {
            fs.mkdirSync( bundleDir );
        } catch ( e ) {
            // Probably already exists, ignore
        }

        let dist = path.join( bundleDir, `${bundleName}.js` ),
            distMin = path.join( bundleDir, `${bundleName}.min.js` ),
            distStream = fs.createWriteStream( dist );

        let browserify = Browserify();
        files.forEach( f => browserify.add( f ) );

        let bundle = browserify
            .plugin( 'tsify', tsArgs )
            .transform( 'babelify' )
            .bundle()
            .on( 'error', err => {
                // TypeScript error; ignore
                console.error( err );
            } )
            .pipe( distStream );

        bundle.on( 'finish', () => {
            try {
                const result = UglifyJS.minify( dist );
                fs.writeFileSync( distMin, result.code, { encoding: 'utf-8' } );
                resolve( { files: [ dist, distMin ] } );
            } catch ( err ) {
                console.log( 'Error while minifying.\n', err );
                resolve( { files: [ dist ] } );
            }
        } );

        bundle.on( 'error', err => reject( err ) );

    } );
}

module.exports = {
    buildBundle
};