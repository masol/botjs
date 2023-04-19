/// //////////////////////////////////////////////////////////////////////////
//                                                                          //
//  本文件是WIDE2.0的组成部分.                                                 //
//                                                                          //
//  WIDE website: http://www.prodvest.com/                                  //
//  WIDE website: http://www.pinyan.tech/                                   //
//  License: Apache-2.0 (https://www.apache.org/licenses/LICENSE-2.0)       //
/// //////////////////////////////////////////////////////////////////////////
// Created On : 17 Apr 2023 By 李竺唐 of 北京飞鹿软件技术研究院
// File: fse

import fse from 'fs-extra'
import isURL from 'validator/lib/isURL'
import path from 'node:path'

const fsutil = {
  async isEmptyDir(path: string): Promise<boolean> {
    try {
      const dirent = await fse.opendir(path)
      const value = await dirent.read()
      await dirent.close()

      return value === null
    } catch {
      return false
    }
  },
  isURL(url: string): boolean {
    // eslint-disable-next-line camelcase
    return isURL(url, {require_protocol: true, require_valid_protocol: true})
  },
  // 如果pathname不是URL,并且不是绝对路径,则返回base和pathname的拼接路径(如果base为空，则使用process.cwd())
  fullPath(pathname = '', base = '') :string  {
    base = base || process.cwd()
    if (!fsutil.isURL(pathname) && !path.isAbsolute(pathname)) {
      return path.join(base, pathname)
    }

    return pathname
  },

}

export default fsutil
