pipeline {
    agent any
    stages {
        stage('Install dependencies') {
            steps {
                npm 'install'
            }
        }
        stage('Test') {
            steps {
                npm 'test'
            }
        }
        stage('Run deploy') {
            steps {
                echo 'Aquí debería enviar a deploy'
            }
        }
    }
}