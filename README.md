# Interfaced

My silly little project to emulate interface behaviour in JavaScript.

## Install

```bash
npm install --save interfaced
```

## Usage

```js
const interfaced = require('interfaced');

const iGetHttpResponse = interfaced('getHttpResponse');

function serializeError(err) {
    if (iGetHttpResponse.implementedBy(err))
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
