# RNFrame

### Description

react-native 架构

### Installation

-   ios

    1.  yarn install
    2.  npx pod-install
    3.  npx react-native run-ios

-   android
    1. yarn install
    2. npx jetify
    3. npx react-native run-android

### Catalogue

```
src
├─root.tsx // App根路由设置
├─util
|  ├─extension.ts // 扩展
|  ├─request.ts // 请求
|  └string.ts // 字符串
├─theme // 主题设置
├─store
├─services
├─plug-in // 插件
├─page // 视图
├─navigation // 路由
|     ├─navigation.tsx // tab组件
|     ├─route-context.ts  // 层级跳转定义
|     └route.tsx // 声明所有组件
├─enum
├─configure
|     ├─config.ts // 主配置文件
|     ├─env.ts // 环境配置
|     ├─assets // 资源文件配置
├─component
|     ├─navigation-header // 导航栏
├─api
```

### Style

1. 一行代码结束不需要分号
2. js/jsx/tsx 代码用单引号
3. 每一行代码不要超过 150 个
4. 4 个空格为 tab
5. 页面里用不到的引用删除
6. 一个组件一个文件
7. 一个文件最好不要超过 800 行
8. 空格用&nbsp；表示不要直接空格
9. 文件名用小写字母-小写字母表示（print-warnings.js）

### Path

配置绝对路径

1. 在 tsconfig.json 里的 paths 设置路径和别名(语法通过)
2. 在 babel.config.js 里的 alias 配置路径和别名(编译通过)

完成 1 的时候已经可以正常的导入别名路径了,但是编译不通过,需要装插件 babel-plugin-module-resolver 来让编译通过,改的时候建议也是两个文件一起改

如果编译报错 XX 路径找不到,请运行 yarn start --reset-cache 重试

### FAQ

-   ios pod 遇到

```
[!] CocoaPods could not find compatible versions for pod "Flipper-Folly":
  In snapshot (Podfile.lock):
    Flipper-Folly (= 2.3.0, ~> 2.2)

  In Podfile:
    Flipper-Folly (~> 2.2)

None of your spec sources contain a spec satisfying the dependencies: `Flipper-Folly (~> 2.2), Flipper-Folly (= 2.3.0, ~> 2.2)`.

```

解决: `pod install --repo-update`
