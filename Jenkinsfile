pipeline {
  agent any
  stages {
    stage('Run tests') {
      steps {
        script {
          docker.image('mysql:5').withRun('-p 3306:3306 -e "MYSQL_ROOT_PASSWORD=anxing123"') { c ->
          docker.image('mysql:5').inside("--link ${c.id}:db") {
            sh 'while ! mysqladmin ping -hdb --silent; do sleep 1; done'
          }

          docker.image('centos:7').inside("--link ${c.id}:db") {
            sh 'make check'
          }
        }
      }

    }
  }
}
}