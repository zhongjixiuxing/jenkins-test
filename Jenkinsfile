pipeline {
  agent any
  stages {
    stage('Build Image') {
      steps {
        script {
          def uInput = input(id: 'uInput', message: 'GOOOOOOOO', parameters: [
            [$class: 'TextParameterDefinition', defaultValue: 'yser', description: 'input you name', name: 'username'],
            [$class: 'StringParameterDefinition', defaultValue: 'helo', description: 'input you age', name: 'userage']
          ])

          echo ('uInput -------------------- : ' + uInput)
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