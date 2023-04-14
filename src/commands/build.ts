import {Args, Command, Flags} from '@oclif/core'

const DestHelp = `Directory for generated source code.
The default value is PWD`

const SrcHelp = `Directory store the workflow of using the software.
The default value is $PWD/dist`

export default class Build extends Command {
  static description = 'Generate software code from the description of the workflow using this software.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> [srcDir [destDir]]',
    '<%= config.bin %> <%= command.id %> -o XXX',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    dest: Flags.directory({char: 'o', description: DestHelp}),
    src: Flags.directory({char: 'i', description: SrcHelp}),
    // flag with no value (-f, --force)
    warning: Flags.string({char: 'w',
      description: 'Options to Request or Suppress Warnings',
      options: ['error', 'ignore', 'show'],
    }),
  }

  static args = {
    src: Args.string({
      description: SrcHelp,
    }),
    dest: Args.string({
      description: DestHelp,
    }),
  }

  protected async delay(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 45_000)
    })
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Build)
    this.log(JSON.stringify(flags))
    // this.log(flags)

    const name = flags.name ?? 'world'
    this.log(`aaaa ${name} from /home/masol/Documents/Source/pub/bot/src/commands/build.ts`)
    if (args.src && flags.force) {
      this.log(`you input --force and --file: ${args.src}`)
    }

    await this.delay()
    this.log('finish!!!')
  }
}
