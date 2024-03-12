### 介绍

这是一个 PWA Demo，即渐进式 Web 应用的 demo。包含了 PWA 的基本配置、PWA 的基本使用流程、PWA 的部分特性示例， 可供参阅学习。

### 详解

该 demo 大致包含如下模块

* 推送服务。由服务器**主动**向客户端推送，即使 PWA 应用不在运行。

* 后台同步。当 PWA 应用处于离线，应用将在网络状态恢复的适当时机去获取数据。

* Service Worker 的基本使用。如何注册和监听 Service Worker 的状态。

* 离线时保持基本可用。当 PWA 应用离线，也仍然能以脱机状态正常工作以维持基本使用

* Service Worker 与主页面通信。通过 `BroadcastChannel` API，以实现 Service Worker 和主页面的通信。

* 推送服务器。为与客户端实现推送服务而建立的一个简陋服务器。

### 目录介绍

各目录的基本含义如下

client。编写页面代码。
server。服务器，用于和客户端页面通信。
https-cert。 存放https 的证书及密钥。

