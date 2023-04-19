/// //////////////////////////////////////////////////////////////////////////
//                                                                          //
//  本文件是BOT的组成部分.                                                 //
//                                                                          //
//  BOT website: http://www.prodvest.com/                                  //
//  BOT website: http://www.pinyan.tech/                                   //
//  License: Apache-2.0 (https://www.apache.org/licenses/LICENSE-2.0)       //
/// //////////////////////////////////////////////////////////////////////////
// Created On : 19 Apr 2023 By 李竺唐 of 北京飞鹿软件技术研究院
// File: loader

import Store from '../index'
import path from 'node:path'
import fse from 'fs-extra'
import fsutil from '../../utils/fse'
import {parse} from './parse'
import Downloader from 'nodejs-file-downloader'
import {ux} from '@oclif/core'

const loadedFileset = {} as {[key:string]:boolean}

async function loadFile(filename:string):Promise<void> {
  // 检查filename的后缀是否为.js或者.json
  // const ext = path.extname(filename)
  // if (ext !== '.js' && ext !== '.json') {
  //   // 忽略非js和json文件
  //   return
  // }
  if (loadedFileset[filename]) {
    return
  }

  loadedFileset[filename] = true

  // 读取文件filename的内容，并使用acron来分析得到ast.
  const content = await fse.readFile(filename, 'utf-8')

  return parse({content, filename})
}

async function loadURL(url:string):Promise<void> {
  const env =  Store.inst.env
  const downloader = new Downloader({
    url,
    directory: path.join(env.tmpDir, 'src'), // Sub directories will also be automatically created if they do not exist.
  })

  try {
    ux.action.start(`Starting download from ${url}`, 'initializing', {stdout: true})
    const {filePath} = await downloader.download()
    ux.action.stop(filePath ? 'done!' : 'failed')
    if (filePath) {
      return loadFile(filePath)
    }
  } catch {
    ux.action.stop('failed!')
  }
}

// const HiddenPrefix = new Set(['.', '~', '$'])
// async function loadDir(directory:string):Promise<void> {
//   // 从目录dirctory中加载全部文件及子目录．
//   const files = await fse.readdir(directory)
//   //   cmd.log(JSON.stringify(files))
//   // 使用map遍历files中的每个元素，内部需要调用await，所以需要使用async函数
//   await Promise.all(Object.values(files).map(async file => {
//     // src是隐藏文件/目录，则忽略之．
//     if (!file || HiddenPrefix.has(file[0])) {
//       console.log('ignore hidden file:', file)
//       return
//     }

//     const src = path.join(directory, file)

//     const stat = await fse.stat(src)
//     if (stat.isDirectory()) {
//       await loadDir(src)
//     } else if (stat.isFile()) {
//       await loadFile(src)
//     } else { // 忽略符号链接等非文件或目录元素．是否提示?
//     }
//   }))
// }

export async function load(src?:string):Promise<void> {
  src = src || Store.inst.env.src
  // 是否是一个URL.
  // console.log('load src', src)
  if (fsutil.isURL(src)) {
    // console.log(src, 'is URL!!')
    await loadURL(src)
    return
  }

  await loadFile(src)
}
