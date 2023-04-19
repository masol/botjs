import {Args, Command, Flags} from '@oclif/core'
import Store from '../store'

const DestHelp = `The directory where the generated code is saved.
default value is $PWD/dist`

const SrcHelp = `File describing the workflow.
default value is $PWD/dist`

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
    src: Flags.file({char: 'i', description: SrcHelp}),
    // flag with no value (-f, --force)
    warning: Flags.string({
      char: 'w',
      description: 'Options to Request or Suppress Warnings',
      options: ['error', 'ignore', 'show'],
    }),
    keeptmp: Flags.boolean({
      description: 'Do not delete the temporary directory when the program exits',
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
    await Store.inst.load(args, flags, this)
    this.log(JSON.stringify(flags))
    // this.log(flags)

    const name = flags.name ?? 'world'
    this.log(`aaaa ${name} from /home/masol/Documents/Source/pub/bot/src/commands/build.ts`)
    if (args.src && flags.force) {
      this.log(`you input --force and --file: ${args.src}`)
    }

    // await this.delay()
    this.log('finish!!!')
    await Store.inst.clear()
  }
}
