pipeline {
    agent any

    stages {
        stage('Backend Dependencies') {
            agent {
                docker {
                    image 'node:18'
                    args '-u root'
                }
            }
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Frontend Dependencies') {
            agent {
                docker {
                    image 'node:18'
                    args '-u root'
                }
            }
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t task-manager-backend ./backend'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh 'docker build -t task-manager-frontend ./frontend'
            }
        }
    }
}