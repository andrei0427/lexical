/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {DecoratorNode, LexicalNode, NodeKey} from 'packages/lexical/src';
import * as React from 'react';

export class FontNode extends DecoratorNode<React.ReactNode> {
  __name: string;
  __url: string;

  static getType(): string {
    return 'font';
  }

  static clone(node: FontNode): FontNode {
    return new FontNode(node.__id, node.__key);
  }

  constructor(name: string, url: string, key?: NodeKey) {
    super(key);
    this.__name = name;
    this.__url = url;
  }

  createDOM(): HTMLElement {
    return document.createElement('div');
  }

  updateDOM(): false {
    return false;
  }

  decorate(): React.ReactNode {
    return (
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;1,300&display=swap');
      </style>
    );
  }
}

export function $createFontNode(name: string, url: string) {
  return new FontNode(name, url);
}

export function $isFontNode(node: LexicalNode | null | undefined) {
  return node instanceof FontNode;
}
