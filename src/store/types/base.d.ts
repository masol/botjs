/// //////////////////////////////////////////////////////////////////////////
//                                                                          //
//  本文件是BOT的组成部分.                                                 //
//                                                                          //
//  BOT website: http://www.prodvest.com/                                  //
//  BOT website: http://www.pinyan.tech/                                   //
//  License: Apache-2.0 (https://www.apache.org/licenses/LICENSE-2.0)       //
/// //////////////////////////////////////////////////////////////////////////
// Created On : 19 Apr 2023 By 李竺唐 of 北京飞鹿软件技术研究院
// File: base.d

export interface EntityBase{
    readonly prop: Record<string, any>
}

export type ObjectExpression = import('estree-jsx').ObjectExpression
export interface CollectionBase extends EntityBase{
    readonly items: Record<string|number, EntityBase>
    add(ast:ObjectExpression):Promise<void>
}
