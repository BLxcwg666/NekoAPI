# NekoAPI
A Mixed Node.JS API with Express（Just For Fun  
写着练手的玩意儿

## Issues 长期收功能建议

# 安装
确保环境中有 `Node.JS ≥ 18`（开发使用 `20.8.0`）  
将仓库克隆到本地后使用 `npm install` 安装依赖  
复制 `.env.example` 为 `.env`，配置完成后使用 `node main.js` 运行

# 配置
以下为 `.env` 文件的配置
```
# Express 配置
HOST=0.0.0.0               # 绑定的主机，默认 0.0.0.0，如果仅允许本地访问则改为 127.0.0.1
PORT=443                   # 绑定端口，使用 443 需要启用下面一项并配置 SSL 证书
ENABLE_SSL=true            # 启用本项请确保上一项为非 80 端口，true 为开，false 为关

# SSL 配置
CERT_PATH="./Certs/api.local.cat.pem"                  # SSL 证书路径
CERT_KEY_PATH="./Certs/api.local.cat-key.pem"          # SSL 密钥路径

# API 配置
VERSION=1.2              # 版本信息，喜欢可以随便改
```

# 功能
`/random/sticker`  从 cdn.xcnya.cn 随机一张贴纸
`/network/getip`   获取访客 IP，通过 Curl Wget 访问直接返回 IP

# 特性
- 支持 SSL
