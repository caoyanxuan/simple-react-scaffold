import React, { useMemo, useState } from 'react';
import { times, size, indexOf, forEach, flatten, reduce, map, includes, concat, filter } from 'lodash';
import './index.scss';

// 邻接矩阵
class AdjoinArray {
  // vertexss：各个类型顶点分类的二维数组；如：[ ['red', 'blue'],  ['L', 'M', 'S'],  ['cotton', 'polyster'] ];
  constructor(vertexss) {
    // 矩阵的全量订点
    this.vertexs = flatten(vertexss);

    // 矩阵的边长
    this.qrt = size(this.vertexs);

    // 初始化为 [this.qrt * this.qrt] 的邻接矩阵
    this.init(vertexss); 
  }

  // 获取顶点的索引
  getIdx(vertex) {
    return indexOf(this.vertexs, vertex);
  }

  // 连接顶点
  setRelation(vertexs) {
    const len = size(vertexs);

    forEach(vertexs, (vertex, idx) => {
      for(let i = idx; i < len - 1; i++) {
        const fromIdx = this.getIdx(vertex);
        const toIdx = this.getIdx(vertexs[i + 1]);

        // 邻接矩阵斜线对称性
        this.adjoinArray[fromIdx][toIdx] = 1;
        this.adjoinArray[toIdx][fromIdx] = 1;
      }
    });
  }

  // 求单行
  getOther(vertex) {
    return this.adjoinArray[this.getIdx(vertex)];
  }

  // 求多行的交集（按位逻辑与）
  getOthers(vertexs) {
    // 传入的订点的行的集合
    const collection = map(vertexs, vertex => this.getOther(vertex));

    // 遍历各列
    const intersection = map(this.vertexs, (_, idx) => {
      // 每列相与（乘）
      return reduce(collection, (rst, item) => rst * item[idx], 1);
    });

    const result = reduce(intersection, (rst, val, idx) => {
      return val === 1 ? concat(rst, this.vertexs[idx]) : rst;
    }, []);

    return [result, intersection];
  }

  init(vertexss) {
    // 初始邻接矩阵
    this.adjoinArray = times(this.qrt, i => Array.from({ length: this.qrt }, i => 0));

    // 连接同类型的顶点
    forEach(vertexss, i => {
      this.setRelation(i);
    });
  }
}

const data = [{
  id: '01',
  color: 'red',
  size: 'L',
  material: 'cotton'
}, {
  id: '02',
  color: 'red',
  size: 'L',
  material: 'polyster'
}, {
  id: '03',
  color: 'red',
  size: 'S',
  material: 'polyster'
}, {
  id: '04',
  color: 'blue',
  size: 'M',
  material: 'polyster'
}, {
  id: '05',
  color: 'blue',
  size: 'S',
  material: 'cotton'
}, {
  id: '06',
  color: 'blue',
  size: 'S',
  material: 'polyster'
}];

const metaData = [{
  label: 'color',
  attr: ['red', 'blue']
}, {
  label: 'size',
  attr: ['L', 'M', 'S']
}, {
  label: 'material',
  attr: ['cotton', 'polyster']
}];

const vertexss = map(metaData, i => i.attr);

export default () => {
  const adjoin = useMemo(() => {
    const adjoin = new AdjoinArray(vertexss);

    forEach(data, item => {
      adjoin.setRelation([item.color, item.size, item.material]);
    });
    
    return adjoin;
  }, []);

  const [state, setState] = useState({
    color: '',
    size: '',
    material: ''
  });

  const result = useMemo(() => {
    const checked = filter([state.color, state.size, state.material], Boolean);
    const [result] = adjoin.getOthers(checked);

    return result;
  }, [state]);

  return (
    <div className="adjoin-box">
      {
        map(metaData, (item) => (
          <div key={metaData.label}>
            <span>{`${item.label}: `}</span>
            { map(item.attr, vertex => (
              <button 
                key={vertex}
                className={vertex === state[item.label] ? 'ckd' : ''}
                disabled={!includes(result, vertex) && state[item.label] !== vertex}
                onClick={() => {
                  setState(pre => {
                    return {
                      ...pre,
                      [item.label]: pre[item.label] === vertex ? '' : vertex
                    };
                  });
                }}
              >{vertex}</button>
            )) }
          </div>
        ))
      }
    </div>
  );
};

