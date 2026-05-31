pipeline {

    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/THUNDEREMPEROR99/TaskManager.git'
            }
        }

        stage('Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Frontend Dependencies') {
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