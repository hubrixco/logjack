# logjack
A general-purpose logging API written in node.js, and based on [log4js-node](https://github.com/log4js-node/log4js-node)

## Summary
Supports all log4js-node functionality, plus:
  - JSON and XML output (Layouts)
  - A simple REST API

The REST API works using the single endpoint ‘/log’ which requires two parameters: 
  - message to be logged (String)
  - logger configuration options (JSON)

## Quickstart
```
npm install @hubrixco/logjack
cd logjack
npm test
``` 

## REST API Server
```
cd logjack
node restapi/index.js
```

You should see:
```
Your server is listening on port 8080 (http://localhost:8080)
Swagger-ui is available on http://localhost:8080/docs
```

You can change host and port by editing `restapi/index.js` - the `serverHost` and `serverPort` variables respectively.

## Differences from log4js-node

This initial release of Logjack adds very little to log4js-node. The key differences are:
- JSON Layout support
- XML Layout support
- REST API (with just one method: `log`)
- Requires Node.js **v8.x** (log4js works fine on Node.js v4.x)

Future releases of Logjack will introduce more significant changes. But we are working with the log4js-node maintainers to refactor
these features as log4js-node extensions, rather than continuing to develop a standalone logger.

> **Bottom line:** if you desperately need XML/JSON output or a REST API *right now*, help yourself to our code. If not, you're much better off using
[log4js-node](https://github.com/log4js-node/log4js-node).

## Appenders

Represent the output type for log events. They may write events to files, send emails, store them in a database, etc. Most appenders use layouts to serialise the events to strings for output. (Examples: file, console, stdout, etc.).

See the [log4js-node documentation](https://log4js-node.github.io/log4js-node/appenders.html) for a complete list of Appenders and their options. 

## Layouts

Describe the output format for an Appender.

Built-in:

- JSON
- XML
- Basic (text)
- Colored (text)
- Message Pass-through (This layout just formats the log event data, and does not output a timestamp, level or category)
- Pattern The pattern string can contain any characters, but sequences beginning with % will be replaced with values taken from the log event, and other environmental values.Format for specifiers is %[padding].[truncation][field]{[format]} - padding and truncation are optional, and format only applies to a few tokens (notably, date). e.g. %5.10p - left pad the log level by 5 characters, up to a max of 10

See the [log4js-node documentation](https://log4js-node.github.io/log4js-node/layouts.html) for details (including log Fields and substitution strings).

## Categories

A mechanism to define multiple appenders for the logger. Logjack version 1.0.0 supports a single category name (&quot;default&quot;).

## Example JSON Configurations

**Output to console in JSON format:**
```
varconfig = {
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
config = {
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
config = {
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
config = {
   appenders: {
     out: { type:'file', filename:'testfile.log', maxLogSize:10485760, backups:5, compress:false }
   },

   categories: {
     default: { appenders: ['out'], level:'trace' }
   }
 };
 ```

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
