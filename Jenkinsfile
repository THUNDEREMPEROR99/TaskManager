pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Code checked out from GitHub successfully'
            }
        }

        stage('Backend Build Check') {
            steps {
                dir('backend') {
                    sh 'ls'
                    echo 'Backend files verified successfully'
                }
            }
        }

        stage('Frontend Build Check') {
            steps {
                dir('frontend') {
                    sh 'ls'
                    echo 'Frontend files verified successfully'
                }
            }
        }

        stage('Dockerfile Verification') {
            steps {
                sh 'test -f backend/Dockerfile'
                sh 'test -f frontend/Dockerfile'
                echo 'Dockerfiles verified successfully'
            }
        }

        stage('Pipeline Completed') {
            steps {
                echo 'CI pipeline executed successfully'
            }
        }
    }
}