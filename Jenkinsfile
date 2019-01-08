pipeline {
  agent any
  environment {
      NODE_ENV = 'test'
      MONGO_URI = 'mongodb://db/btc-gateway'
  }
  stages {
    stage('Run tests') {
      steps {
        script {
          docker.image('mongo').withRun('-p 27017:27017') { c ->
            /*
                等待mongo 服务正常启动运行
            */
            docker.image('mongo').inside("--link ${c.id}:db") {
               sh 'while ! mongo --eval "printjson(db.serverStatus()) --host db"; do sleep 1; done'
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
}