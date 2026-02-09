#!/bin/bash
# GitHub 备份脚本

cd /home/ubuntu

# 1. 初始化 git
git init

# 2. 创建 README.md
echo "# lindaiyu" > README.md
echo "" >> README.md
echo "林黛玉的工作区备份" >> README.md
echo "" >> README.md
echo "## 文件列表" >> README.md
ls -la >> README.md

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "Initial backup from $(date '+%Y-%m-%d %H:%M:%S')"

# 5. 创建 main 分支
git branch -M main

# 6. 关联远程仓库
git remote add origin https://github.com/ai20260209/lindaiyu.git

# 7. 推送
git push -u origin main

echo "备份完成！"
