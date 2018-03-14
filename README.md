# Interfaced

My silly little project to emulate interface behaviour in JavaScript. This will allow you to cram the concept of interfaces down JavaScript's throat. It works in Internet Explorer 11, which should be more than enough for anyone.

See the usage section below for an example of what this package can do. In short, it allows you to create interface-methods that can be implemented on any class or object. You can be 100% sure whether or not something implements your interface because this lbrary guarantees they are unique.

__Side note:__ If you are really committed to using interfaces, you're probably better off using something like [Flow](https://flow.org/) or [TypeScript](https://www.typescriptlang.org/). The upside of this library, I suppose, is that it works in plain-old JavaScript.

## Install

```bash
npm install --save interfaced
```

## Usage

```js
const interfaced = require('interfaced');

const iGetHttpResponse = interfaced('getHttpResponse');

function serializeError(err) {
    if (iGetHttpResponse.implementedOn(err))
        return iGetHttpResponse.call(err);
    else
        return { status: 500 };
}

class MyError extends Error {
    [iGetHttpResponse]() {
        return { status: 400 };
    }
}

console.log(serializeError(new MyError()));
// --> { status: 400 }

// Or like this if you're not using fancy new JavaScript features...

function CustomError() {}

iGetHttpResponse.implementOn(CustomError, function () {
    return { status: 400 };
});

console.log(serializeError(new CustomError()));
// --> { status: 400 }
```

## Contribute

I really appreciate any contribution you would like to make, so don't
hesitate to report issues or submit pull requests.

## License

This project is released under a MIT license.

## About me

I work at [Ambassify](https://www.ambassify.com) and that's just about all you really need to know about me.
