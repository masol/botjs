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
$ npm install -g boc
$ boc COMMAND
running command...
$ boc (--version)
boc/0.0.0 linux-x64 node-v18.12.1
$ boc --help [COMMAND]
USAGE
  $ boc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`boc hello PERSON`](#boc-hello-person)
* [`boc hello world`](#boc-hello-world)
* [`boc help [COMMANDS]`](#boc-help-commands)
* [`boc plugins`](#boc-plugins)
* [`boc plugins:install PLUGIN...`](#boc-pluginsinstall-plugin)
* [`boc plugins:inspect PLUGIN...`](#boc-pluginsinspect-plugin)
* [`boc plugins:install PLUGIN...`](#boc-pluginsinstall-plugin-1)
* [`boc plugins:link PLUGIN`](#boc-pluginslink-plugin)
* [`boc plugins:uninstall PLUGIN...`](#boc-pluginsuninstall-plugin)
* [`boc plugins:uninstall PLUGIN...`](#boc-pluginsuninstall-plugin-1)
* [`boc plugins:uninstall PLUGIN...`](#boc-pluginsuninstall-plugin-2)
* [`boc plugins update`](#boc-plugins-update)

## `boc hello PERSON`

Say hello

```
USAGE
  $ boc hello PERSON -f <value>

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

_See code: [dist/commands/hello/index.ts](https://github.com/masol/boc/blob/v0.0.0/dist/commands/hello/index.ts)_

## `boc hello world`

Say hello world

```
USAGE
  $ boc hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ boc hello world
  hello world! (./src/commands/hello/world.ts)
```

## `boc help [COMMANDS]`

Display help for boc.

```
USAGE
  $ boc help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for boc.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `boc plugins`

List installed plugins.

```
USAGE
  $ boc plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ boc plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.4/src/commands/plugins/index.ts)_

## `boc plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ boc plugins:install PLUGIN...

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
  $ boc plugins add

EXAMPLES
  $ boc plugins:install myplugin 

  $ boc plugins:install https://github.com/someuser/someplugin

  $ boc plugins:install someuser/someplugin
```

## `boc plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ boc plugins:inspect PLUGIN...

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
  $ boc plugins:inspect myplugin
```

## `boc plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ boc plugins:install PLUGIN...

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
  $ boc plugins add

EXAMPLES
  $ boc plugins:install myplugin 

  $ boc plugins:install https://github.com/someuser/someplugin

  $ boc plugins:install someuser/someplugin
```

## `boc plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ boc plugins:link PLUGIN

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
  $ boc plugins:link myplugin
```

## `boc plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ boc plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ boc plugins unlink
  $ boc plugins remove
```

## `boc plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ boc plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ boc plugins unlink
  $ boc plugins remove
```

## `boc plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ boc plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ boc plugins unlink
  $ boc plugins remove
```

## `boc plugins update`

Update installed plugins.

```
USAGE
  $ boc plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
