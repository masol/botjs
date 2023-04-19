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

import {CollectionBase} from '../base'

type WorkflowsType = import('../types/workflow.d').Workflows

class Workflows extends CollectionBase implements WorkflowsType {}

export default Workflows
