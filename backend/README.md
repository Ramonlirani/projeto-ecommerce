# Upload files Digital Ocean

rsync -av --progress --exclude-from='./rsyncignore.txt' ./ root@{YOUR_IP}:/root/apps/recordar/backend
