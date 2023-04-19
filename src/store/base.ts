/// //////////////////////////////////////////////////////////////////////////
//                                                                          //
//  本文件是BOT的组成部分.                                                 //
//                                                                          //
//  BOT website: http://www.prodvest.com/                                  //
//  BOT website: http://www.pinyan.tech/                                   //
//  License: Apache-2.0 (https://www.apache.org/licenses/LICENSE-2.0)       //
/// //////////////////////////////////////////////////////////////////////////
// Created On : 19 Apr 2023 By 李竺唐 of 北京飞鹿软件技术研究院
// File: base

type EntityBaseType = import('./types/base.d').EntityBase
export class EntityBase implements EntityBaseType {
  prop: Record<string, any>
  constructor() {
    this.prop = {}
  }
}

type CollectionBaseType = import('./types/base.d').CollectionBase
export type ObjectExpression = import('estree-jsx').ObjectExpression
export class CollectionBase extends EntityBase implements CollectionBaseType {
    readonly items: Record<string|number, EntityBaseType>
    constructor() {
      super()
      this.items = {}
    }

    async add(ast:ObjectExpression):Promise<void> {
      console.log('ast', ast)
    }
}
