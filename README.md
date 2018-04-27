# Logjack  
[![CircleCI](https://circleci.com/bb/hurima/logjack.svg?style=shield&circle-token=28f028a7c40fc666d9db3f16d8e88e85c40707e2)](https://circleci.com/bb/hurima/logjack)![GitHub release](https://img.shields.io/github/release/hubrixco/logjack.svg) [![GitHub license](https://img.shields.io/github/license/hubrixco/logjack.svg)](https://github.com/hubrixco/logjack/blob/master/LICENSE) [![GitHub issues](https://img.shields.io/github/issues/hubrixco/logjack.svg)](https://github.com/hubrixco/logjack/issues) ![node (scoped)](https://img.shields.io/node/v/@hubrixco/logjack.svg) [![npm (scoped)](https://img.shields.io/npm/v/@hubrixco/logjack.svg)](https://www.npmjs.com/package/@hubrixco/logjack) [![Twitter Follow](https://img.shields.io/twitter/follow/hubrixco.svg?style=social&logo=twitter&label=Follow)](https://twitter.com/intent/follow?screen_name=hubrixco)

A general-purpose logging API based on [log4js-node](https://github.com/log4js-node/log4js-node)

## Summary
Supports all log4js-node functionality, plus:

- JSON and XML output (Layouts)
- A simple REST API

The REST API works using the single endpoint `/log` which requires a JSON payload: 

- message to be logged
- logger configuration options

## Quickstart
```
npm install @hubrixco/logjack
cd node_modules/@hubrixco/logjack
npm test
```

If all the tests pass, you have a valid, working Logjack install. Then, in your code:

```
var lj = require('@hubrixco/logjack');
var logger = lj.getLogger();
logger.level = 'info';
logger.warn("Oh no, ran out of espresso");
```

## REST API Server
```
cd node_modules/@hubrixco/logjack
node restapi/index.js
```

You should see:
```
Your server is listening on port 8080 (http://localhost:8080)
```

You can change host and port by editing `restapi/index.js` - the `serverHost` and `serverPort` variables respectively.

The one and only endpoint will be at `http://localhost:8080/v1.0.0/log`

For a quick test of the API server, open another terminal on the same machine and use **curl**:

```
curl -H "Accept:application/json" \
  -H "Content-Type: application/json" \
  "http://localhost:8080/v1.0.0/log" -X POST -d \
'{"message":"The moons of Bar Foo!","appenders":{"out":{"type":"console","layout":{"type":"json" }}},"categories":{"default":{"appenders":["out"],"level":"info"}}}'
```

You should see lines of JSON log output appear in your API server's console.

The (very terse) REST API documentation is [here](https://logjack.hubrix.io/logjack/v1.0.0/).

## Differences from log4js-node

This initial release of Logjack adds very little to log4js-node. The key differences are:
- JSON Layout support
- XML Layout support
- REST API (with just one method: `log`)
- Requires Node.js **v8.x** (log4js works fine on Node.js v4.x)

Future releases of Logjack will introduce more significant changes. But we are working with the log4js-node maintainers to refactor
these features as log4js-node extensions, rather than continuing to develop a standalone logger.

> **Bottom line:** if you desperately need XML/JSON output and/or a REST API *right now*, please help yourself to our code. If not, you're much better off using
[log4js-node](https://github.com/log4js-node/log4js-node).

You can read about our future plans for Logjack <a target="_blank" href="https://www.hubrix.co/2018/02/hubrix-release-logjack/">here</a>.

# Basics

Except for the differences noted above, everything else in Logjack behaves as described in the [log4js-node documentation](https://log4js-node.github.io/log4js-node/index.html).

## Appenders

Appenders represent the output type for log events. They may write events to files, send emails, store them in a database, etc. Most appenders use *Layouts* to serialize events to strings for output (Examples: file, console, `stdout`).

See the [log4js-node documentation](https://log4js-node.github.io/log4js-node/appenders.html) for a complete list of Appenders and their options. 

## Layouts

Layouts describe the output format for an Appender.

Built-in:

- **JSON**
- **XML**
- **Basic** (text)
- **Colored** (text)
- **Message Pass-through** (This layout just formats the log event data, and does not output a timestamp, level or category)
- **Pattern** The pattern string can contain any characters, but sequences beginning with % will be replaced with values taken from the log event, and other environmental values.Format for specifiers is %[padding].[truncation][field]{[format]} - padding and truncation are optional, and format only applies to a few tokens (notably, date). e.g. %5.10p - left pad the log level by 5 characters, up to a max of 10

See the [log4js-node documentation](https://log4js-node.github.io/log4js-node/layouts.html) for details (including log Fields and substitution strings).

## Categories

The Categories feature that allows multiple Appenders to be instantiated in log4js-node is not available in this release Logjack.

Only one Logger is created, using the `default` Category.

## Example Payloads

**Output to console in JSON format:**
```
var payload = {
   message: 'The best way to predict the future is to invent it.',
   appenders: {
     out: { type:'console', layout: { type:'json'} }
   },
   categories: {
     default: { appenders: ['out'], level:'info' }
   }
 };
```

**Output to console in XML format:**

```
payload = {
   message: 'Waiter, I believe my soup can fly!',
   appenders: {
     out: { type:'console', layout: { type:'xml'} }
   },
   categories: {
     default: { appenders: ['out'], level:'warn' }
   }
 };
```

**Output to console in colored text format:**

```
payload = {
   message: 'Avocados. Just because.',
   appenders: {
     out: { type:'console', layout: { type:'colored'} }
   },
   categories: {
     default: { appenders: ['out'], level:'trace' }
   }
 };
```

**Output to file (options defined following appenders.out.type property):**

```
payload = {
   message: 'Your tax dollars at work. Not.',
   appenders: {
     out: {
		type:'file', filename:'testfile.log',
		maxLogSize:10485760, backups:5, compress:false
	 }
   },
   categories: {
     default: { appenders: ['out'], level:'trace' }
   }
 };
```

| ![Hubrix](https://www.hubrix.co/wp-content/uploads/2018/01/Egg.v2.tm_.600x600.transbg-150x150.png "Coded with love by Hubrix") |
|--------------------------------------------------------------------------------------------------------------------------------|
|                                                 ** Hubrix SAS ** Paris, France                                                 |

## Apache 2.0 license

Copyright  2018 [Hubrix SAS](https://www.hubrix.co)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
