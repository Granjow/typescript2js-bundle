Creates plain JavaScript bundles from TypeScript files.

## Usage

    var path = require( 'path' ),
        buildBundle = require('node-typescript-bundle').buildBundle;
    
    buildBundle(
            'my-bundle',
            path.join( __dirname, 'dist' ),
            [ path.join( __dirname, 'src', 'ts-file.ts' ) ]
    ).then(
            i => console.log( 'Done:', i.files.join( ', ' ) ),
            err => console.error( err )
    );

## Testing

To run the Jasmine unit tests, run:

    npm test
