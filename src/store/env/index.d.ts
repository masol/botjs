/// //////////////////////////////////////////////////////////////////////////
//                                                                          //
//  本文件是WIDE2.0的组成部分.                                                 //
//                                                                          //
//  WIDE website: http://www.prodvest.com/                                  //
//  WIDE website: http://www.pinyan.tech/                                   //
//  License: Apache-2.0 (https://www.apache.org/licenses/LICENSE-2.0)       //
/// //////////////////////////////////////////////////////////////////////////
// Created On : 16 Apr 2023 By 李竺唐 of 北京飞鹿软件技术研究院
// File: env

import type {Command} from '@oclif/core'

export type Env = {
  readonly src: string
  readonly dest: string
  readonly cmd: Command
  load(args: Record<string, any>, flags: Record<string, any>, cmd: Command): Promise<boolean>
}
