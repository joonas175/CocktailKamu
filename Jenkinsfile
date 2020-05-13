pipeline {
    agent {
        docker {
            image 'node:13-alpine'  
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'docker build -t ck'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -p 8080:80 ck'
            }
        }
    }
}