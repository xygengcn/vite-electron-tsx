// 方法注册
export type Action = ((...args: any[]) => Promise<any>) | ((...args: any[]) => any);

// 消息类型
export type Message = {
  id: string;
  action: string; // 动作
  subject?: string; // 订阅
  args: any[];
};

// 节点动作
export type NodeAction = Record<string, Action>;

// 获取函数名
export type NodeActionKey<F extends NodeAction> = keyof F;

// 函数内容
export type NodeActionFunction<F extends NodeAction, K extends NodeActionKey<F>> = K extends NodeActionKey<F> ? F[K] : never;

// 函数返回内容
export type NodeActionResult<F extends NodeAction, K extends NodeActionKey<F>> = K extends NodeActionKey<F> ? ReturnType<NodeActionFunction<F, K>> : Promise<any>;

// 函数参数
export type NodeActionFunctionParam<F extends NodeAction, K extends NodeActionKey<F>> = K extends NodeActionKey<F> ? Parameters<NodeActionFunction<F, K>> : never;

// 返回，同步变异步
export type NodeActionPromise<F extends NodeAction> = {
  [K in NodeActionKey<F>]: NodeActionResult<F, K> extends Promise<any> ? NodeActionFunction<F, K> : (...args: NodeActionFunctionParam<F, K>) => Promise<NodeActionResult<F, K>>;
};

type FuncType<T> = T extends (a: any, ...args: infer P) => infer R ? (...args: P) => R : never;
/**
 * 主进程
 */
export type MainActions<T extends NodeAction> = {
  [K in keyof T]: FuncType<T[K]>;
};
