/// //////////////////////////////////////////////////////////////////////////
//                                                                          //
//  本文件是WIDE2.0的组成部分.                                                 //
//                                                                          //
//  WIDE website: http://www.prodvest.com/                                  //
//  WIDE website: http://www.pinyan.tech/                                   //
//  License: Apache-2.0 (https://www.apache.org/licenses/LICENSE-2.0)       //
/// //////////////////////////////////////////////////////////////////////////
// Created On : 16 Apr 2023 By 李竺唐 of 北京飞鹿软件技术研究院
// File: index

import path from 'node:path'
import fse from 'fs-extra'
import fsutil from '../../utils/fse'
import type {Command} from '@oclif/core'

type EnvType = import('./index.d').Env
class Env implements EnvType {
  #src: string
  #dest: string
  #cmd?: Command
  get src(): string {
    return this.#src
  }

  get cmd(): Command {
    if (!this.#cmd)
      throw new Error('Cmd not init!')
    return this.#cmd
  }

  get dest(): string {
    return this.#dest
  }

  constructor() {
    this.#src = ''
    this.#dest = ''
  }

  async load(args: Record<string, any>, flags: Record<string, any>, cmd: Command): Promise<boolean> {
    this.#cmd = cmd
    const ensureFull = (pathname: string = "") => {
      if (!path.isAbsolute(pathname)) {
        return path.join(process.cwd(), pathname)
      }

      return pathname
    }

    const src = ensureFull(flags.src || args.src)
    const dest = ensureFull(flags.dest || args.dest || path.join(src, 'target'))

    if (!await fse.pathExists(src)) {
      this.#cmd.error(`Source directory '${src}' not exist!`, {exit: 1})
    }

    if (!(await fse.lstat(src)).isDirectory()) {
      this.#cmd.error(`Source directory '${src}' not a dirctory!`, {exit: 2})
    }

    const destExist = await fse.pathExists(dest)
    if (destExist) {
      if (!(await fse.lstat(dest)).isDirectory()) {
        this.#cmd.error(`Destination directory '${dest}' not a dirctory!`, {exit: 3})
      }

      if (!await fsutil.isEmptyDir(dest)) {
        this.#cmd.error(`Destination directory '${dest}' not empty!`, {exit: 4})
      }
    }

    this.#src = src
    this.#dest = dest
    return true
  }
}

export default Env
