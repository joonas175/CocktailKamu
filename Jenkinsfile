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
                sh 'docker ps -f name=ck -q | xargs --no-run-if-empty docker container stop'
                sh 'docker run -p 8081:80 --name ck ck'
            }
        }
    }
}