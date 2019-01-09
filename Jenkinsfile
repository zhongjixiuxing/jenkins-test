pipeline {
  agent any
  stages {
    stage('Build Image') {
      input {
        message 'Build Image and publish'
        id 'building'
        parameters {
          choice(name: 'publishName', choices: ['dev(localhost)', 'sandbox', 'production'], description: 'What do you want to publish env?')
          string(name: 'buildImageName', defaultValue: 'btc-gateway:latest', description: 'build/publish docker image name')
          string(name: 'sshHost', defaultValue: '192.168.1.104', description: 'SSH host of deployment server')
          string(name: 'sshUser', defaultValue: 'root', description: 'SSH user name')
          string(name: 'sshPassword', defaultValue: '', description: 'SSH password')
          text(name: 'sshCommands', defaultValue: 'docker run -id --name btc-gateway btc-gateway:latest', description: 'ssh exec commands')
        }
      }
      steps {
        script {
          def userInput = input(id: 'userInput', message: 'GOOOOOOOO', parameters: [
            [$class: 'TextParameterDefinition', defaultValue: 'yser', description: 'input you name', name: 'username'],
            [$class: 'TextParameterDefinition', defaultValue: 'helo', description: 'input you age', name: 'userage']
          ])

          echo ("userInput : " + userInput)
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