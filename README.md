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
```npm install @hubrixco/logjack
cd logjack
npm test``` 

## REST API Server
```cd logjack
node restapi/index.js
```
You should see:
```Your server is listening on port 8080 (http://localhost:8080)
Swagger-ui is available on http://localhost:8080/docs```

You can change host and port by editing `restapi/index.js` - the `serverHost` and `serverPort` variables respectively.

## JSON Configuration Definitions

### Appenders

Represent the output type for log events. They may write events to files, send emails, store them in a database, etc. Most appenders use layouts to serialise the events to strings for output. (Examples: file, console, stdout, etc.).

### Layouts

Describe the output format for an Appender.

Built-in:

- JSON
- XML
- Basic (text)
- Colored (text)
- Message Pass-through (This layout just formats the log event data, and does not output a timestamp, level or category)
- Pattern The pattern string can contain any characters, but sequences beginning with % will be replaced with values taken from the log event, and other environmental values.Format for specifiers is %[padding].[truncation][field]{[format]} - padding and truncation are optional, and format only applies to a few tokens (notably, date). e.g. %5.10p - left pad the log level by 5 characters, up to a max of 10

Fields can be any of:

- %r time in toLocaleTimeString format
- %p log level
- %c log category
- %h hostname
- %m log data
- %d date, formatted - default is ISO8601, format options are: ISO8601, ISO8601\_WITH\_TZ\_OFFSET, ABSOLUTE, DATE, or any string compatible with the [date-format](https://www.npmjs.com/package/date-format) library. e.g. %d{DATE}, %d{yyyy/MM/dd-hh.mm.ss}
- %% % - for when you want a literal % in your output
- %n newline
- %z process id (from pid)
- %x{&lt;tokenname&gt;} add dynamic tokens to your log. Tokens are specified in the tokens parameter.
- %X{&lt;tokenname&gt;} add values from the Logger context. Tokens are keys into the context values.
- %[ start a coloured block (colour will be taken from the log level, similar to colouredLayout)
- %] end a coloured block

## Categories

A mechanism to define multiple appenders for the logger. Logjack version 1.0.0 supports a single category name (&quot;default&quot;).

## Example JSON Configurations

**Output to console in JSON format:**
```
varconfig = {

   appenders: {

     out: { type:&#39;console&#39;, layout: { type:&#39;json&#39;} }

   },

   categories: {

     default: { appenders: [&#39;out&#39;], level:&#39;info&#39; }

   }

 };
```

**Output to console in XML format:**

```config = {

   appenders: {

     out: { type:&#39;console&#39;, layout: { type:&#39;xml&#39;} }

   },

   categories: {

     default: { appenders: [&#39;out&#39;], level:&#39;warn&#39; }

   }

 };```

**Output to console in colored text format:**

```config = {

   appenders: {

     out: { type:&#39;console&#39;, layout: { type:&#39;colored&#39;} }

   },

   categories: {

     default: { appenders: [&#39;out&#39;], level:&#39;trace&#39; }

   }

 };```

**Output to file (options defined following appenders.out.type property):**

```config = {

   appenders: {

     out: { type:&#39;file&#39;, filename:&#39;testfile.log&#39;, maxLogSize:10485760, backups:5,    compress:false }

   },

   categories: {

     default: { appenders: [&#39;out&#39;], level:&#39;trace&#39; }

   }

 };```

**Complete list of file options**

- type - &quot;file&quot;
- filename - string - the path of the file where you want your logs written.
- maxLogSize - integer (optional) - the maximum size (in bytes) for the log file. If not specified, then no log rolling will happen.
- backups - integer (optional, default value = 5) - the number of old log files to keep during log rolling.
- layout - (optional, defaults to basic layout: timestamp, level, category, followed by the formatted log event data)

Any other configuration parameters will be passed to the underlying [streamroller](https://github.com/nomiddlename/streamroller) implementation (see also [node.js core file stream](https://nodejs.org/docs/latest-v8.x/api/stream.html)):

- encoding - string (default &quot;utf-8&quot;)
- mode- integer (default 0644)
- flags - string (default &#39;a&#39;)
- compress - boolean (default false) - compress the backup files during rolling (backup files will have .gz extension)
- keepFileExt - boolean (default false) - preserve the file extension when rotating log files (log becomes 1.log instead of log.1)

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
