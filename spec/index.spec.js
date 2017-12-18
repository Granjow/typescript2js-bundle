const
    fs = require( 'fs' ),
    path = require( 'path' ),
    rimraf = require( 'rimraf' ),
    buildBundle = require( '..' ).buildBundle;

describe( 'Bundler', () => {
    it( 'should run without error', ( done ) => {

        buildBundle(
            'my-bundle',
            path.join( __dirname, 'dist' ),
            [
                path.join( __dirname, 'in.ts' ),
                path.join( __dirname, 'in.js' ),
            ]
        ).then(
            () => {
                expect( true ).toBe( true );
            },
            err => {
                console.error( err );
                expect( true ).toBe( false );
            }
        ).then( done );
    } );

    it( 'compiles ES6 to ES5', ( done ) => {
        fs.readFile( path.join( __dirname, 'dist', 'my-bundle.js' ), { encoding: 'utf8' }, ( err, data ) => {
            expect( err ).toBe( null );
            console.log( data );
            const constFound = /const\s/.test( data );
            expect( constFound ).toBe( false, 'JS code contains the const keyword from ES6' );
            done();
        } );
    } );
} );


xdescribe( 'Cleanup', () => {
    it( 'removes test files', ( ok ) => {
        rimraf( path.join( __dirname, 'dist' ), () => {
            expect( true ).toBe( true );
            ok();
        } );
    } );
} );