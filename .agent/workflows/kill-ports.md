---
description: Kill processes running on ports 3000/3001 and restart dev server
---
// turbo-all

## Kill Ports and Restart

1. Check what's running on ports:
```bash
netstat -ano | findstr ":3000 :3001"
```

2. Kill the processes (replace PIDs from step 1):
```bash
taskkill /F /PID <PID1> /PID <PID2>
```

3. Restart the dev server:
```bash
npm run dev
```
