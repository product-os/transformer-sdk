# transformer-sdk

Transformer SDK handles transformer bootstrap and IO so that implementing a transformer is easy.

Import the SDK:

`import * as sdk from 'transformer-sdk'`

Implement the transformation function, pass it to `sdk.transform` hook:

```
sdk.transform(manifest => {
	// implement transformation
	return results
});
```


