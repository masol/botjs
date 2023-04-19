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

import Workflows from './workflow'
import Env from './env'
import Dtds from './dtd'
import type {Command} from '@oclif/core'

type StoreType = import('./index.d').Store
class Store implements StoreType {
  workflows: import('./types/workflow').Workflows;
  dtds: import('./types/dtd').Dtds;
  env: import('./types/env').Env;
  private constructor() {
    this.workflows = new Workflows()
    this.dtds = new Dtds()
    this.env = new Env()
  }

  static #inst: Store = new Store()
  static get inst(): Store {
    if (!Store.#inst) {
      Store.#inst = new Store()
    }

    return Store.#inst
  }

  async load(args: Record<string, any>, flags: Record<string, any>, cmd:Command): Promise<boolean> {
    if (!await this.env.load(args, flags, cmd)) {
      return false
    }

    return true
  }

  async clear(): Promise<void> {
    await this.env.clear()
  }
}

export default Store
