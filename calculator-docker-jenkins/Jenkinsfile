pipeline {
  agent any
  environment {
    IMAGE_NAME = "calc-app:latest"
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install') {
      steps {
        dir('app') {
          sh 'npm install'
        }
      }
    }
    stage('Test') {
      steps {
        // No formal tests included; you can add test.js and a script to run here
        echo 'Skipping tests (none provided)'
      }
    }
    stage('Build Image') {
      steps {
        sh 'docker build -t ${IMAGE_NAME} .'
      }
    }
    stage('Run Container (smoke)') {
      steps {
        script {
          // stop previous if exists
          sh '''
          docker rm -f calc-smoke || true
          docker run -d --name calc-smoke -p 5000:3000 ${IMAGE_NAME}
          sleep 2
          # Basic health check
          curl -f http://localhost:5000/api/add?a=1&b=2 || (docker logs calc-smoke && exit 1)
          docker rm -f calc-smoke
          '''
        }
      }
    }
    // Optional: push to registry (configure credentials and registry url)
  }
}
