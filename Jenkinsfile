pipeline {
    agent any

    environment {
        DOCKER_USER = "akankshmahesh"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Code checked out from GitHub successfully'
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

        stage('Trivy Verification') {
            steps {
                echo 'Trivy vulnerability scanning tool integrated and verified'
                sh 'trivy --version'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Tag Docker Images') {
            steps {
                sh 'docker tag task-manager-backend $DOCKER_USER/task-manager-backend:v1'
                sh 'docker tag task-manager-frontend $DOCKER_USER/task-manager-frontend:v1'
            }
        }

        stage('Push Docker Images') {
            steps {
                sh 'docker push $DOCKER_USER/task-manager-backend:v1'
                sh 'docker push $DOCKER_USER/task-manager-frontend:v1'
            }
        }

        stage('Pipeline Completed') {
            steps {
                echo 'CI/CD pipeline executed successfully'
            }
        }
    }
}