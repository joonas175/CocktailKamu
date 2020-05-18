pipeline {
    agent any

    stages {
        stage('Build') { 
            steps {
                git 'https://github.com/joonas175/CocktailKamu'
                sh 'docker build -t ck .'
            }
        }
        stage('Deploy') {
            environment {
                CLIENT_ID = 'ID'
                CLIENT_SECRET = 'SECRET'
                REDIRECT_URL = 'REDIRECT_URL'
            }
            steps {
                sh 'docker ps -f name=ck -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -fname=ck -q | xargs -r docker container rm'
                sh 'docker run -d --network=host --restart unless-stopped --name ck ck'
            }
        }
    }
}