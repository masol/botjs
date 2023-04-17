/// //////////////////////////////////////////////////////////////////////////
//                                                                          //
//  本文件是WIDE2.0的组成部分.                                                 //
//                                                                          //
//  WIDE website: http://www.prodvest.com/                                  //
//  WIDE website: http://www.pinyan.tech/                                   //
//  License: Apache-2.0 (https://www.apache.org/licenses/LICENSE-2.0)       //
/// //////////////////////////////////////////////////////////////////////////
// Created On : 18 Apr 2023 By 李竺唐 of 北京飞鹿软件技术研究院
// File: index

import Store from '../index'
import path from 'node:path'
import fse from 'fs-extra'

function parse(content:string):void {
  console.log('content=', content)
  // 使用acorn来解析content,得到AST.
}

async function loadFile(filename:string):Promise<void> {
  // 检查filename的后缀是否为.js或者.json
  const ext = path.extname(filename)
  if (ext !== '.js' && ext !== '.json') {
    // 忽略非js和json文件
    return
  }

  // 读取文件filename的内容，并使用acron来分析得到ast.
  const content = await fse.readFile(filename, 'utf-8')

  return parse(content)
}

const HiddenPrefix = new Set(['.', '~', '$'])
async function loadDir(directory:string):Promise<void> {
  // 从目录dirctory中加载全部文件及子目录．
  const files = await fse.readdir(directory)
  //   cmd.log(JSON.stringify(files))
  // 使用map遍历files中的每个元素，内部需要调用await，所以需要使用async函数
  await Promise.all(Object.values(files).map(async file => {
    // src是隐藏文件/目录，则忽略之．
    if (!file || HiddenPrefix.has(file[0])) {
      console.log('ignore hidden file:', file)
      return
    }

    const src = path.join(directory, file)

    const stat = await fse.stat(src)
    if (stat.isDirectory()) {
      loadDir(src)
    } else if (stat.isFile()) {
      loadFile(src)
    } else { // 忽略符号链接等非文件或目录元素．是否提示?
    }
  }))
}

async function load():Promise<void> {
  loadDir(Store.inst.env.src)
}

export default {
  load,
}
