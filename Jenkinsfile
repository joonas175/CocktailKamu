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
                sh 'docker container ls -a -fname=ck -q | xargs -r docker container rm'
                sh 'docker run -d -p 8081:80 --network=host --name ck ck'
            }
        }
    }
}