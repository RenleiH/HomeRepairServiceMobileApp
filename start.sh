#!/bin/bash

# 启动后端服务
echo "Starting backend server..."
cd backend
npm install
npx nodemon src/index.js &
BACKEND_PID=$!

# 等待后端服务启动
sleep 5

# 启动前端服务
echo "Starting frontend server..."
cd ../frontend
npm install
npm start

# 当脚本被中断时，确保后端进程也被终止
trap "kill $BACKEND_PID" EXIT 