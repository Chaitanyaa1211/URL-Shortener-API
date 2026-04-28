pipeline {
    agent   any

    envirenment {
        IMAGE_NAME = "chaitanyaaaa/url-shortener-api"
        TAG        = "$1.{BUILD_NUMBER}"
        }

        stages {
            stage ("INSTALL") {
                steps{
                    sh ' npm install '
                    }
                }
        
            stage ("BUILD") {
                steps {
                    sh ' docker build -t ${IMAGE_NAME}:${TAG} '
                }
            }

            stage ("PUSH") {
                steps {
                    withCredentials([usernamePassword(credentialsId: 'DockerHub-Creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                        echo $PASS | docker login -u --password-stdin
                        docker push ${IMAGE_NAME}:${TAG}
                   }
                }
            }
            stage ("DEPLOY") {
                steps {
                    withCredentials([(file (credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh """
                        sed -i 's|'${IMAGE_NAME}:latest|${IMAGE_NAME:${TAG}|g' k8s/
                        kubectl apply -f k8s/
                        """
                    }
                }
            }       
        }

}
