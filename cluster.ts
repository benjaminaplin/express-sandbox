const cluster = require('cluster')
const startWorker = () => {
  const worker = cluster.fork()
  console.log(`Cluster: Worker ${worker.id} started`)
}

if(cluster.isMaster){
  require('os').cpus().forEach(startWorker)

/* 
  log any workers that disconnect: if a worker disconnects, it
  should then exit, so we'll wait for the 
  exit event to spawn a new eorker to replace it
*/

cluster.on('disconnect', (worker: { id: number }) => console.log(
  `CLUSTER: Worker ${worker.id} disconnected from the cluster`
))

cluster.on('exit', (worker: { id: number }, code: string, signal: string) => {
  console.log(`CLUSTER: Worker ${worker.id} died with exit ` + `code ${code} (${signal})`)
  startWorker()
})

} else {
  const port = process.env.PORT || 3000
  //start our app on worker; see index.ts
  require('./index.ts')(port)
}

export {}