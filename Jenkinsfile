pipeline {
    agent   any

    environment {
        IMAGE_NAME = "chaitanyaaaa/url-shortener-api"
        TAG        = "1.${BUILD_NUMBER}"
        }

        stages {
            stage ("INSTALL") {
                steps{
                    sh 'npm install'
                    }
                }
        
            stage ("BUILD") {
                steps {
                    sh 'docker build -t ${IMAGE_NAME}:${TAG} .'
                }
            }

            stage ("PUSH") {
                steps {
                    withCredentials([usernamePassword(credentialsId: 'DockerHub-Creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                        echo $PASS | docker login -u $USER --password-stdin
                        docker push ${IMAGE_NAME}:${TAG}

		       '''
                   }
                }
            }
            stage ("DEPLOY") {
                steps {
                    withCredentials([file (credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    	sh '''
			   helm upgrade --install url-shortener ./url-shortener \
			   --set image.tag=${TAG} \
			   --set replicaCount=2 
			   '''
                    }
                }
            }       
        }

}
