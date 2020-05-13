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
                sh 'docker stop ck'
                sh 'docker run -p 8080:80 --name ck ck'
            }
        }
    }
}