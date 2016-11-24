var path = require( 'path' ),
    rimraf = require( 'rimraf' ),
    buildBundle = require( '..' ).buildBundle;

describe( 'Bundler', () => {
    it( 'should run without error', ( done ) => {

        buildBundle(
            'my-bundle',
            path.join( __dirname, 'dist' ),
            [ path.join( __dirname, 'in.ts' ) ]
        ).then(
            () => {
                expect( true ).toBe( true );
            },
            err => {
                console.error( err );
                expect( true ).toBe( false );
            }
        ).then( done );
    } )
} );

describe( 'Cleanup', () => {
    it( 'removes test files', ( ok ) => {
        rimraf( path.join( __dirname, 'dist' ), () => {
            expect( true ).toBe( true );
            ok();
        } );
    } );
} );