pipeline {
    agent any

    stages {
        stage('Build') { 
            steps {
                sh 'docker build -t ck .'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker stop $(docker ps -q --filter ancestor=ck )'
                sh 'docker run -p 8081:80 --name ck ck'
            }
        }
    }
}