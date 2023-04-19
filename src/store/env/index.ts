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
import {load} from '../parser'
import {mkdtempSync} from 'node:fs'
import {tmpdir} from 'node:os'

// tempy is ESM only.
// import {temporaryDirectory} from 'tempy'

type EnvType = import('../types/env').Env;
class Env implements EnvType {
  #src: string;
  #dest: string;
  #cmd?: Command;
  #tmpDir?: string
  #keeptmp?: boolean
  get src(): string {
    return this.#src
  }

  get tmpDir(): string {
    if (!this.#tmpDir) {
      this.#tmpDir = mkdtempSync(path.join(tmpdir(), 'bot-'))
    }

    return this.#tmpDir
  }

  get cmd(): Command {
    if (!this.#cmd) throw new Error('Cmd not init!')
    return this.#cmd
  }

  get dest(): string {
    return this.#dest
  }

  constructor() {
    this.#src = ''
    this.#dest = ''
  }

  async clear(): Promise<void> {
    if (!this.#keeptmp && this.#tmpDir) {
      await fse.remove(this.#tmpDir)
    }
  }

  async load(
    args: Record<string, any>,
    flags: Record<string, any>,
    cmd: Command,
  ): Promise<boolean> {
    this.#keeptmp = flags.keeptmp || false
    this.#cmd = cmd

    const src = fsutil.fullPath(flags.src || args.src)
    const srcIsURL = fsutil.isURL(src)
    if (!srcIsURL) {
      if (!(await fse.pathExists(src))) {
        this.#cmd.error(`Source file '${src}' not exist!`, {exit: 1})
      }

      if (!(await fse.lstat(src)).isFile()) {
        this.#cmd.error(`Source file '${src}' not a file!`, {exit: 2})
      }
    }

    const dest = fsutil.fullPath(
      flags.dest || args.dest || path.join(srcIsURL ? process.cwd() : src, 'target'),
    )
    const destExist = await fse.pathExists(dest)
    if (destExist) {
      if (!(await fse.lstat(dest)).isDirectory()) {
        this.#cmd.error(`Destination directory '${dest}' not a dirctory!`, {
          exit: 3,
        })
      }

      if (!(await fsutil.isEmptyDir(dest))) {
        this.#cmd.error(`Destination directory '${dest}' not empty!`, {
          exit: 4,
        })
      }
    }

    this.#src = src
    this.#dest = dest

    await load(src)
    return true
  }
}

export default Env
