pipeline {
    agent none
    
    stages {
        stage('Build') { 
            steps {
                sh 'docker build -t ck'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -p 8080:80'
            }
        }
    }
}