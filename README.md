oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bot
$ bot COMMAND
running command...
$ bot (--version)
bot/0.0.0 linux-x64 node-v18.12.1
$ bot --help [COMMAND]
USAGE
  $ bot COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
- [oclif-hello-world](#oclif-hello-world)
- [Usage](#usage)
- [Commands](#commands)
  - [`bot hello PERSON`](#bot-hello-person)
  - [`bot hello world`](#bot-hello-world)
  - [`bot help [COMMANDS]`](#bot-help-commands)
  - [`bot plugins`](#bot-plugins)
  - [`bot plugins:install PLUGIN...`](#bot-pluginsinstall-plugin)
  - [`bot plugins:inspect PLUGIN...`](#bot-pluginsinspect-plugin)
  - [`bot plugins:install PLUGIN...`](#bot-pluginsinstall-plugin-1)
  - [`bot plugins:link PLUGIN`](#bot-pluginslink-plugin)
  - [`bot plugins:uninstall PLUGIN...`](#bot-pluginsuninstall-plugin)
  - [`bot plugins:uninstall PLUGIN...`](#bot-pluginsuninstall-plugin-1)
  - [`bot plugins:uninstall PLUGIN...`](#bot-pluginsuninstall-plugin-2)
  - [`bot plugins update`](#bot-plugins-update)

## `bot hello PERSON`

Say hello

```
USAGE
  $ bot hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/masol/bot/blob/v0.0.0/dist/commands/hello/index.ts)_

## `bot hello world`

Say hello world

```
USAGE
  $ bot hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ bot hello world
  hello world! (./src/commands/hello/world.ts)
```

## `bot help [COMMANDS]`

Display help for bot.

```
USAGE
  $ bot help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for bot.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `bot plugins`

List installed plugins.

```
USAGE
  $ bot plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ bot plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.4/src/commands/plugins/index.ts)_

## `bot plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ bot plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ bot plugins add

EXAMPLES
  $ bot plugins:install myplugin 

  $ bot plugins:install https://github.com/someuser/someplugin

  $ bot plugins:install someuser/someplugin
```

## `bot plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ bot plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ bot plugins:inspect myplugin
```

## `bot plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ bot plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ bot plugins add

EXAMPLES
  $ bot plugins:install myplugin 

  $ bot plugins:install https://github.com/someuser/someplugin

  $ bot plugins:install someuser/someplugin
```

## `bot plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ bot plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ bot plugins:link myplugin
```

## `bot plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bot plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bot plugins unlink
  $ bot plugins remove
```

## `bot plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bot plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bot plugins unlink
  $ bot plugins remove
```

## `bot plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bot plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bot plugins unlink
  $ bot plugins remove
```

## `bot plugins update`

Update installed plugins.

```
USAGE
  $ bot plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
