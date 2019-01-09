pipeline {
  agent any
  stages {
    stage('Build Image') {
      steps {
        script {
          def deployImage = docker.build("btc-gateway:v1.0.0")

          def remote = [:]
          remote.name = 'test'
          remote.host = '192.168.1.104'
          remote.user = 'root'
          remote.password = 'anxing123H?'
          remote.allowAnyHosts = true

          sshCommand remote:remote, command: "ls -la"
        }

      }
    }
    stage('Run tests') {
      steps {
        script {
          docker.image('mongo').withRun('-p 27017:27017') { c ->
          /*
          等待mongo 服务正常启动运行
          */
          docker.image('mongo').inside("--link ${c.id}:db") {
            sh 'while ! mongo --host db --eval "printjson(db.serverStatus())"; do sleep 1; done'
          }

          docker.image('node:8.15').inside("--link ${c.id}:db") {
            sh 'npm install'
            sh 'npm run test'
          }
        }
      }

    }
  }
}
environment {
  NODE_ENV = 'test'
  MONGO_URI = 'mongodb://db/btc-gateway'
}
}