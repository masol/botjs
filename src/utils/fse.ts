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
}

export default fsutil
