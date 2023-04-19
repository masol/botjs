/// //////////////////////////////////////////////////////////////////////////
//                                                                          //
//  本文件是WIDE2.0的组成部分.                                                 //
//                                                                          //
//  WIDE website: http://www.prodvest.com/                                  //
//  WIDE website: http://www.pinyan.tech/                                   //
//  License: Apache-2.0 (https://www.apache.org/licenses/LICENSE-2.0)       //
/// //////////////////////////////////////////////////////////////////////////
// Created On : 18 Apr 2023 By 李竺唐 of 北京飞鹿软件技术研究院
// File: parser

import Store from '../index'
import acorn from 'acorn'
import {isError} from 'lodash'
import {truncate, unquote} from 'underscore.string'
import {generate} from 'astring'
import path from 'node:path'
import {load} from './loader'
import fsutil from '../../utils/fse'

// import {full} from 'acorn-walk'
// import {visit} from 'estree-util-visit'
// type Node = import('estree-jsx').Node
// 回退回estree-walker v2.02. oclif尚不支持esm native resolve
// import type {Node} from 'estree-walker'

export type ParseCtx = {
  content: string,
  filename: string
}
// 获取节点的提示信息,格式为: "内容(被截取至最多15字符) in file 文件名[行号:列号]"
function getPrompt(node:any, ctx:ParseCtx) {
  // 获取字符串的前n个字符.
  const {content, filename} = ctx
  const {start, end} = node
  const str = content.slice(start, end)
  const lineInfo = acorn.getLineInfo(content, start)
  // 如果字符串长度超过20个字符，则截取前20个字符，并添加省略号
  return `${truncate(str, 15)} in file ${filename}[${lineInfo.line}:${lineInfo.column}]`
}

type ExpressionStatement = import('estree-jsx').ExpressionStatement
type CallExpression = import('estree-jsx').CallExpression
type AssignmentExpression = import('estree-jsx').AssignmentExpression

async function execFunc(node:CallExpression, ctx:ParseCtx):Promise<void> {
  const cmd = Store.inst.env.cmd
  const callee = generate(node.callee)
  const args = []
  // 对node.arguments中的每个节点，创建其字符串版本．
  // const tasks = []
  for (const arg of node.arguments) {
    let argStr = generate(arg).trim()
    // 如果不是一个URL, 并且如果系统的路径分割符不等等于'/',将字符串中的'/'替换为路径分割．
    if (!fsutil.isURL(argStr) && path.sep !== '/') {
      argStr = argStr.replace(/\//g, path.sep)
    }

    // trim并移除argStr的首尾的单引号或双引号
    if (argStr) {
      switch (argStr[0]) {
      case '"':
        argStr = unquote(argStr)
        break
      case "'":
        argStr = unquote(argStr, "'")
        break
      }
    }

    // console.log('argStr=', argStr)

    // 为确保文件顺序，不再使用Promise.all, 而是使用push
    // tasks.push(load(argStr))
    args.push(argStr)
  }

  const base = path.dirname(ctx.filename)
  switch (callee) {
  case '$include':
    await Promise.all(Object.values(args).map(async arg => {
      // console.log('fullpath=', fsutil.fullPath(arg, base))
      await load(fsutil.fullPath(arg, base))
    }))
    break
  default:
    cmd.warn(`unknown function ${callee}.\n\t${getPrompt(node, ctx)}`)
  }
}

function loadAssign(node:AssignmentExpression, _ctx:ParseCtx):void {
  console.log('assign node:', node)
}

function loadExp(node:ExpressionStatement, ctx:ParseCtx) :void {
  const expNode = node.expression
  const cmd = Store.inst.env.cmd
  switch (expNode.type) {
  case 'AssignmentExpression':
    loadAssign(expNode, ctx)
    break
  case 'CallExpression':
    execFunc(expNode, ctx)
    break
  default:
    cmd.warn(`${expNode.type} invalid in the root expression.\n\t${getPrompt(expNode, ctx)}`)
    console.log('unknown expression:', expNode)
  }
}

export function parse(ctx:ParseCtx):void {
  const cmd = Store.inst.env.cmd
  const {content, filename} = ctx
  // 使用acorn来解析content,得到AST.
  let ast
  try {
    ast = acorn.parse(content, {ecmaVersion: 2020})
  } catch (error:any) {
    if (isError(error)) {
      cmd.warn(`${error.name}:${error.message} \n\tIgnore file ${filename}`)
    }

    return
  }

  if (!ast || ast.type !== 'Program') {
    cmd.warn(`AST of file ${filename} not a Program. Ignore it.`)
    return
  }

  // ast根节点的类型是"Program",遍历其body子节点．
  const program = ast as unknown as import('estree-jsx').Program

  for (const node of program.body) {
    switch (node.type) {
    case 'ExpressionStatement':
      loadExp(node as ExpressionStatement, ctx)
      break
    // case 'ClassDeclaration':
    //   break
    default:
      cmd.warn(`${node.type} invalid in the root of program.\n\t${getPrompt(node, ctx)}`)
    }
  }
}
