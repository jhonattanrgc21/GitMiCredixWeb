pipeline {
    agent none
    stages {
        stage('Node-Install') {
        	agent {
		        docker {
		            image "${nodeImage}"
		        }
		    }
            steps {
                sh 'npm install'
            }
        }
        stage('Ng-Build') {
        	agent {
		        docker {
		            image "${nodeImage}"
		        }
		    }
            steps {
                sh 'npm install -g @angular/cli@' + "${angularCliVersion}"
                sh 'ng build --configuration=' + "${environment}" + ' --aot ----base-href "//personas\\"'
            }
        }
        stage('Deploy-App') {
            agent any
            steps {
                script {
                    if( autoDeploy == "true" )  {
                        withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ssh', keyFileVariable: 'keyfile', usernameVariable: 'username')]) {
                            sh "ssh -i ${keyfile} ${username}@${sftpDestServer} \
                            'cd /opt/jboss/welcome-content/personas && \
                            rm -fr /opt/jboss/welcome-content/personas/*'"
                        }
                    }
                    if( autoDeploy == "true" )  {
                        withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ssh', keyFileVariable: 'keyfile', usernameVariable: 'username')]) {
                            sh "scp -i ${keyfile} -r dist/* ${username}@${sftpDestServer}:/opt/jboss/welcome-content/personas/"
                        }
                    }
                }
            }
        }
    }
}
